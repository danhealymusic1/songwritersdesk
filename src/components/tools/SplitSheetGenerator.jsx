import { useState, useMemo } from 'react';

const emptyWriter = () => ({
  name: '',
  legalName: '',
  share: '',
  pro: '',
  ipi: '',
  publisher: '',
  publisherPro: '',
  email: '',
  address: '',
});

const PROs = ['', 'PRS', 'MCPS', 'PPL', 'ASCAP', 'BMI', 'SESAC', 'SOCAN', 'GEMA', 'SACEM', 'APRA', 'JASRAC', 'Other / Unaffiliated'];

export default function SplitSheetGenerator() {
  const [songTitle, setSongTitle] = useState('');
  const [altTitles, setAltTitles] = useState('');
  const [dateWritten, setDateWritten] = useState(() => new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [writers, setWriters] = useState([emptyWriter(), emptyWriter()]);
  const [status, setStatus] = useState(null);

  const totalShare = useMemo(
    () => writers.reduce((sum, w) => sum + (parseFloat(w.share) || 0), 0),
    [writers]
  );

  const sharesValid = Math.abs(totalShare - 100) < 0.01;

  const updateWriter = (idx, field, value) => {
    setWriters((ws) => ws.map((w, i) => (i === idx ? { ...w, [field]: value } : w)));
  };

  const addWriter = () => {
    if (writers.length >= 8) return;
    setWriters((ws) => [...ws, emptyWriter()]);
  };

  const removeWriter = (idx) => {
    if (writers.length <= 1) return;
    setWriters((ws) => ws.filter((_, i) => i !== idx));
  };

  const splitEvenly = () => {
    const each = Math.floor((100 / writers.length) * 100) / 100;
    const remainder = Math.round((100 - each * writers.length) * 100) / 100;
    setWriters((ws) =>
      ws.map((w, i) => ({
        ...w,
        share: (i === 0 ? (each + remainder).toFixed(2) : each.toFixed(2)),
      }))
    );
  };

  const generatePDF = async () => {
    setStatus('generating');
    try {
      // Dynamic import so jsPDF only loads when needed
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'letter' });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 54;
      let y = margin;

      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text('Songwriter Split Sheet', margin, y);
      y += 26;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(110);
      doc.text(
        'This document records the agreed ownership of the musical composition named below. Each signatory confirms the percentages stated are a true and complete record of their contribution.',
        margin,
        y,
        { maxWidth: pageW - margin * 2, lineHeightFactor: 1.4 }
      );
      y += 34;
      doc.setTextColor(30);

      // Song block
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageW - margin, y);
      y += 18;

      const labelVal = (label, value, x, colWidth) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(110);
        doc.text(label.toUpperCase(), x, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(20);
        doc.text(value || '—', x, y + 14, { maxWidth: colWidth });
      };

      const colW = (pageW - margin * 2) / 2 - 10;
      labelVal('Song title', songTitle, margin, colW);
      labelVal('Date written', dateWritten, margin + colW + 20, colW);
      y += 36;
      labelVal('Alternate titles / working titles', altTitles, margin, colW);
      labelVal('Location', location, margin + colW + 20, colW);
      y += 36;

      doc.line(margin, y, pageW - margin, y);
      y += 22;

      // Writers table header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(20);
      doc.text('Writers & ownership', margin, y);
      y += 16;

      // Each writer as a tidy block (not a dense table — more readable + forgiving on long names)
      writers.forEach((w, i) => {
        // box
        const blockStart = y;
        doc.setDrawColor(220);
        doc.setFillColor(250, 248, 240); // paper-warm
        doc.rect(margin, y, pageW - margin * 2, 110, 'FD');

        const innerX = margin + 14;
        const innerW = pageW - margin * 2 - 28;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(60);
        doc.text(`Writer ${i + 1}`, innerX, y + 16);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(20);
        doc.text(w.name || '—', innerX + 64, y + 16, { maxWidth: innerW - 180 });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(184, 71, 45); // accent
        const shareStr = w.share ? `${parseFloat(w.share).toFixed(2)}%` : '—';
        doc.text(shareStr, margin + (pageW - margin * 2) - 14, y + 22, { align: 'right' });

        doc.setTextColor(20);
        const fieldY = y + 38;
        const fw = innerW / 3;

        const mini = (label, value, x, yy, w) => {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7);
          doc.setTextColor(110);
          doc.text(label.toUpperCase(), x, yy);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(30);
          doc.text(value || '—', x, yy + 12, { maxWidth: w - 6 });
        };

        mini('Legal name', w.legalName, innerX, fieldY, fw);
        mini('PRO affiliation', w.pro, innerX + fw, fieldY, fw);
        mini('IPI / CAE #', w.ipi, innerX + fw * 2, fieldY, fw);

        mini('Publisher', w.publisher, innerX, fieldY + 30, fw);
        mini('Publisher PRO', w.publisherPro, innerX + fw, fieldY + 30, fw);
        mini('Email', w.email, innerX + fw * 2, fieldY + 30, fw);

        y = blockStart + 110 + 10;

        // Page break if needed
        if (y > pageH - 200 && i < writers.length - 1) {
          doc.addPage();
          y = margin;
        }
      });

      y += 6;

      // Total share
      doc.setDrawColor(200);
      doc.line(margin, y, pageW - margin, y);
      y += 20;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(20);
      doc.text('Total ownership', margin, y);
      doc.setTextColor(sharesValid ? 34 : 184, sharesValid ? 120 : 71, sharesValid ? 60 : 45);
      doc.text(`${totalShare.toFixed(2)}%`, pageW - margin, y, { align: 'right' });
      doc.setTextColor(20);
      y += 24;

      // Notes
      if (notes.trim()) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(110);
        doc.text('NOTES', margin, y);
        y += 12;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(30);
        const notesLines = doc.splitTextToSize(notes, pageW - margin * 2);
        doc.text(notesLines, margin, y);
        y += notesLines.length * 13 + 10;
      }

      // Page break for signatures if needed
      if (y > pageH - 260) {
        doc.addPage();
        y = margin;
      }

      // Signatures
      doc.setDrawColor(200);
      doc.line(margin, y, pageW - margin, y);
      y += 20;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(20);
      doc.text('Signatures', margin, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(110);
      doc.text(
        'By signing below, each writer confirms the ownership splits recorded above are accurate and agreed.',
        margin,
        y + 12,
        { maxWidth: pageW - margin * 2 }
      );
      y += 36;
      doc.setTextColor(30);

      writers.forEach((w, i) => {
        if (y > pageH - 90) {
          doc.addPage();
          y = margin;
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(110);
        doc.text(`WRITER ${i + 1}`, margin, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(20);
        doc.text(w.name || '(name)', margin + 70, y);

        // signature line
        doc.setDrawColor(140);
        doc.line(margin, y + 34, margin + 280, y + 34);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(110);
        doc.text('Signature', margin, y + 46);

        doc.line(margin + 310, y + 34, pageW - margin, y + 34);
        doc.text('Date', margin + 310, y + 46);

        doc.setTextColor(30);
        y += 66;
      });

      // Footer
      const totalPages = doc.internal.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(140);
        doc.text(
          `Generated at songwritersdesk.com  ·  ${new Date().toLocaleDateString()}  ·  Page ${p} of ${totalPages}`,
          pageW / 2,
          pageH - 24,
          { align: 'center' }
        );
      }

      const safeTitle = (songTitle || 'split-sheet').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'split-sheet';
      doc.save(`${safeTitle}-split-sheet.pdf`);
      setStatus('done');
      setTimeout(() => setStatus(null), 2500);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="not-prose">
      {/* Song details */}
      <div className="p-5 sm:p-6 rounded-lg border border-ink/10 bg-paper-warm mb-5">
        <div className="text-xs uppercase tracking-wider text-ink-muted mb-3">Song</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Song title" value={songTitle} onChange={setSongTitle} placeholder="e.g. Burning Barn Blues" />
          <Field label="Date written" value={dateWritten} onChange={setDateWritten} type="date" />
          <Field label="Alternate / working titles" value={altTitles} onChange={setAltTitles} placeholder="optional" />
          <Field label="Location" value={location} onChange={setLocation} placeholder="optional — city or studio" />
        </div>
      </div>

      {/* Writers */}
      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-xs uppercase tracking-wider text-ink-muted">Writers</div>
        <div className="flex gap-3 text-sm">
          <button type="button" onClick={splitEvenly} className="text-ink-soft hover:text-accent underline decoration-dotted">
            Split evenly
          </button>
        </div>
      </div>

      {writers.map((w, idx) => (
        <div key={idx} className="p-5 rounded-lg border border-ink/10 bg-paper mb-3">
          <div className="flex items-baseline justify-between mb-3">
            <div className="serif text-lg">Writer {idx + 1}</div>
            {writers.length > 1 && (
              <button
                type="button"
                onClick={() => removeWriter(idx)}
                className="text-xs text-ink-muted hover:text-accent underline decoration-dotted"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-3">
            <Field label="Credited name" value={w.name} onChange={(v) => updateWriter(idx, 'name', v)} placeholder="how they're credited on the release" />
            <Field label="Legal name (if different)" value={w.legalName} onChange={(v) => updateWriter(idx, 'legalName', v)} placeholder="optional" />
          </div>

          <div className="grid sm:grid-cols-4 gap-4 mb-3">
            <Field label="Share %" value={w.share} onChange={(v) => updateWriter(idx, 'share', v)} placeholder="0" type="number" />
            <SelectField label="PRO" value={w.pro} onChange={(v) => updateWriter(idx, 'pro', v)} options={PROs} />
            <Field label="IPI / CAE #" value={w.ipi} onChange={(v) => updateWriter(idx, 'ipi', v)} placeholder="optional" />
            <Field label="Email" value={w.email} onChange={(v) => updateWriter(idx, 'email', v)} placeholder="optional" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Publisher" value={w.publisher} onChange={(v) => updateWriter(idx, 'publisher', v)} placeholder="or “self-published”" />
            <SelectField label="Publisher PRO" value={w.publisherPro} onChange={(v) => updateWriter(idx, 'publisherPro', v)} options={PROs} />
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={addWriter}
          disabled={writers.length >= 8}
          className="text-sm text-ink-soft hover:text-accent underline decoration-dotted disabled:opacity-40 disabled:cursor-not-allowed"
        >
          + Add another writer
        </button>
        <div class={`text-sm ${sharesValid ? 'text-ink-soft' : 'text-accent'}`}>
          Total: <strong>{totalShare.toFixed(2)}%</strong> {sharesValid ? '✓' : '(should be 100)'}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block">
          <div className="text-xs uppercase tracking-wider text-ink-muted mb-2">Notes (optional)</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="e.g. sample clearance notes, producer points, contribution details…"
            className="w-full p-3 rounded-md border border-ink/15 bg-paper text-ink focus:outline-none focus:border-accent"
          />
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={generatePDF}
          disabled={status === 'generating'}
          className="px-5 py-3 rounded-md bg-accent text-paper font-medium hover:opacity-90 disabled:opacity-60 no-underline"
          style={{ backgroundColor: '#b8472d', color: '#fafaf7' }}
        >
          {status === 'generating' ? 'Generating…' : 'Download split sheet PDF'}
        </button>
        {!sharesValid && (
          <span className="text-sm text-ink-muted">Shares don't total 100% — you can still download.</span>
        )}
        {status === 'done' && <span className="text-sm text-ink-soft">✓ Downloaded</span>}
        {status === 'error' && <span className="text-sm text-accent">Something went wrong. Check console.</span>}
      </div>

      <p className="text-xs text-ink-muted mt-4">
        Generated entirely in your browser. Nothing is sent to a server.
      </p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-ink-muted mb-1.5">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2.5 rounded-md border border-ink/15 bg-paper text-ink focus:outline-none focus:border-accent"
        step={type === 'number' ? '0.01' : undefined}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-ink-muted mb-1.5">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 rounded-md border border-ink/15 bg-paper text-ink focus:outline-none focus:border-accent"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt || '—'}
          </option>
        ))}
      </select>
    </label>
  );
}
