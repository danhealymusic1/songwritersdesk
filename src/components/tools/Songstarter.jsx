import { useState } from 'react';

// A deterministic-ish pseudo-random pick so the UI feels alive without needing a backend.
// For v1 we generate starters from curated pools; v2 swap to a proper LLM call server-side.

const MOODS = [
  'heartbroken', 'nostalgic', 'furious', 'hopeful', 'lonely', 'euphoric',
  'bitter', 'guilty', 'tender', 'wistful', 'restless', 'numb', 'liberated',
  'obsessed', 'grateful', 'resigned',
];

const VIBES = [
  'indie-folk (capo 3, open chords)', 'dark pop (half-time drums, breathy vocal)',
  'americana (slide guitar, 3/4 waltz)', 'lo-fi bedroom (tape hiss, soft synth)',
  'acoustic pop (bright strum, major 7ths)', 'country ballad (pedal steel, cried chorus)',
  'synthwave (analog pads, programmed drums)', 'neo-soul (Rhodes, 7th chords)',
  'hip-hop (sparse beat, sample loop)', 'anthemic pop-rock (big chorus, 4/4)',
];

const SITUATIONS = [
  "a friendship that ended without a fight",
  "calling your mother less than you should",
  "the room where it happened, months later",
  "a version of yourself you're slowly grieving",
  "someone you still text when you're drunk",
  "staying somewhere you've outgrown",
  "being the person everyone expects to be fine",
  "finding an old photo of someone who hurt you",
  "walking past a place you used to love",
  "being in love and not saying so",
  "realising you were the villain of the story",
  "a future you're not sure you want anymore",
];

const PERSPECTIVES = [
  'first person, addressed to a "you" who will never hear it',
  'first person, but you are the one being told',
  "third person, about someone you can't name",
  'narrated from the future, looking back',
  'a letter you never sent',
  "a conversation you're having with yourself at 3am",
];

const METAPHOR_SEEDS = [
  'weather', 'architecture', 'water', 'motorways', 'fruit', 'fire',
  'old machines', 'empty rooms', 'airports', 'clothes', 'gardens',
  'radio signals', 'handwriting', 'scar tissue', 'photographs', 'ice',
];

const OPENING_LINES = [
  "I keep the blinds half-open so I don't have to choose",
  "You were the last person who knew my middle name by heart",
  "The kettle takes three minutes — I've been counting since March",
  "There's a version of me still waiting at the gate",
  "I learnt to cook the thing you hated",
  "The road back is longer than the road out was",
  "I found your name in my phone under a word I don't remember choosing",
  "Everything I wanted in autumn I'm afraid of in spring",
];

const KEYS = ['C major', 'A minor', 'G major', 'E minor', 'D major', 'F# minor', 'Ab major', 'C# minor'];
const TEMPOS = ['72 BPM (slow drag)', '88 BPM (breathing room)', '96 BPM (ballad pace)', '110 BPM (steady)', '124 BPM (forward motion)'];

function sample(arr, seed) {
  return arr[Math.abs(hash(seed)) % arr.length];
}

function sampleMany(arr, n, seed) {
  const out = [];
  const used = new Set();
  let i = 0;
  while (out.length < n && i < arr.length * 3) {
    const idx = Math.abs(hash(seed + i)) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      out.push(arr[idx]);
    }
    i++;
  }
  return out;
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h;
}

function generate({ age, identity, mood, context, vibe, seed }) {
  const key = `${age}|${identity}|${mood}|${context}|${vibe}|${seed}`;
  return {
    situation: sample(SITUATIONS, key + 's'),
    perspective: sample(PERSPECTIVES, key + 'p'),
    openingLine: sample(OPENING_LINES, key + 'o'),
    metaphors: sampleMany(METAPHOR_SEEDS, 2, key + 'm'),
    key: sample(KEYS, key + 'k'),
    tempo: sample(TEMPOS, key + 't'),
    vibe: vibe || sample(VIBES, key + 'v'),
    mood: mood || sample(MOODS, key + 'md'),
  };
}

export default function Songstarter() {
  const [form, setForm] = useState({
    age: '',
    identity: '',
    mood: '',
    context: '',
    vibe: '',
  });
  const [result, setResult] = useState(null);
  const [seed, setSeed] = useState(0);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setResult(generate({ ...form, seed: String(seed) }));
  };

  const onAnother = () => {
    setSeed((s) => s + 1);
    setResult(generate({ ...form, seed: String(seed + 1) }));
  };

  return (
    <div className="bg-paper-warm border border-ink/10 rounded-lg p-6 md:p-8">
      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-ink-muted">Age (optional)</span>
          <input
            name="age"
            value={form.age}
            onChange={onChange}
            placeholder="e.g. 24"
            className="px-3 py-2 rounded-md border border-ink/20 bg-paper focus:border-accent focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-ink-muted">Identity (optional)</span>
          <input
            name="identity"
            value={form.identity}
            onChange={onChange}
            placeholder="e.g. female, non-binary, parent, etc."
            className="px-3 py-2 rounded-md border border-ink/20 bg-paper focus:border-accent focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-ink-muted">Mood</span>
          <input
            name="mood"
            value={form.mood}
            onChange={onChange}
            placeholder="e.g. wistful, furious, hopeful"
            className="px-3 py-2 rounded-md border border-ink/20 bg-paper focus:border-accent focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-ink-muted">Something on your mind (optional)</span>
          <input
            name="context"
            value={form.context}
            onChange={onChange}
            placeholder="e.g. my dad's memory, moving city"
            className="px-3 py-2 rounded-md border border-ink/20 bg-paper focus:border-accent focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          <span className="text-ink-muted">Vibe (optional)</span>
          <input
            name="vibe"
            value={form.vibe}
            onChange={onChange}
            placeholder="e.g. indie-folk, dark pop, country ballad"
            className="px-3 py-2 rounded-md border border-ink/20 bg-paper focus:border-accent focus:outline-none"
          />
        </label>
        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className="px-5 py-3 rounded-md bg-ink text-paper hover:bg-accent transition-colors font-semibold"
          >
            Give me a starter
          </button>
          {result && (
            <button
              type="button"
              onClick={onAnother}
              className="px-5 py-3 rounded-md border border-ink/20 hover:border-accent hover:text-accent transition"
            >
              Another
            </button>
          )}
        </div>
      </form>

      {result && (
        <div className="border-t border-ink/10 pt-6 space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-ink-muted mb-1">The situation to mine</div>
            <div className="serif text-lg">{result.situation}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-ink-muted mb-1">Perspective</div>
            <div>{result.perspective}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-ink-muted mb-1">An opening line to react to</div>
            <div className="italic">&ldquo;{result.openingLine}&rdquo;</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-ink-muted mb-1">Metaphor territory</div>
            <div>{result.metaphors.join(' × ')}</div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-muted mb-1">Mood</div>
              <div>{result.mood}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-muted mb-1">Vibe</div>
              <div>{result.vibe}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-muted mb-1">Suggested</div>
              <div>{result.key} · {result.tempo}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
