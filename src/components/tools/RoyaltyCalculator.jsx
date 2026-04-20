import { useState, useMemo } from 'react';

// Approximate songwriter-side per-stream rates (USD, 2024 US figures).
// These are conservative midpoints of what mechanical + performance royalties
// combined actually pay out to the songwriter/publisher side — NOT the
// headline "Spotify pays $0.003" number, which is the total rights-holder
// payout (most of which goes to the label/master side).
//
// Sources vary; we use rounded industry averages and let users edit them.
const DEFAULT_PLATFORMS = [
  { id: 'spotify', name: 'Spotify', rate: 0.00050 },
  { id: 'apple', name: 'Apple Music', rate: 0.00110 },
  { id: 'amazon', name: 'Amazon Music', rate: 0.00070 },
  { id: 'ytmusic', name: 'YouTube Music', rate: 0.00030 },
  { id: 'ytfree', name: 'YouTube (ad-supported)', rate: 0.00010 },
  { id: 'tidal', name: 'Tidal', rate: 0.00150 },
];

const emptyWriter = () => ({ name: '', share: '', publisherShare: '0' });

const fmt = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

const parseNum = (v) => {
  const n = parseFloat(String(v).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

export default function RoyaltyCalculator() {
  const [platforms, setPlatforms] = useState(() =>
    DEFAULT_PLATFORMS.map((p) => ({ ...p, streams: '' }))
  );
  const [writers, setWriters] = useState([
    { ...emptyWriter(), share: '100' },
  ]);
  const [currency, setCurrency] = useState('USD');

  const updatePlatform = (idx, field, value) => {
    setPlatforms((ps) => ps.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
  };

  const updateWriter = (idx, field, value) => {
    setWriters((ws) => ws.map((w, i) => (i === idx ? { ...w, [field]: value } : w)));
  };

  const addWriter = () => writers.length < 6 && setWriters((ws) => [...ws, emptyWriter()]);
  const removeWriter = (idx) => writers.length > 1 && setWriters((ws) => ws.filter((_, i) => i !== idx));

  const splitEvenly = () => {
    const each = Math.floor((100 / writers.length) * 100) / 100;
    const remainder = Math.round((100 - each * writers.length) * 100) / 100;
    setWriters((ws) =>
      ws.map((w, i) => ({ ...w, share: (i === 0 ? (each + remainder).toFixed(2) : each.toFixed(2)) }))
    );
  };

  const totals = useMemo(() => {
    const perPlatform = platforms.map((p) => {
      const s = parseNum(p.streams);
      const r = parseNum(p.rate);
      return { ...p, earnings: s * r };
    });
    const gross = perPlatform.reduce((sum, p) => sum + p.earnings, 0);
    return { perPlatform, gross };
  }, [platforms]);

  const shareTotal = useMemo(
    () => writers.reduce((sum, w) => sum + parseNum(w.share), 0),
    [writers]
  );

  const sharesValid = Math.abs(shareTotal - 100) < 0.01;

  const writerPayouts = useMemo(() => {
    if (!sharesValid) return [];
    return writers.map((w) => {
      const songShare = parseNum(w.share) / 100;
      const pubShare = parseNum(w.publisherShare) / 100;
      const gross = totals.gross * songShare;
      const toPublisher = gross * pubShare;
      const toWriter = gross - toPublisher;
      return {
        name: w.name || '(unnamed)',
        gross,
        toWriter,
        toPublisher,
      };
    });
  }, [writers, totals.gross, sharesValid]);

  return (
    <div>
      {/* ----- streams by platform ----- */}
      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="serif text-xl">Streams by platform</h2>
          <span className="text-xs text-ink-muted">Rates are editable — update if you have better data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-ink-muted border-b border-ink/10">
                <th className="py-2 pr-3">Platform</th>
                <th className="py-2 pr-3">Streams</th>
                <th className="py-2 pr-3">$/stream (songwriter side)</th>
                <th className="py-2 text-right">Royalty</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map((p, i) => (
                <tr key={p.id} className="border-b border-ink/5">
                  <td className="py-2 pr-3">{p.name}</td>
                  <td className="py-2 pr-3">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={p.streams}
                      onChange={(e) => updatePlatform(i, 'streams', e.target.value)}
                      placeholder="0"
                      className="w-32 px-2 py-1 rounded border border-ink/15 bg-paper focus:outline-none focus:border-accent"
                    />
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex items-center gap-1">
                      <span className="text-ink-muted">$</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={p.rate}
                        onChange={(e) => updatePlatform(i, 'rate', e.target.value)}
                        className="w-24 px-2 py-1 rounded border border-ink/15 bg-paper focus:outline-none focus:border-accent"
                      />
                    </div>
                  </td>
                  <td className="py-2 text-right font-medium">
                    {fmt(totals.perPlatform[i].earnings)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="py-3 text-right font-medium">Total songwriter-side royalty</td>
                <td className="py-3 text-right font-bold text-lg">{fmt(totals.gross)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ----- writers ----- */}
      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="serif text-xl">Writers &amp; publisher splits</h2>
          <button
            type="button"
            onClick={splitEvenly}
            className="text-xs underline text-ink-muted hover:text-accent"
          >
            Split evenly
          </button>
        </div>

        <div className="space-y-3">
          {writers.map((w, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink-muted mb-1">
                  Writer {i + 1}
                </label>
                <input
                  type="text"
                  value={w.name}
                  onChange={(e) => updateWriter(i, 'name', e.target.value)}
                  placeholder="Name"
                  className="w-full px-3 py-2 rounded border border-ink/15 bg-paper focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink-muted mb-1">
                  Song share %
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={w.share}
                  onChange={(e) => updateWriter(i, 'share', e.target.value)}
                  placeholder="0"
                  className="w-20 px-3 py-2 rounded border border-ink/15 bg-paper focus:outline-none focus:border-accent text-right"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-ink-muted mb-1">
                  Pub take %
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={w.publisherShare}
                  onChange={(e) => updateWriter(i, 'publisherShare', e.target.value)}
                  className="w-20 px-3 py-2 rounded border border-ink/15 bg-paper focus:outline-none focus:border-accent text-right"
                />
              </div>
              <button
                type="button"
                onClick={() => removeWriter(i)}
                disabled={writers.length <= 1}
                className="px-2 py-2 text-sm text-ink-muted hover:text-red-600 disabled:opacity-30"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={addWriter}
            disabled={writers.length >= 6}
            className="text-sm underline text-ink-muted hover:text-accent disabled:opacity-50"
          >
            + Add another writer
          </button>
          <div className={`text-xs ${sharesValid ? 'text-ink-muted' : 'text-red-600'}`}>
            Shares total {shareTotal.toFixed(2)}% {sharesValid ? '✓' : '(must equal 100%)'}
          </div>
        </div>
      </section>

      {/* ----- results ----- */}
      {sharesValid && totals.gross > 0 && (
        <section className="mb-8 p-6 rounded-lg border border-ink/10 bg-paper-warm">
          <h2 className="serif text-xl mb-4">Per-writer breakdown</h2>
          <div className="space-y-3">
            {writerPayouts.map((wp, i) => (
              <div key={i} className="pb-3 border-b border-ink/5 last:border-0">
                <div className="flex items-baseline justify-between mb-1">
                  <div className="font-medium">{wp.name}</div>
                  <div className="text-lg font-bold">{fmt(wp.toWriter)}</div>
                </div>
                <div className="text-xs text-ink-muted">
                  Gross share {fmt(wp.gross)}
                  {wp.toPublisher > 0 && <> · to publisher {fmt(wp.toPublisher)}</>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="text-xs text-ink-muted italic">
        Rates are approximate 2024 US averages for the songwriter/publisher share only.
        They don't include master-recording royalties (which go to whoever owns the
        recording — usually the label or the artist). See the guide below for
        methodology and caveats.
      </div>
    </div>
  );
}
