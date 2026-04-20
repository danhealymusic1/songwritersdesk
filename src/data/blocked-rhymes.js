// Words we don't want the rhyme finder to surface as suggestions.
//
// Scope is deliberately narrow: slurs (racial, homophobic, transphobic,
// ableist, deeply misogynist) — NOT general profanity. Songwriters
// legitimately use "damn", "hell", "shit", "fuck", etc., and filtering those
// would make the tool less useful for honest lyric writing.
//
// If a word has legitimate non-slur usage in modern English (e.g. "retard"
// as a verb meaning "to slow down"), it's intentionally NOT in this list —
// we accept some noise in exchange for not over-filtering.
//
// Add to this list as we find false negatives. Keep it lowercase. Include
// plural and -s/-es/-ed variants explicitly.

const BLOCKED = new Set([
  // racial / ethnic slurs
  'n\u0069gger', 'n\u0069ggers', 'n\u0069gga', 'n\u0069ggas',
  'chink', 'chinks',
  'gook', 'gooks',
  'kike', 'kikes',
  'spic', 'spics',
  'wetback', 'wetbacks',
  'coon', 'coons',
  'dago', 'dagos',
  'wop', 'wops',
  // homophobic slurs
  'faggot', 'faggots',
  'fag', 'fags',
  'dyke', 'dykes',
  // transphobic slurs
  'tranny', 'trannies',
  'shemale', 'shemales',
  // ableist slurs (narrow — only the ones weaponized as slurs, not clinical terms)
  'retard', 'retards', 'retarded',
  // deeply misogynist slurs
  'cunt', 'cunts',
]);

export function isBlocked(word) {
  if (!word) return false;
  return BLOCKED.has(word.toLowerCase().trim());
}
