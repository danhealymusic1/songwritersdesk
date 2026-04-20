import { useState } from 'react';
import { pickNext, totalCount } from '../../data/songstarter-prompts.ts';

export default function Songstarter() {
  const [result, setResult] = useState(null);
  const [seen, setSeen] = useState(() => new Set());

  const onClick = () => {
    const next = pickNext(seen);
    if (!next) return;
    setResult(next);
    setSeen((prev) => {
      // If we've just exhausted the pool, reset so the next pick starts fresh.
      const reset = prev.size + 1 >= totalCount();
      if (reset) return new Set([next]);
      const copy = new Set(prev);
      copy.add(next);
      return copy;
    });
  };

  return (
    <div className="bg-paper-warm border border-ink/10 rounded-lg p-6 md:p-8">
      {!result ? (
        <div className="flex flex-col items-center justify-center py-10 gap-5 text-center">
          <p className="text-ink-soft max-w-md">
            A scene, a line, a collision of images. Random every click.
            Something to start from.
          </p>
          <button
            type="button"
            onClick={onClick}
            className="px-6 py-3 rounded-md font-semibold bg-ink text-paper hover:bg-accent transition"
          >
            Give me a starter
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-ink-muted mb-3">
              Your starting point
            </div>
            <div className="serif text-xl md:text-2xl leading-relaxed">
              {result}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClick}
              className="px-5 py-3 rounded-md border border-ink/20 hover:border-accent hover:text-accent transition"
            >
              Another one
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
