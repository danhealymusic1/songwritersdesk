import { useState, useCallback, useEffect, useRef } from 'react';

const DATAMUSE = 'https://api.datamuse.com/words';

// Fetch helper — adds md=sp so each result carries syllable count + pronunciation
async function fetchRel(params) {
  const qs = new URLSearchParams({ ...params, md: 'sp', max: '100' });
  const res = await fetch(`${DATAMUSE}?${qs.toString()}`);
  if (!res.ok) throw new Error(`Datamuse ${res.status}`);
  return res.json();
}

function syllables(word) {
  // From Datamuse metadata: numSyllables if present, else estimate from vowel groups.
  if (word.numSyllables) return word.numSyllables;
  const m = (word.word || '').toLowerCase().match(/[aeiouy]+/g);
  return m ? m.length : 1;
}

export default function SlantRhymeFinder() {
  const [input, setInput] = useState('');
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState(null);
  const inputRef = useRef(null);

  const search = useCallback(async (q) => {
    const clean = (q || '').trim().toLowerCase();
    if (!clean) return;
    setLoading(true);
    setError(null);
    setWord(clean);
    try {
      const [perfect, near, cns, sl] = await Promise.all([
        fetchRel({ rel_rhy: clean }),
        fetchRel({ rel_nry: clean }),
        fetchRel({ rel_cns: clean }),
        fetchRel({ sl: clean }),
      ]);

      // Dedupe by word — preference order matches the category we want to surface it in
      const seen = new Set([clean]);
      const pick = (list) =>
        list.filter((w) => {
          const key = w.word?.toLowerCase();
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        });

      const perfectClean = pick(perfect);
      // Multi-syllable perfect rhymes pulled out of perfect list (2+ syllables)
      const multiSyll = perfectClean.filter((w) => syllables(w) >= 2);
      const singleSyll = perfectClean.filter((w) => syllables(w) < 2);

      const nearClean = pick(near);
      const cnsClean = pick(cns);
      // Assonance proxy: phonetically-similar words (sl = sounds-like) that
      // Datamuse didn't already classify as perfect/near/consonance matches.
      const slClean = pick(sl);

      setResults({
        perfectMulti: multiSyll.slice(0, 40),
        perfectSingle: singleSyll.slice(0, 40),
        near: nearClean.slice(0, 60),
        consonance: cnsClean.slice(0, 40),
        assonance: slClean.slice(0, 40),
      });
    } catch (e) {
      setError(e.message || 'Something went wrong fetching rhymes.');
    } finally {
      setLoading(false);
    }
  }, []);

  // If the URL arrives with ?word=foo, seed the input
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('word');
    if (q) {
      setInput(q);
      search(q);
    }
  }, [search]);

  const onSubmit = (e) => {
    e.preventDefault();
    search(input);
    // Reflect in URL so results are shareable
    const params = new URLSearchParams(window.location.search);
    params.set('word', input.trim().toLowerCase());
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const copyWord = (w) => {
    navigator.clipboard?.writeText(w);
    setCopied(w);
    setTimeout(() => setCopied(null), 1200);
  };

  const Section = ({ title, subtitle, items, empty }) => {
    if (!items || items.length === 0) {
      return (
        <section className="mb-8">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="serif text-xl">{title}</h3>
            {subtitle && <span className="text-xs text-ink-muted">{subtitle}</span>}
          </div>
          <p className="text-sm text-ink-muted italic">{empty || 'No matches.'}</p>
        </section>
      );
    }
    return (
      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="serif text-xl">{title}</h3>
          {subtitle && <span className="text-xs text-ink-muted">{subtitle}</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((w) => (
            <button
              key={w.word}
              type="button"
              onClick={() => copyWord(w.word)}
              className="px-3 py-1 rounded border border-ink/10 bg-paper hover:border-accent hover:text-accent text-sm transition"
              title="Click to copy"
            >
              {w.word}
              {copied === w.word && <span className="ml-1 text-xs text-accent">copied</span>}
            </button>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="mb-8 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a word — heart, summer, paradise"
          className="flex-1 px-4 py-3 rounded border border-ink/15 bg-paper focus:outline-none focus:border-accent text-lg"
          autoFocus
        />
        <button
          type="submit"
          className="px-5 py-3 rounded bg-accent text-paper hover:opacity-90 transition"
          disabled={loading || !input.trim()}
        >
          {loading ? 'Searching…' : 'Find rhymes'}
        </button>
      </form>

      {error && (
        <div className="mb-6 p-4 rounded border border-red-300 bg-red-50 text-sm text-red-800">
          {error}. Datamuse may be rate-limiting — wait a moment and try again.
        </div>
      )}

      {word && results && !loading && (
        <>
          <div className="text-sm text-ink-muted mb-6">
            Showing rhymes for <span className="font-medium text-ink">{word}</span>.
            Click any word to copy. Tip: this tool rewards specific, concrete words
            — try "midnight" over "night".
          </div>

          <Section
            title="Multi-syllable rhymes"
            subtitle="Two+ syllables. These are the interesting ones."
            items={results.perfectMulti}
            empty="No multi-syllable matches. Try a longer input word."
          />
          <Section
            title="Near / slant rhymes"
            subtitle="Imperfect matches — the bread and butter of modern lyric writing."
            items={results.near}
          />
          <Section
            title="Consonance"
            subtitle="Same ending consonant, different vowel."
            items={results.consonance}
          />
          <Section
            title="Assonance"
            subtitle="Same vowel sound, different consonants."
            items={results.assonance}
          />
          <Section
            title="Perfect rhymes (single syllable)"
            subtitle="Obvious but occasionally what you need."
            items={results.perfectSingle}
          />
        </>
      )}

      {!word && !loading && (
        <div className="p-6 rounded border border-dashed border-ink/15 text-sm text-ink-muted">
          Type a word above. You'll get multi-syllable rhymes, near-rhymes,
          consonance, and assonance — all at once.
        </div>
      )}

      {loading && (
        <div className="p-6 rounded border border-ink/10 bg-paper-warm text-sm text-ink-muted">
          Searching…
        </div>
      )}
    </div>
  );
}
