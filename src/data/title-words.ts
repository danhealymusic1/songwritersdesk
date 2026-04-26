// Tagged word pool for the song title generator.
// Each entry is tagged by mood, optionally by genre, optionally by theme.
// Untagged genre/theme = fits anywhere.

export type Mood = 'melancholy' | 'defiant' | 'tender' | 'restless' | 'joyful' | 'bittersweet';
export type Genre = 'pop' | 'country' | 'folk' | 'rock' | 'indie' | 'rnb' | 'hiphop';
export type Theme = 'heartbreak' | 'hope' | 'nostalgia' | 'love' | 'loneliness' | 'defiance' | 'faith' | 'desire';

export interface Word {
  w: string;
  m: Mood[];
  g?: Genre[];
  t?: Theme[];
}

// ── NOUNS ────────────────────────────────────────────────────────────
export const NOUNS: Word[] = [
  { w: 'ghost',     m: ['melancholy','bittersweet'],            t: ['heartbreak','nostalgia','loneliness'] },
  { w: 'static',    m: ['melancholy'],                          t: ['heartbreak','loneliness'] },
  { w: 'distance',  m: ['melancholy','bittersweet'],            t: ['heartbreak','loneliness'] },
  { w: 'shadow',    m: ['melancholy'],                          t: ['heartbreak','loneliness'] },
  { w: 'silence',   m: ['melancholy','tender'],                 t: ['heartbreak','loneliness','faith'] },
  { w: 'echo',      m: ['melancholy','bittersweet'],            t: ['nostalgia','loneliness'] },
  { w: 'drift',     m: ['melancholy','restless'],               t: ['loneliness','nostalgia'] },
  { w: 'ache',      m: ['melancholy','tender'],                 t: ['heartbreak','desire'] },
  { w: 'hollow',    m: ['melancholy'],                          t: ['loneliness','heartbreak'] },
  { w: 'rain',      m: ['melancholy','tender'],                 t: ['heartbreak','nostalgia'] },
  { w: 'photograph',m: ['bittersweet'], g: ['folk','indie','country'], t: ['nostalgia','love'] },
  { w: 'letter',    m: ['bittersweet','melancholy'],            t: ['heartbreak','nostalgia'] },
  { w: 'room',      m: ['melancholy','tender'],                 t: ['loneliness','nostalgia','love'] },
  { w: 'window',    m: ['melancholy','tender'],                 t: ['loneliness','nostalgia'] },

  { w: 'honey',     m: ['tender'],          g: ['rnb','country','pop'], t: ['love','desire'] },
  { w: 'halo',      m: ['tender'],                              t: ['love','faith'] },
  { w: 'arms',      m: ['tender'],                              t: ['love'] },
  { w: 'lullaby',   m: ['tender'],          g: ['folk','indie','country'], t: ['love','faith'] },
  { w: 'anchor',    m: ['tender','melancholy'],                 t: ['love','hope'] },
  { w: 'morning',   m: ['tender','joyful'],                     t: ['love','hope'] },
  { w: 'sunday',    m: ['tender','bittersweet'], g: ['indie','folk','country'], t: ['love','nostalgia'] },
  { w: 'garden',    m: ['tender','joyful'],                     t: ['love','hope'] },
  { w: 'sweater',   m: ['tender','bittersweet'], g: ['indie','folk'], t: ['love','nostalgia'] },

  { w: 'crown',     m: ['defiant'],        g: ['rock','pop','hiphop'],  t: ['defiance'] },
  { w: 'fire',      m: ['defiant','restless'],                  t: ['desire','defiance'] },
  { w: 'gold',      m: ['defiant','restless'], g: ['hiphop','pop','rnb'], t: ['desire','defiance'] },
  { w: 'thunder',   m: ['defiant'],        g: ['rock','country','pop'], t: ['defiance'] },
  { w: 'war',       m: ['defiant'],        g: ['rock','hiphop'],        t: ['defiance','heartbreak'] },
  { w: 'bones',     m: ['defiant','melancholy'], g: ['folk','rock','indie'], t: ['heartbreak','defiance'] },
  { w: 'iron',      m: ['defiant'],        g: ['rock','folk','country'], t: ['defiance'] },
  { w: 'wildfire',  m: ['defiant','restless'], g: ['country','rock','pop'], t: ['desire','defiance'] },
  { w: 'engine',    m: ['restless','defiant'], g: ['rock','country'],   t: ['hope','desire'] },

  { w: 'highway',   m: ['restless','bittersweet'], g: ['country','folk','rock'], t: ['hope','nostalgia'] },
  { w: 'midnight',  m: ['restless','melancholy'],               t: ['desire','loneliness'] },
  { w: 'fever',     m: ['restless','defiant'], g: ['rnb','pop','hiphop'], t: ['desire'] },
  { w: 'neon',      m: ['restless','defiant'], g: ['pop','country','hiphop'], t: ['desire','nostalgia'] },
  { w: 'smoke',     m: ['restless','melancholy'],               t: ['heartbreak','desire','nostalgia'] },
  { w: 'static',    m: ['restless','melancholy'],               t: ['heartbreak','loneliness'] },
  { w: 'motion',    m: ['restless'],       g: ['hiphop','rnb','pop'],  t: ['hope','desire'] },
  { w: 'whiskey',   m: ['restless','bittersweet'], g: ['country','folk','rock'], t: ['heartbreak','desire'] },
  { w: 'tail lights',m: ['restless','melancholy'], g: ['country','folk'], t: ['heartbreak','nostalgia'] },

  { w: 'sunshine',  m: ['joyful','tender'],                     t: ['hope','love'] },
  { w: 'summer',    m: ['joyful','bittersweet'],                t: ['love','nostalgia','hope'] },
  { w: 'parade',    m: ['joyful'],         g: ['folk','indie','pop'],  t: ['hope'] },
  { w: 'harvest',   m: ['joyful','tender'], g: ['folk','country','indie'], t: ['hope','faith'] },
  { w: 'kingdom',   m: ['joyful','defiant'],                    t: ['hope','faith','defiance'] },
  { w: 'church bells',m: ['joyful','tender'], g: ['folk','country','indie'], t: ['faith','hope','love'] },
  { w: 'ferris wheel',m: ['joyful','bittersweet'], g: ['indie','folk','pop'], t: ['nostalgia','love'] },

  { w: 'religion',  m: ['defiant','tender'], g: ['indie','rock','pop'], t: ['love','faith','defiance'] },
  { w: 'heaven',    m: ['tender','melancholy'],                 t: ['love','faith','hope'] },
  { w: 'gospel',    m: ['defiant','tender'], g: ['rnb','folk','country'], t: ['faith','defiance'] },
  { w: 'sin',       m: ['defiant','restless'], g: ['country','rock','rnb'], t: ['desire','defiance','faith'] },
  { w: 'prayer',    m: ['tender','melancholy'],                 t: ['faith','hope','love'] },

  { w: 'paradise',  m: ['tender','restless','bittersweet'],     t: ['love','desire','nostalgia'] },
  { w: 'hometown',  m: ['bittersweet'], g: ['country','folk','indie'], t: ['nostalgia'] },
  { w: 'chapel',    m: ['tender','melancholy'], g: ['folk','country','indie'], t: ['faith','love'] },
  { w: 'river',     m: ['tender','melancholy'], g: ['folk','country','rock','indie'], t: ['hope','nostalgia','heartbreak'] },
  { w: 'oceans',    m: ['tender','restless'],                   t: ['love','hope'] },
  { w: 'mountain',  m: ['defiant','tender'], g: ['folk','country','rock'], t: ['hope','faith'] },
  { w: 'desert',    m: ['restless','melancholy'], g: ['folk','country','rock'], t: ['loneliness','nostalgia'] },
];

// ── ADJECTIVES ───────────────────────────────────────────────────────
export const ADJS: Word[] = [
  { w: 'pale',      m: ['melancholy','tender'],                 t: ['heartbreak','loneliness'] },
  { w: 'quiet',     m: ['melancholy','tender'],                 t: ['loneliness','love','faith'] },
  { w: 'soft',      m: ['tender','melancholy'],                 t: ['love'] },
  { w: 'easy',      m: ['tender','joyful'],                     t: ['love','hope'] },
  { w: 'slow',      m: ['tender','melancholy'],                 t: ['love','heartbreak'] },
  { w: 'warm',      m: ['tender','joyful'],                     t: ['love','hope'] },
  { w: 'electric',  m: ['restless','defiant'], g: ['pop','rock','hiphop'], t: ['desire'] },
  { w: 'wild',      m: ['restless','defiant','joyful'],         t: ['desire','hope','defiance'] },
  { w: 'golden',    m: ['joyful','bittersweet','tender'],       t: ['nostalgia','hope','love'] },
  { w: 'faded',     m: ['bittersweet','melancholy'],            t: ['nostalgia','heartbreak'] },
  { w: 'restless',  m: ['restless'],                            t: ['desire','hope'] },
  { w: 'broken',    m: ['melancholy','defiant'],                t: ['heartbreak','defiance'] },
  { w: 'holy',      m: ['tender','defiant'],                    t: ['faith','love'] },
  { w: 'reckless',  m: ['restless','defiant'],                  t: ['defiance','desire'] },
  { w: 'tender',    m: ['tender'],                              t: ['love'] },
  { w: 'lonely',    m: ['melancholy'],                          t: ['loneliness','heartbreak'] },
  { w: 'heavy',     m: ['melancholy','defiant'],                t: ['heartbreak','defiance'] },
  { w: 'bright',    m: ['joyful','tender'],                     t: ['hope','love'] },
  { w: 'cold',      m: ['melancholy'],                          t: ['heartbreak','loneliness'] },
  { w: 'broken-down',m: ['melancholy','bittersweet'], g: ['country','folk','rock'], t: ['heartbreak','nostalgia'] },
  { w: 'half',      m: ['melancholy','restless','bittersweet'], t: ['loneliness','heartbreak'] },
  { w: 'last',      m: ['melancholy','bittersweet'],            t: ['heartbreak','nostalgia'] },
  { w: 'almost',    m: ['bittersweet'],                         t: ['heartbreak','nostalgia'] },
  { w: 'used',      m: ['bittersweet'],                         t: ['nostalgia','heartbreak'] },
];

// ── VERBS (used in verb-phrase / question patterns) ─────────────────
export const VERBS: Word[] = [
  { w: 'stay',      m: ['tender','melancholy'],                 t: ['love','heartbreak'] },
  { w: 'leave',     m: ['melancholy','defiant'],                t: ['heartbreak','defiance'] },
  { w: 'run',       m: ['restless','defiant'],                  t: ['defiance','heartbreak'] },
  { w: 'fall',      m: ['tender','melancholy'],                 t: ['love','heartbreak'] },
  { w: 'burn',      m: ['defiant','restless'],                  t: ['desire','defiance'] },
  { w: 'bend',      m: ['melancholy','tender'],                 t: ['love','heartbreak'] },
  { w: 'wait',      m: ['melancholy','tender'],                 t: ['love','loneliness','hope'] },
  { w: 'forget',    m: ['melancholy','bittersweet'],            t: ['heartbreak','nostalgia'] },
  { w: 'remember',  m: ['bittersweet','tender'],                t: ['nostalgia','love'] },
  { w: 'come back', m: ['melancholy','bittersweet'],            t: ['heartbreak','nostalgia','love'] },
  { w: 'let go',    m: ['melancholy','tender'],                 t: ['heartbreak','hope'] },
  { w: 'hold on',   m: ['tender','defiant'],                    t: ['love','hope','defiance'] },
  { w: 'keep going',m: ['defiant','tender'],                    t: ['hope','defiance'] },
  { w: 'mean it',   m: ['defiant','tender'],                    t: ['love','defiance'] },
  { w: 'know better',m: ['bittersweet','melancholy'],           t: ['heartbreak','nostalgia'] },
];

// ── PLACES (used in "from X" / "in X" patterns) ─────────────────────
export const PLACES: Word[] = [
  { w: 'Brooklyn',     m: ['restless','bittersweet'], g: ['indie','rnb','hiphop'], t: ['nostalgia'] },
  { w: 'Tennessee',    m: ['bittersweet','tender'], g: ['country','folk'], t: ['nostalgia','love'] },
  { w: 'Atlanta',      m: ['restless','defiant'], g: ['hiphop','rnb','pop'], t: ['desire','defiance'] },
  { w: 'the suburbs',  m: ['bittersweet','melancholy'], g: ['indie','rock','folk'], t: ['nostalgia','loneliness'] },
  { w: 'Texas',        m: ['restless','bittersweet'], g: ['country','folk','rock'], t: ['nostalgia','love'] },
  { w: 'the basement', m: ['bittersweet','restless'], g: ['indie','rock','folk'], t: ['nostalgia','desire'] },
  { w: 'California',   m: ['restless','bittersweet','joyful'], g: ['pop','indie','folk'], t: ['hope','nostalgia'] },
  { w: 'New Orleans',  m: ['restless','tender'], g: ['rnb','folk','country'], t: ['love','desire'] },
  { w: 'Nashville',    m: ['bittersweet','restless'], g: ['country','folk'], t: ['nostalgia','hope'] },
  { w: 'the kitchen',  m: ['tender','bittersweet'], g: ['indie','folk','country'], t: ['love','nostalgia'] },
];
