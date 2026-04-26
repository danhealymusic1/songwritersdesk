import { useEffect, useMemo, useState } from 'react';
import { NOUNS, ADJS, VERBS, PLACES } from '../../data/title-words.ts';

// ── Filtering ────────────────────────────────────────────────────────
function filterWords(pool, mood, genre, theme) {
  // Score each word: must match mood, prefer genre + theme matches.
  const scored = pool
    .filter((w) => w.m.includes(mood))
    .map((w) => {
      let score = 1;
      if (genre && genre !== 'any') {
        if (!w.g) score += 0.5; // untagged genre = fits anywhere, light bonus
        else if (w.g.includes(genre)) score += 2;
        else score -= 0.5;
      }
      if (theme && theme !== 'any') {
        if (!w.t) score += 0.3;
        else if (w.t.includes(theme)) score += 2;
        else score -= 0.5;
      }
      return { w: w.w, score };
    })
    .filter((x) => x.score > 0);

  // Fall back to mood-only if filters cleared the pool
  if (scored.length < 4) {
    return pool.filter((w) => w.m.includes(mood)).map((w) => ({ w: w.w, score: 1 }));
  }
  return scored;
}

function pickWeighted(scored, exclude = new Set()) {
  const available = scored.filter((s) => !exclude.has(s.w));
  if (available.length === 0) return scored[Math.floor(Math.random() * scored.length)].w;
  const total = available.reduce((a, b) => a + b.score, 0);
  let r = Math.random() * total;
  for (const s of available) {
    r -= s.score;
    if (r <= 0) return s.w;
  }
  return available[available.length - 1].w;
}

// ── Patterns ─────────────────────────────────────────────────────────
// Verbs that contain "me", "you", or are multi-word phrases — only used
// in patterns where they make grammatical sense (e.g. "If You [verb]")
// rather than patterns that append a pronoun ("[verb] Me Twice").
const isCleanStem = (v) => !/^(walk|come|hold|let|keep|mean|know|miss|need|reach|show|save|hurt|find|teach|kiss|catch|lose) /.test(v) &&
                            !/ (me|you|it|nothing|better)$/.test(v);

const PATTERNS = [
  // 1. The + noun
  ({ noun }) => `The ${cap(noun())}`,
  // 2. Adj + noun
  ({ adj, noun }) => `${cap(adj())} ${cap(noun())}`,
  // 3. Possessive + noun
  ({ noun }) => `${pick(['My', 'Your', 'Our'])} ${cap(noun())}`,
  // 4. Single noun
  ({ noun }) => cap(noun()),
  // 5. Conditional with verb
  ({ verb }) => `If You ${capPhrase(verb())}`,
  // 6. Conditional (when)
  ({ verb }) => `When You ${capPhrase(verb())}`,
  // 7. Don't + verb (clean stems only)
  ({ verb }) => {
    let v = verb();
    let attempts = 0;
    while (!isCleanStem(v) && attempts++ < 6) v = verb();
    return `Don't ${capPhrase(v)}`;
  },
  // 8. Until / before / after
  ({ verb }) => `${pick(['Before You', 'Until You', 'After You'])} ${capPhrase(verb())}`,
  // 9. Prepositional + noun
  ({ noun }) => `${pick(['Under', 'After', 'Halfway to', 'Between', 'Across', 'Inside'])} ${pick(['the', 'a'])} ${cap(noun())}`,
  // 10. Place setting
  ({ place }) => `${pick(['In', 'Outside', 'Back to', 'Leaving'])} ${cap(place())}`,
  // 11. Place + tag
  ({ place }) => `${cap(place())}, ${pick(['Anyway', 'Again', 'in October', 'in Reverse', 'on Repeat'])}`,
  // 12. Number/time + noun
  ({ noun }) => `${pick(['3am', 'Twenty-One', 'October', 'Friday Night', 'Last December', 'Sunday Morning'])} ${cap(noun())}`,
  // 13. Question
  ({ noun }) => `${pick(['Where Did the', 'Who Stole the', 'What Happened to', 'Whose Side Is the'])} ${cap(noun())}${randomQ()}`,
  // 14. Two-word possessive
  ({ adj, noun }) => `${pick(['Her', 'His', 'Their'])} ${cap(adj())} ${cap(noun())}`,
  // 15. Anyway / regardless
  ({ noun }) => `${cap(noun())}, ${pick(['Anyway', 'Regardless', 'Either Way', 'Eventually'])}`,
  // 16. Two nouns &
  ({ noun }) => `${cap(noun())} & ${cap(noun())}`,
  // 17. Tell + person + direction
  () => `${pick(['Tell', 'Call', 'Find', 'Send'])} ${pick(['Me', 'Mama', 'Her', 'Him', 'Them'])} ${pick(['Home', 'Back', 'Slow', 'Anyway', 'Twice'])}`,
  // 18. Like a noun
  ({ noun }) => `Like a ${cap(noun())}`,
  // 19. All my X
  ({ noun }) => `All My ${cap(noun())}`,
  // 20. Songs for X / Letters from X
  ({ noun }) => `${pick(['Songs', 'Letters', 'Stories', 'Postcards'])} ${pick(['for', 'from', 'about'])} ${cap(noun())}`,
  // 21. Born to X (clean stems only)
  ({ verb }) => {
    let v = verb();
    let attempts = 0;
    while (!isCleanStem(v) && attempts++ < 6) v = verb();
    return `Born to ${capPhrase(v)}`;
  },
  // 22. Numbered noun
  ({ noun }) => `${pick(['Two', 'Three', 'Seven', 'Twelve', 'A Hundred'])} ${cap(noun())}`,
  // 23. For the X
  ({ noun }) => `For the ${cap(noun())}`,
  // 24. Until we X (clean stems)
  ({ verb }) => {
    let v = verb();
    let attempts = 0;
    while (!isCleanStem(v) && attempts++ < 6) v = verb();
    return `Until We ${capPhrase(v)}`;
  },
  // 25. Already
  ({ verb }) => {
    let v = verb();
    let attempts = 0;
    while (!isCleanStem(v) && attempts++ < 6) v = verb();
    return `Already ${capPhrase(v)}`;
  },
  // 26. Noun in Place
  ({ noun, place }) => `${cap(noun())} in ${cap(place())}`,
  // 27. Adj noun, Place
  ({ adj, noun, place }) => `${cap(adj())} ${cap(noun())} (from ${cap(place())})`,
  // 28. Almost + adj noun
  ({ adj, noun }) => `Almost ${cap(adj())}, Almost ${cap(noun())}`,
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function capPhrase(s) {
  return s.split(' ').map((w) => cap(w)).join(' ');
}
function randomQ() { return Math.random() < 0.6 ? '?' : ''; }

// ── Generator ────────────────────────────────────────────────────────
function generateTitles(mood, genre, theme, n = 5) {
  const nounPool  = filterWords(NOUNS,  mood, genre, theme);
  const adjPool   = filterWords(ADJS,   mood, genre, theme);
  const verbPool  = filterWords(VERBS,  mood, genre, theme);
  const placePool = filterWords(PLACES, mood, genre, theme);

  const used = { noun: new Set(), adj: new Set(), verb: new Set(), place: new Set() };
  const noun  = () => { const w = pickWeighted(nounPool,  used.noun);  used.noun.add(w);  return w; };
  const adj   = () => { const w = pickWeighted(adjPool,   used.adj);   used.adj.add(w);   return w; };
  const verb  = () => { const w = pickWeighted(verbPool,  used.verb);  used.verb.add(w);  return w; };
  const place = () => { const w = pickWeighted(placePool, used.place); used.place.add(w); return w; };

  const titles = new Set();
  let attempts = 0;
  while (titles.size < n && attempts < 60) {
    attempts++;
    const pat = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    try {
      const t = pat({ noun, adj, verb, place });
      if (t && !titles.has(t)) titles.add(t);
    } catch (e) { /* skip */ }
  }
  return Array.from(titles);
}

// ── UI ───────────────────────────────────────────────────────────────
const MOODS = [
  { v: 'melancholy',  l: 'Melancholy' },
  { v: 'tender',      l: 'Tender' },
  { v: 'restless',    l: 'Restless' },
  { v: 'defiant',     l: 'Defiant' },
  { v: 'bittersweet', l: 'Bittersweet' },
  { v: 'joyful',      l: 'Joyful' },
];

const GENRES = [
  { v: 'any',     l: 'Any genre' },
  { v: 'pop',     l: 'Pop' },
  { v: 'country', l: 'Country' },
  { v: 'folk',    l: 'Folk / Americana' },
  { v: 'rock',    l: 'Rock' },
  { v: 'indie',   l: 'Indie' },
  { v: 'rnb',     l: 'R&B' },
  { v: 'hiphop',  l: 'Hip-hop' },
];

const THEMES = [
  { v: 'any',         l: 'Any theme' },
  { v: 'heartbreak',  l: 'Heartbreak' },
  { v: 'love',        l: 'Love' },
  { v: 'desire',      l: 'Desire' },
  { v: 'nostalgia',   l: 'Nostalgia' },
  { v: 'hope',        l: 'Hope' },
  { v: 'loneliness',  l: 'Loneliness' },
  { v: 'defiance',    l: 'Defiance' },
  { v: 'faith',       l: 'Faith' },
];

export default function SongTitleGenerator() {
  const [mood, setMood] = useState('melancholy');
  const [genre, setGenre] = useState('any');
  const [theme, setTheme] = useState('any');
  const [titles, setTitles] = useState([]);
  const [copied, setCopied] = useState(null);

  function regenerate() {
    setTitles(generateTitles(mood, genre, theme, 5));
    setCopied(null);
  }

  // Initial generation
  useEffect(() => { regenerate(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-regenerate when filters change
  useEffect(() => { regenerate(); }, [mood, genre, theme]); // eslint-disable-line

  function copy(t) {
    navigator.clipboard?.writeText(t);
    setCopied(t);
    setTimeout(() => setCopied(null), 1400);
  }

  function rerollOne(idx) {
    const pool = [...titles];
    const fresh = generateTitles(mood, genre, theme, 8).filter((t) => !pool.includes(t));
    if (fresh.length) {
      pool[idx] = fresh[0];
      setTitles(pool);
    }
  }

  return (
    <div class="border border-ink bg-paper-warm">
      {/* Filter bar */}
      <div class="grid grid-cols-1 md:grid-cols-3 border-b border-ink">
        <Field label="Mood" value={mood} onChange={setMood} options={MOODS} accent="left" />
        <Field label="Genre" value={genre} onChange={setGenre} options={GENRES} accent="middle" />
        <Field label="Theme" value={theme} onChange={setTheme} options={THEMES} accent="right" />
      </div>

      {/* Titles */}
      <ol class="divide-y divide-line">
        {titles.map((t, i) => (
          <li key={t + i} class="px-6 py-5 flex items-center gap-5 group hover:bg-paper transition">
            <span class="serif italic font-light text-accent leading-none flex-shrink-0" style={{ fontSize: '32px', width: '48px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span class="serif text-2xl md:text-[28px] tracking-[-0.01em] flex-1 leading-tight">{t}</span>
            <div class="flex gap-2 opacity-60 group-hover:opacity-100 transition">
              <button
                type="button"
                onClick={() => copy(t)}
                class="mono text-[10px] tracking-tracker uppercase border border-line hover:border-ink px-3 py-1.5 transition"
                aria-label="Copy title"
              >
                {copied === t ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                onClick={() => rerollOne(i)}
                class="mono text-[10px] tracking-tracker uppercase border border-line hover:border-ink px-3 py-1.5 transition"
                aria-label="Reroll just this title"
              >
                ↻
              </button>
            </div>
          </li>
        ))}
      </ol>

      {/* Action bar */}
      <div class="border-t border-ink px-6 py-4 flex justify-between items-center gap-4 flex-wrap">
        <div class="mono text-[10px] tracking-tracker text-ink-muted uppercase">
          {mood} · {genre} · {theme}
        </div>
        <button
          type="button"
          onClick={regenerate}
          class="mono text-[11px] tracking-tracker uppercase bg-ink text-paper px-5 py-2.5 hover:bg-accent transition"
        >
          Generate five more →
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, options }) {
  return (
    <label class="block p-5 border-b md:border-b-0 md:border-r border-ink last:border-r-0">
      <span class="mono text-[10px] tracking-tracker text-ink-muted uppercase block mb-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        class="serif text-xl bg-transparent w-full focus:outline-none cursor-pointer appearance-none"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%226%22 viewBox=%220 0 10 6%22%3E%3Cpath d=%22M1 1l4 4 4-4%22 stroke=%22%23B4442A%22 fill=%22none%22 stroke-width=%221.4%22 stroke-linecap=%22round%22/%3E%3C/svg%3E')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0 center',
          paddingRight: '18px',
        }}
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>{o.l}</option>
        ))}
      </select>
    </label>
  );
}
