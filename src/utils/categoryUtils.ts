export const MUSIC_CATEGORY_KEYWORDS = [
  'music',
  'hip-hop',
  'hip hop',
  'rap',
  'r&b',
  'rnb',
  'soul',
  'jazz',
  'classical',
  'country',
  'folk',
  'blues',
  'metal',
  'punk',
  'indie',
  'electronic',
  'dance',
  'edm',
  'house',
  'techno',
  'k-pop',
  'kpop',
  'latin',
  'reggae',
  'afrobeats',
  'world',
  'soundtrack',
  'opera',
  'gospel',
  'funk',
  'disco'
];

export const PODCAST_CATEGORY_KEYWORDS = [
  'podcast',
  'podcasts',
  'talk show',
  'audio drama',
  'radio'
];

export const isMusicCategory = (category?: string): boolean => {
  if (!category) return false;
  const normalizedCategory = category.toLowerCase();
  return MUSIC_CATEGORY_KEYWORDS.some((keyword) => normalizedCategory.includes(keyword));
};

export const isPodcastCategory = (category?: string): boolean => {
  if (!category) return false;
  const normalizedCategory = category.toLowerCase();
  return PODCAST_CATEGORY_KEYWORDS.some((keyword) => normalizedCategory.includes(keyword));
};
