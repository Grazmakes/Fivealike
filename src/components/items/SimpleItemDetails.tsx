'use client';

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

import { mockArtistData } from '@/data/mockData';
import { artistFallbacks } from '@/data/artistFallbacks';
import { getBookFallback } from '@/data/bookFallbacks';
import { subjectFallbacks, normalizeSubjectKey } from '@/data/subjectFallbacks';
import { getCategorySwatch, getCategoryText } from '@/utils/categoryColors';
import { isMusicCategory, isPodcastCategory } from '@/utils/categoryUtils';

interface SimpleItemDetailsProps {
  itemName: string;
  category?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  hideSpotifyEmbed?: boolean;
  initialData?: any;
}

type ZoomImage = {
  src: string;
  alt: string;
};

type AmazonCategory =
  | 'Books'
  | 'Music'
  | 'Podcasts'
  | 'Movies'
  | 'TV Shows'
  | 'Games'
  | undefined;

// Helper function for case-insensitive artist lookup
const findArtistInFallbacks = (artistName: string) => {
  // Try exact match first
  if (artistFallbacks[artistName]) {
    return artistFallbacks[artistName];
  }

  // Try case-insensitive match
  const lowerName = artistName.toLowerCase();
  const matchingKey = Object.keys(artistFallbacks).find(
    key => key.toLowerCase() === lowerName
  );

  return matchingKey ? artistFallbacks[matchingKey] : null;
};

const RICH_WIKIPEDIA_CATEGORIES = [
  'Travel',
  'Sports',
  'Technology',
  'Food',
  'Art',
  'Fashion',
  'Photography',
  'Fitness',
  'Science',
  'History',
  'Politics',
  'Comedy',
  'Horror',
  'Romance',
  'Adventure',
  'Board Games',
  'Health',
  'Relationships',
  'Business',
  'Education',
  'Transportation',
  'Pets',
  'Environment',
  'Social',
  'Shopping',
  'Work'
];

const limitToSentences = (text: string, maxSentences: number = 4): string => {
  if (!text) return '';
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, maxSentences).join(' ').trim();
};

const buildSpotifyEmbedUrl = (options: { type: 'artist' | 'show' | 'track' | 'album'; id?: string; fallbackQuery: string }) => {
  const { type, id, fallbackQuery } = options;

  if (id && id.trim().length > 0) {
    let pathSegment = 'artist';
    if (type === 'show') pathSegment = 'show';
    else if (type === 'track') pathSegment = 'track';
    else if (type === 'album') pathSegment = 'album';

    return `https://open.spotify.com/embed/${pathSegment}/${id}?utm_source=generator&theme=0&compact=1&autoplay=0`;
  }

  return `https://open.spotify.com/embed/search/${encodeURIComponent(fallbackQuery)}?utm_source=generator&theme=0&compact=1&autoplay=0`;
};

const buildAmazonUrl = (category: AmazonCategory, itemName: string): string => {
  const searchTerm = encodeURIComponent(itemName);

  switch (category) {
    case 'Music':
    case 'Podcasts':
      return `https://music.amazon.com/search/${searchTerm}`;
    case 'Movies':
    case 'TV Shows':
      return `https://www.amazon.com/gp/video/search?phrase=${searchTerm}`;
    case 'Books':
      return `https://www.amazon.com/s?k=${searchTerm}&i=stripbooks`;
    case 'Games':
      return `https://www.amazon.com/s?k=${searchTerm}&i=videogames`;
    default:
      return `https://www.amazon.com/s?k=${searchTerm}`;
  }
};

const mergeWithFallback = (primary: any, fallback: any | null | undefined) => {
  if (!fallback) return primary;
  if (!primary) return fallback;

  return {
    ...fallback,
    ...primary,
    description: primary.description || fallback.description,
    image: primary.image || primary.artwork || fallback.image,
    artwork: primary.artwork || primary.image || fallback.image,
    poster_path: primary.poster_path || fallback.poster_path,
    genres: primary.genres || fallback.genres,
    bio: primary.bio || fallback.bio,
    coverArt: primary.coverArt || fallback.coverArt,
    images: primary.images || fallback.images,
    albums: primary.albums || fallback.albums,
    id: primary.id || fallback.id,
    spotifyId: primary.spotifyId || fallback.spotifyId
  };
};

type ArtworkProps = {
  src?: string | null;
  alt: string;
  sizeClass: string;
  placeholderClass: string;
  placeholderText: string;
  onExpand: (image: ZoomImage) => void;
};

const Artwork = ({
  src,
  alt,
  sizeClass,
  placeholderClass,
  placeholderText,
  onExpand
}: ArtworkProps): JSX.Element => {
  if (src && src.trim().length > 0) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} object-contain rounded shadow-md bg-white dark:bg-gray-800 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-yellow-400`}
        onClick={() => onExpand({ src, alt })}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onExpand({ src, alt });
          }
        }}
        tabIndex={0}
        role="button"
      />
    );
  }

  return (
    <div className={`${placeholderClass} rounded shadow-md flex items-center justify-center text-white font-bold text-2xl`}>
      {placeholderText}
    </div>
  );
};

function AmazonButton({ category, itemName }: { category: AmazonCategory; itemName: string }): JSX.Element {
  return (
    <div className="mt-0 flex justify-center" style={{ marginTop: '5px' }}>
      <a
        href={buildAmazonUrl(category, itemName)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-[#FF9900] hover:bg-[#F08804] text-white font-semibold rounded-lg shadow-md transition-colors"
      >
        Try on Amazon
      </a>
    </div>
  );
}

const useFallbackData = (category: string | undefined, itemName: string) =>
  useMemo(() => {
    if (!category) return null;
    const normalized = category.toLowerCase();

    if (normalized === 'music') {
      const candidates = [
        itemName,
        itemName.replace(/ essentials? playlist/i, '').trim(),
        itemName.replace(/ fan favorites/i, '').trim(),
        itemName.replace(/ greatest hits/i, '').trim()
      ].filter(Boolean);

      for (const candidate of candidates) {
        const artist = mockArtistData[candidate] || findArtistInFallbacks(candidate);
        if (artist) {
          return {
            type: 'music',
            name: artist.name,
            description: artist.biography,
            image: artist.image,
            formed: artist.formed,
            genres: artist.genres?.join(', '),
            members: artist.members?.join(', '),
            id: artist.id
          };
        }
      }

      const subjectFallback = subjectFallbacks[normalizeSubjectKey(itemName, 'Music')];
      if (subjectFallback) {
        return {
          type: 'music',
          name: itemName,
          description: subjectFallback.description,
          image: subjectFallback.image,
          artwork: subjectFallback.image,
          id: subjectFallback.id,
          spotifyId: subjectFallback.spotifyId
        };
      }
    }

    if (normalized === 'books') {
      const candidates = [
        itemName,
        itemName.replace(/ companion stories?/i, '').trim(),
        itemName.replace(/ fan favorites?/i, '').trim()
      ].filter(Boolean);

      for (const candidate of candidates) {
        const book = getBookFallback(candidate);
        if (book) {
          return {
            volumeInfo: {
              title: book.title,
              authors: book.authors,
              description: book.description,
              imageLinks: book.thumbnail ? { thumbnail: book.thumbnail } : undefined,
              publishedDate: book.publishedDate,
              pageCount: book.pageCount
            }
          };
        }
      }
    }

    const subjectFallback = subjectFallbacks[normalizeSubjectKey(itemName, category)];
    if (subjectFallback) {
      return {
        name: itemName,
        ...subjectFallback
      };
    }

    return null;
  }, [category, itemName]);

export default function SimpleItemDetails({
  itemName,
  category,
  onClose,
  showCloseButton = true,
  hideSpotifyEmbed = false,
  initialData
}: SimpleItemDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(initialData || null);
  const [zoomImage, setZoomImage] = useState<ZoomImage | null>(null);
  const [forceWikipedia, setForceWikipedia] = useState(false);

  const fallbackData = useFallbackData(category, itemName);
  const fallbackBase = useMemo(() => {
    if (initialData && fallbackData) {
      return mergeWithFallback(initialData, fallbackData);
    }
    return initialData || fallbackData || null;
  }, [initialData, fallbackData]);

  useEffect(() => {
    if (!fallbackBase) return;

    setData(prev => {
      if (!prev) {
        return fallbackBase;
      }

      const needsImage = !prev.image && fallbackBase.image;
      const needsPoster = !prev.poster_path && fallbackBase.poster_path;
      const needsDescription = (!prev.description || prev.description.length < (fallbackBase.description?.length || 0)) && fallbackBase.description;

      if (needsImage || needsPoster || needsDescription) {
        return mergeWithFallback(prev, fallbackBase);
      }

      return prev;
    });
  }, [fallbackBase]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setForceWikipedia(false);

        if (!category) {
          setData(null);
          return;
        }

        if (RICH_WIKIPEDIA_CATEGORIES.includes(category)) {
          setData(null);
          return;
        }

        if (category === 'Books') {
          const fallback = getBookFallback(itemName);

          try {
            const response = await fetch(`/api/search/books?query=${encodeURIComponent(itemName)}&limit=1`, {
              signal: AbortSignal.timeout(30000)
            });

            if (!response.ok) {
              throw new Error(`Books API failed with status ${response.status}`);
            }

            const results = await response.json();
            const book = results?.[0];

            if (book) {
              // Merge book data with fallbackData (from subject-info API which includes subjectFallbacks)
              const mergedData = {
                volumeInfo: {
                  title: book.title,
                  authors: book.authors,
                  description: book.description || fallbackData?.description,
                  imageLinks: book.thumbnail
                    ? { thumbnail: book.thumbnail }
                    : (fallbackData?.image ? { thumbnail: fallbackData.image } : undefined),
                  publishedDate: book.publishedDate,
                  pageCount: book.pageCount,
                  categories: book.categories,
                  language: book.language,
                  infoLink: book.infoLink
                }
              };
              setData(mergedData);
              return;
            }

            if (fallback) {
              setData({
                volumeInfo: {
                  title: fallback.title,
                  authors: fallback.authors,
                  description: fallback.description,
                  imageLinks: fallback.thumbnail ? { thumbnail: fallback.thumbnail } : undefined,
                  publishedDate: fallback.publishedDate,
                  pageCount: fallback.pageCount
                }
              });
              return;
            }

            if (fallbackData) {
              setData({
                volumeInfo: {
                  title: itemName,
                  description: fallbackData.description,
                  imageLinks: fallbackData.image ? { thumbnail: fallbackData.image } : undefined
                }
              });
              return;
            }

            setData(null);
            return;
          } catch (err) {
            if (fallback) {
              setData({
                volumeInfo: {
                  title: fallback.title,
                  authors: fallback.authors,
                  description: fallback.description,
                  imageLinks: fallback.thumbnail ? { thumbnail: fallback.thumbnail } : undefined,
                  publishedDate: fallback.publishedDate,
                  pageCount: fallback.pageCount
                }
              });
              setError(null);
              return;
            }

            if (fallbackData) {
              setData({
                volumeInfo: {
                  title: itemName,
                  description: fallbackData.description,
                  imageLinks: fallbackData.image ? { thumbnail: fallbackData.image } : undefined
                }
              });
              setError(null);
              return;
            }

            throw err;
          }
        }

        if (category === 'Movies') {
          try {
            const response = await fetch(`/api/search/movies?query=${encodeURIComponent(itemName)}`, {
              signal: AbortSignal.timeout(30000)
            });

            if (!response.ok) {
              if (response.status === 404) {
                if (fallbackBase) {
                  setData(fallbackBase);
                  setError(null);
                  return;
                }

                setForceWikipedia(true);
                setData(null);
                setError(null);
                return;
              }

              throw new Error(`Movies API failed with status ${response.status}`);
            }

            const { results } = await response.json();
            if (results && results.length > 0) {
              setData(mergeWithFallback(results[0], fallbackBase));
              return;
            }

            if (fallbackBase) {
              setData(fallbackBase);
              setError(null);
              return;
            }

            setForceWikipedia(true);
            setData(null);
            return;
          } catch (err) {
            console.error('[SimpleItemDetails] Movies fetch error:', err);
            if (fallbackBase) {
              setData(fallbackBase);
              setError(null);
              return;
            }
            setData(null);
            throw err;
          }
        }

        if (category === 'TV Shows') {
          try {
            const response = await fetch(`/api/search/tvshows?query=${encodeURIComponent(itemName)}`, {
              signal: AbortSignal.timeout(30000)
            });

            if (!response.ok) {
              if (response.status === 404) {
                if (fallbackBase) {
                  setData(fallbackBase);
                  setError(null);
                  return;
                }

                setForceWikipedia(true);
                setData(null);
                setError(null);
                return;
              }

              throw new Error(`TV API failed with status ${response.status}`);
            }

            const { results } = await response.json();
            if (results && results.length > 0) {
              setData(mergeWithFallback(results[0], fallbackBase));
              return;
            }

            if (fallbackBase) {
              setData(fallbackBase);
              setError(null);
              return;
            }

            setForceWikipedia(true);
            setData(null);
            return;
          } catch (err) {
            console.error('[SimpleItemDetails] TV fetch error:', err);
            if (fallbackBase) {
              setData(fallbackBase);
              setError(null);
              return;
            }
            setData(null);
            throw err;
          }
        }

        if (category === 'Games') {
          try {
            const response = await fetch(`/api/search/games?query=${encodeURIComponent(itemName)}&limit=1`, {
              signal: AbortSignal.timeout(30000)
            });

            if (!response.ok) {
              if (response.status === 404) {
                if (fallbackData) {
                  setData(fallbackData);
                  setError(null);
                  return;
                }

                setForceWikipedia(true);
                setData(null);
                setError(null);
                return;
              }

              throw new Error(`Games API failed with status ${response.status}`);
            }

            const results = await response.json();
            if (results && results.length > 0) {
              setData(results[0]);
              return;
            }

            if (fallbackData) {
              setData(fallbackData);
              setError(null);
              return;
            }

            setForceWikipedia(true);
            setData(null);
            return;
          } catch (err) {
            console.error('[SimpleItemDetails] Games fetch error:', err);
            if (fallbackData) {
              setData(fallbackData);
              setError(null);
              return;
            }
            setData(null);
            throw err;
          }
        }

        if (category === 'Music') {
          try {
            const response = await fetch('/api/subject-info', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subject: itemName, category: 'Music' }),
              signal: AbortSignal.timeout(30000)
            });

            if (!response.ok) {
              if (response.status === 404) {
                if (fallbackData) {
                  setData(fallbackData);
                  return;
                }
                setData(null);
                setError(null);
                setForceWikipedia(true);
                return;
              }

              throw new Error(`Music API failed with status ${response.status}`);
            }

            const subjectData = await response.json();

            // Merge API data with fallback, but don't let undefined fields override fallback
            if (subjectData && (subjectData.spotifyId || subjectData.id || subjectData.image)) {
              const merged = {
                ...fallbackData,
                ...subjectData,
                // Explicitly handle fields that shouldn't be undefined
                image: subjectData.image || fallbackData?.image,
                artwork: subjectData.artwork || subjectData.image || fallbackData?.image,
                description: subjectData.description || fallbackData?.description,
                id: subjectData.id || fallbackData?.id,
                spotifyId: subjectData.spotifyId || fallbackData?.spotifyId || fallbackData?.id
              };
              setData(merged);
              return;
            }

            if (fallbackData) {
              setData(fallbackData);
              return;
            }

            setData(null);
            return;
          } catch (err) {
            console.error('[SimpleItemDetails] Music fetch error:', err);
            if (fallbackData) {
              setData(fallbackData);
              setError(null);
              return;
            }
            setData(null);
            throw err;
          }
        }

        if (category === 'Podcasts') {
          try {
            const response = await fetch('/api/subject-info', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subject: itemName, category: 'Podcasts' }),
              signal: AbortSignal.timeout(30000)
            });

            if (!response.ok) {
              if (response.status === 404) {
                if (fallbackData) {
                  setData(fallbackData);
                  return;
                }
                setData(null);
                setError(null);
                setForceWikipedia(true);
                return;
              }

              throw new Error(`Podcast API failed with status ${response.status}`);
            }

            const subjectData = await response.json();

            // Merge API data with fallback, using API images when available (iTunes has real artwork)
            if (subjectData && (subjectData.spotifyId || subjectData.image || subjectData.description)) {
              // For podcasts, always prefer Spotify/iTunes artwork over placeholder
              const merged = {
                name: itemName,
                ...subjectData,
                // Ensure API artwork takes priority
                image: subjectData.image || fallbackData?.image,
                artwork: subjectData.image || subjectData.artwork || fallbackData?.image,
                description: subjectData.description || fallbackData?.description,
                id: subjectData.spotifyId || subjectData.id || fallbackData?.id,
                spotifyId: subjectData.spotifyId || subjectData.id || fallbackData?.spotifyId || fallbackData?.id
              };
              console.log('[Podcast merge] subjectData.image:', subjectData.image);
              console.log('[Podcast merge] merged.image:', merged.image);
              setData(merged);
              return;
            }

            if (fallbackData) {
              setData(fallbackData);
              return;
            }

            setData(null);
            return;
          } catch (err) {
            console.error('[SimpleItemDetails] Podcast fetch error:', err);
            if (fallbackData) {
              setData(fallbackData);
              setError(null);
              return;
            }
            setData(null);
            throw err;
          }
        }

        setData(null);
      } catch (err) {
        console.error('[SimpleItemDetails] Error:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemName, category, fallbackData]);

  useEffect(() => {
  }, [category, data, itemName]);

  useEffect(() => {
    if (!zoomImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomImage]);

  const handleZoom = (image: ZoomImage) => {
    setZoomImage(image);
  };

  const renderMusic = () => {
    if (!data) return renderGeneric();

    const imageCandidates = [
      data.image,
      data.artwork,
      Array.isArray(data.images) ? data.images[0] : undefined,
      data.coverArt?.sources?.[0]?.url,
      Array.isArray(data.albums) ? data.albums[0] : undefined,
      fallbackData?.image,
      fallbackData?.artwork,
      subjectFallbacks[normalizeSubjectKey(itemName, category || 'Music')]?.image,
      subjectFallbacks[normalizeSubjectKey(itemName, category || 'Music')]?.artwork
    ];

    const imageUrl = imageCandidates.map(normalizeMusicImage).find(Boolean);
    const description = data.description
      ? limitToSentences(String(data.description).replace(/<[^>]*>/g, ''))
      : data.bio?.summary
      ? limitToSentences(data.bio.summary.replace(/<[^>]*>/g, ''))
      : null;

    // Check artistFallbacks for Spotify ID if API didn't provide one
    const fallbackArtist = findArtistInFallbacks(itemName);

    // Try to get Spotify ID from multiple sources
    let finalSpotifyId = data.spotifyId || data.id || fallbackArtist?.id;

    // Also check subjectFallbacks for Spotify ID
    if (!finalSpotifyId) {
      const fallbackKey = normalizeSubjectKey(itemName, category || 'Music');
      const subjectFallback = subjectFallbacks[fallbackKey];
      finalSpotifyId = subjectFallback?.spotifyId || subjectFallback?.id;
    }

    // Determine Spotify embed type based on category
    let spotifyType: 'artist' | 'track' | 'album' = 'artist';
    if (category) {
      const lowerCategory = category.toLowerCase();
      if (lowerCategory === 'songs' || lowerCategory === 'song') {
        spotifyType = 'track';
      } else if (lowerCategory === 'albums' || lowerCategory === 'album') {
        spotifyType = 'album';
      }
    }

    console.log('[Music Debug]', {
      itemName,
      category,
      spotifyType,
      dataSpotifyId: data.spotifyId,
      dataId: data.id,
      fallbackId: fallbackArtist?.id,
      subjectFallbackId: subjectFallbacks[normalizeSubjectKey(itemName, category || 'Music')]?.spotifyId,
      finalId: finalSpotifyId
    });

    const spotifyEmbedSrc = buildSpotifyEmbedUrl({
      type: spotifyType,
      id: finalSpotifyId,
      fallbackQuery: data.name || itemName
    });

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-full">
          {/* Left: Artwork with button below */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            {/* Top: Name */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white w-full max-w-xs md:w-52 text-center">{data.name || itemName}</h4>
            <Artwork
              src={imageUrl}
              alt={data.name || itemName}
              sizeClass="w-full max-w-xs md:w-52 md:h-52 h-auto"
              placeholderClass="w-full max-w-xs md:w-52 md:h-52 h-auto bg-gradient-to-br from-purple-500 to-pink-500"
              placeholderText={(data.name || itemName).substring(0, 2).toUpperCase()}
              onExpand={handleZoom}
            />
            <AmazonButton category={category as AmazonCategory} itemName={itemName} />
          </div>

          {/* Right: Description aligned with artwork */}
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left w-full px-4 md:px-0">
            {description && (
              <div className="text-base text-gray-700 dark:text-gray-300 mb-4">
                <p className="leading-relaxed">{description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Music Player - Full width below everything */}
        {!hideSpotifyEmbed && (
          <div className="w-full px-1 md:px-0 mt-4">
            <iframe
              title={`${data.name || itemName} on Spotify`}
              style={{ borderRadius: '12px' }}
              src={spotifyEmbedSrc}
              width="100%"
              height="152"
              className="md:h-[152px] h-[152px]"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
    );
  };

  const renderGames = () => {
    if (!data) return renderGeneric();

    // Check for subject fallback first (for games like Wordle with better square icons)
    const subjectFallback = subjectFallbacks[normalizeSubjectKey(itemName, 'Games')];
    const imageUrl = subjectFallback?.image || data.background_image || data.image || null;
    const descriptionSource = typeof data.description_raw === 'string' && data.description_raw.length > 0
      ? data.description_raw
      : data.description;

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-full">
          {/* Left: Artwork with button below */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            {/* Top: Name */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white w-full max-w-xs md:w-52 text-center">{data.name || itemName}</h4>
            <Artwork
              src={imageUrl || undefined}
              alt={data.name || itemName}
              sizeClass="w-full max-w-xs md:w-52 md:h-52 h-auto"
              placeholderClass="w-full max-w-xs md:w-52 md:h-52 h-auto bg-gradient-to-br from-slate-500 to-slate-700"
              placeholderText={(data.name || itemName).substring(0, 2).toUpperCase()}
              onExpand={handleZoom}
            />
            <AmazonButton category={category as AmazonCategory} itemName={itemName} />
          </div>

          {/* Right: Description aligned with artwork */}
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left">
            {descriptionSource && (
              <div className="text-base text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                  {limitToSentences(String(descriptionSource).replace(/<[^>]*>/g, ''))}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMovies = () => {
    const subjectFallback = subjectFallbacks[normalizeSubjectKey(itemName, category || 'Movies')];
    const fallbackSubject = fallbackBase || subjectFallback;
    const effectiveData = data || fallbackSubject;

    if (!effectiveData) return renderGeneric();

    const title = effectiveData.title || effectiveData.original_title || itemName;
    const posterCandidates: Array<string | null | undefined> = [
      effectiveData.poster_path ? `https://image.tmdb.org/t/p/w500${effectiveData.poster_path}` : null,
      typeof effectiveData.image === 'string' ? effectiveData.image : null,
      typeof effectiveData.artwork === 'string' ? effectiveData.artwork : null,
      typeof effectiveData.poster === 'string' ? effectiveData.poster : null,
      typeof fallbackSubject?.image === 'string' ? fallbackSubject.image : null,
      typeof fallbackSubject?.artwork === 'string' ? fallbackSubject.artwork : null,
      typeof fallbackSubject?.poster === 'string' ? fallbackSubject.poster : null,
      subjectFallback?.image,
      subjectFallback?.artwork,
      subjectFallback?.poster
    ];
    const posterUrl = posterCandidates.find(
      (candidate): candidate is string => typeof candidate === 'string' && candidate.trim().length > 0
    ) || null;

    const releaseYear = effectiveData.release_date
      ? new Date(effectiveData.release_date).getFullYear()
      : effectiveData.year;
    const description = effectiveData.overview || effectiveData.description;

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-full">
          {/* Left: Artwork with button below */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            {/* Top: Name */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white w-full max-w-xs md:w-52 text-center">{title}</h4>
            <Artwork
              src={posterUrl || undefined}
              alt={title}
              sizeClass="w-full max-w-xs md:w-52 md:h-78 h-auto"
              placeholderClass="w-full max-w-xs md:w-52 md:h-78 h-auto bg-gradient-to-br from-slate-400 to-slate-600"
              placeholderText={title.substring(0, 2).toUpperCase()}
              onExpand={handleZoom}
            />
            <AmazonButton category={category as AmazonCategory} itemName={itemName} />
          </div>

          {/* Right: Description aligned with artwork */}
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left">
            {description && (
              <div className="text-base text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">{limitToSentences(description)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTVShows = () => {
    const subjectFallback = subjectFallbacks[normalizeSubjectKey(itemName, category || 'TV Shows')];
    const fallbackSubject = fallbackBase || subjectFallback;
    const effectiveData = data || fallbackSubject;

    if (!effectiveData) return renderGeneric();

    const title = effectiveData.name || effectiveData.original_name || itemName;
    const toPosterUrl = (path?: string | null) => {
      if (!path || typeof path !== 'string') {
        return null;
      }
      return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w500${path}`;
    };
    const posterCandidates: Array<string | null | undefined> = [
      toPosterUrl(effectiveData.poster_path),
      typeof effectiveData.image === 'string' ? effectiveData.image : null,
      typeof effectiveData.artwork === 'string' ? effectiveData.artwork : null,
      typeof effectiveData.poster === 'string' ? effectiveData.poster : null,
      toPosterUrl(fallbackData?.poster_path),
      typeof fallbackSubject?.image === 'string' ? fallbackSubject.image : null,
      typeof fallbackSubject?.artwork === 'string' ? fallbackSubject.artwork : null,
      typeof fallbackSubject?.poster === 'string' ? fallbackSubject.poster : null,
      toPosterUrl(subjectFallback?.poster_path),
      typeof subjectFallback?.image === 'string' ? subjectFallback.image : null,
      typeof subjectFallback?.artwork === 'string' ? subjectFallback.artwork : null,
      typeof subjectFallback?.poster === 'string' ? subjectFallback.poster : null
    ];
    const posterUrl =
      posterCandidates.find(
        (candidate): candidate is string => typeof candidate === 'string' && candidate.trim().length > 0
      ) || null;
    const firstAirYear = effectiveData.first_air_date
      ? new Date(effectiveData.first_air_date).getFullYear()
      : effectiveData.year || effectiveData.startYear;
    const description = effectiveData.overview || effectiveData.description;
    const countries = Array.isArray(effectiveData.origin_country)
      ? effectiveData.origin_country
      : effectiveData.country
      ? [effectiveData.country]
      : [];

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-full">
          {/* Left: Artwork with button below */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            {/* Top: Name */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white w-full max-w-xs md:w-52 text-center">{title}</h4>
            <Artwork
              src={posterUrl || undefined}
              alt={title}
              sizeClass="w-full max-w-xs md:w-52 md:h-78 h-auto"
              placeholderClass="w-full max-w-xs md:w-52 md:h-78 h-auto bg-gradient-to-br from-blue-500 to-indigo-600"
              placeholderText={title.substring(0, 2).toUpperCase()}
              onExpand={handleZoom}
            />
            <AmazonButton category={category as AmazonCategory} itemName={itemName} />
          </div>

          {/* Right: Description aligned with artwork */}
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left">
            {description && (
              <div className="text-base text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">{limitToSentences(description)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderBooks = () => {
    if (!data) return renderGeneric();

    const volumeInfo = data.volumeInfo || {
      title: data.title || data.name || itemName,
      authors: data.authors,
      description: data.description,
      imageLinks: data.image || data.thumbnail ? { thumbnail: data.image || data.thumbnail } : undefined,
      publishedDate: data.publishedDate,
      pageCount: data.pageCount,
      infoLink: data.sourceUrl
    };

    const title = volumeInfo.title || data.title || data.name || itemName;
    const thumbnail = volumeInfo.imageLinks?.thumbnail || data.image || data.thumbnail || null;

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-full">
          {/* Left: Artwork with button below */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            {/* Top: Name */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white w-full max-w-xs md:w-52 text-center">{title}</h4>
            <Artwork
              src={thumbnail}
              alt={title}
              sizeClass="w-full max-w-xs md:w-52 md:h-78 h-auto"
              placeholderClass="w-full max-w-xs md:w-52 md:h-78 h-auto bg-gradient-to-br from-slate-400 to-slate-600"
              placeholderText={(title || itemName).substring(0, 2).toUpperCase()}
              onExpand={handleZoom}
            />
            <AmazonButton category={category as AmazonCategory} itemName={itemName} />
          </div>

          {/* Right: Description aligned with artwork */}
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left">
            {volumeInfo.description && (
              <div className="text-base text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">{limitToSentences(String(volumeInfo.description).replace(/<[^>]*>/g, ''))}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderPodcasts = () => {
    if (!data) return renderGeneric();

    console.log('[renderPodcasts] data:', JSON.stringify(data, null, 2));
    console.log('[renderPodcasts] fallbackData:', JSON.stringify(fallbackData, null, 2));

    // For podcasts, image URLs are always simple strings from APIs (Spotify/iTunes)
    // Don't use normalizeMusicImage which is designed for complex music objects
    const podcastImageCandidates = [
      data.image,
      data.artwork,
      fallbackData?.image,
      fallbackData?.artwork,
      subjectFallbacks[normalizeSubjectKey(itemName, category || 'Podcasts')]?.image,
      subjectFallbacks[normalizeSubjectKey(itemName, category || 'Podcasts')]?.artwork,
      Array.isArray(data.images) ? data.images[0] : undefined,
      data.coverArt?.sources?.[0]?.url
    ];

    console.log('[renderPodcasts] podcastImageCandidates:', podcastImageCandidates);
    // For podcasts, find the first valid string URL directly (no normalization needed)
    const artworkUrl = podcastImageCandidates.find(img => typeof img === 'string' && img.trim().length > 0);
    console.log('[renderPodcasts] artworkUrl:', artworkUrl);
    const spotifyEmbedSrc = buildSpotifyEmbedUrl({
      type: 'show',
      id: data.spotifyId || data.id,
      fallbackQuery: data.name || itemName
    });

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-full">
          {/* Left: Artwork with button below */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            {/* Top: Name */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white w-full max-w-xs md:w-52 text-center">{data.name || itemName}</h4>
            <Artwork
              src={artworkUrl}
              alt={data.name || itemName}
              sizeClass="w-full max-w-xs md:w-52 md:h-52 h-auto"
              placeholderClass="w-full max-w-xs md:w-52 md:h-52 h-auto bg-gradient-to-br from-blue-500 to-purple-600"
              placeholderText={(data.name || itemName).substring(0, 2).toUpperCase()}
              onExpand={handleZoom}
            />
            <AmazonButton category={category as AmazonCategory} itemName={itemName} />
          </div>

          {/* Right: Description aligned with artwork */}
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left">
            {(data.description || fallbackData?.description) && (
              <div className="text-base text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">{limitToSentences(data.description || fallbackData?.description || '')}</p>
              </div>
            )}
          </div>
        </div>

        {!hideSpotifyEmbed && (
          <div className="w-full px-1 md:px-0 mt-4">
            <iframe
              title={`${data.name || itemName} on Spotify`}
              style={{ borderRadius: '12px' }}
              src={spotifyEmbedSrc}
              width="100%"
              height="152"
              className="md:h-[152px] h-[152px]"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
    );
  };

  const renderFood = () => {
    if (!data) return renderGeneric();

    console.log('[renderFood] data:', data);
    const imageUrl = data.image || data.artwork || null;
    console.log('[renderFood] imageUrl:', imageUrl);
    const description = data.description ? limitToSentences(String(data.description)) : null;

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-full">
          {/* Left: Artwork with button below */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            {/* Top: Name */}
            <h4 className="text-xl font-bold text-gray-900 dark:text-white w-full max-w-xs md:w-52 text-center">{data.name || itemName}</h4>
            <Artwork
              src={imageUrl}
              alt={data.name || itemName}
              sizeClass="w-full max-w-xs md:w-52 md:h-52 h-auto"
              placeholderClass="w-full max-w-xs md:w-52 md:h-52 h-auto bg-gradient-to-br from-orange-400 to-red-500"
              placeholderText={(data.name || itemName).substring(0, 2).toUpperCase()}
              onExpand={handleZoom}
            />
            <AmazonButton category={category as AmazonCategory} itemName={itemName} />
          </div>

          {/* Right: Description aligned with artwork */}
          <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left w-full px-4 md:px-0">
            {description && (
              <div className="text-base text-gray-700 dark:text-gray-300 mb-4">
                <p className="leading-relaxed">{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGeneric = () => {
    if (!data) {
      return null;
    }

    return (
      <div className="space-y-2 text-center">
        <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">{data.title || data.name || itemName}</h4>
        <p className="text-base text-gray-600 dark:text-gray-400">
          {data.description ? limitToSentences(data.description) : `Details for ${itemName} would appear here.`}
        </p>
        {(!category || !RICH_WIKIPEDIA_CATEGORIES.includes(category)) && (
          <AmazonButton category={category as AmazonCategory} itemName={itemName} />
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (!category || RICH_WIKIPEDIA_CATEGORIES.includes(category)) {
      return null;
    }

    if (isMusicCategory(category)) {
      return renderMusic();
    }

    if (isPodcastCategory(category)) {
      return renderPodcasts();
    }

    switch (category) {
      case 'Books':
        return renderBooks();
      case 'Movies':
        return renderMovies();
      case 'TV Shows':
        return renderTVShows();
      case 'Games':
        return renderGames();
      case 'Food':
        return renderFood();
      default:
        return renderGeneric();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
      {showCloseButton && (
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          <span className="ml-2 text-base text-gray-600 dark:text-gray-400">Loading details...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded text-red-700">
          <h4 className="font-semibold">Error:</h4>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && renderContent()}

      {!loading && !error && (!category || RICH_WIKIPEDIA_CATEGORIES.includes(category) || forceWikipedia) && (
        <WikipediaFallback itemName={itemName} category={category} fallback={fallbackData} />
      )}

      {zoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-h-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-3 -right-3 rounded-full bg-white/90 p-2 text-gray-700 shadow hover:bg-white"
              onClick={() => setZoomImage(null)}
              aria-label="Close enlarged image"
            >
              <X size={18} />
            </button>
            <img
              src={zoomImage.src}
              alt={zoomImage.alt}
              className="max-h-[80vh] w-auto cursor-zoom-out rounded-lg shadow-2xl"
              onClick={() => setZoomImage(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function WikipediaFallback({ itemName, category, fallback }: { itemName: string; category?: string; fallback?: any }) {
  const [wikiData, setWikiData] = useState<any>(null);
  const [wikiLoading, setWikiLoading] = useState(true);
  const [zoomImage, setZoomImage] = useState<ZoomImage | null>(null);

  useEffect(() => {
    const fetchWikipediaData = async () => {
      try {
        setWikiLoading(true);

        const searchQuery = encodeURIComponent(itemName.replace(/\s+/g, '_'));
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchQuery}`);

        if (response.ok) {
          const data = await response.json();

          if (data.extract && data.extract.length > 10) {
            setWikiData({
              title: data.title,
              description: data.extract,
              thumbnail: data.thumbnail?.source || null,
              url: data.content_urls?.desktop?.page || null
            });
          }
        }
      } catch (error) {
        console.error('Wikipedia fetch error:', error);
      } finally {
        setWikiLoading(false);
      }
    };

    fetchWikipediaData();
  }, [itemName]);

  useEffect(() => {
    if (!zoomImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomImage]);

  if (wikiLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
        <span className="ml-2 text-base text-gray-600 dark:text-gray-400">Searching Wikipedia...</span>
      </div>
    );
  }

  const finalTitle = wikiData?.title || fallback?.name || itemName;
  const finalDescription = wikiData?.description || fallback?.description || '';
  const finalImage = wikiData?.thumbnail || fallback?.image || fallback?.artwork || null;
  const finalUrl = wikiData?.url || fallback?.sourceUrl || null;
  const finalSourceName = wikiData ? 'Wikipedia' : fallback?.sourceName || 'Wikipedia';

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-full">
        {/* Left: Artwork with button below */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          {/* Top: Name */}
          <h4 className="text-xl font-bold text-gray-900 dark:text-white w-full max-w-xs md:w-52 text-center">{finalTitle}</h4>
          {finalImage ? (
            <img
              src={finalImage}
              alt={finalTitle}
              className="block w-full max-w-xs md:w-52 md:h-52 h-auto object-contain rounded shadow-md bg-white dark:bg-gray-800 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => setZoomImage({ src: finalImage, alt: finalTitle })}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setZoomImage({ src: finalImage, alt: finalTitle });
                }
              }}
              tabIndex={0}
              role="button"
            />
          ) : (
            <div className="wiki-placeholder w-full max-w-xs md:w-52 md:h-52 h-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded shadow-md flex items-center justify-center text-white font-bold text-2xl">
              {itemName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <AmazonButton category={category as AmazonCategory} itemName={itemName} />
        </div>

        {/* Right: Description aligned with artwork */}
        <div className="flex-1 flex flex-col justify-start items-center md:items-start text-center md:text-left">
          {finalDescription && (
            <div className="text-base text-gray-700 dark:text-gray-300">
              <p className="leading-relaxed">{limitToSentences(finalDescription)}</p>
            </div>
          )}

          {finalUrl && (
            <div className="mt-2">
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-lg"
              >
                Read more on Wikipedia →
              </a>
            </div>
          )}
        </div>
      </div>

      {zoomImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-h-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-3 -right-3 rounded-full bg-white/90 p-2 text-gray-700 shadow hover:bg-white"
              onClick={() => setZoomImage(null)}
              aria-label="Close enlarged image"
            >
              <X size={18} />
            </button>
            <img
              src={zoomImage.src}
              alt={zoomImage.alt}
              className="max-h-[80vh] w-auto cursor-zoom-out rounded-lg shadow-2xl"
              onClick={() => setZoomImage(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
  const normalizeMusicImage = (input: any): string | undefined => {
    if (!input) return undefined;
    if (typeof input === 'string' && input.trim()) return input;
    if (typeof input === 'object') {
      if (input.url && typeof input.url === 'string') return input.url;
      if (input.artworkUrl && typeof input.artworkUrl === 'string') return input.artworkUrl;
      if (input.image && typeof input.image === 'string') return input.image;
    }
    return undefined;
  };
