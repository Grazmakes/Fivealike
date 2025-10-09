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

const buildSpotifyEmbedUrl = (options: { type: 'artist' | 'show'; id?: string; fallbackQuery: string }) => {
  const { type, id, fallbackQuery } = options;

  if (id && id.trim().length > 0) {
    const pathSegment = type === 'show' ? 'show' : 'artist';
    return `https://open.spotify.com/embed/${pathSegment}/${id}?utm_source=generator&theme=0&compact=1`;
  }

  return `https://open.spotify.com/embed/search/${encodeURIComponent(fallbackQuery)}?utm_source=generator&theme=0&compact=1`;
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
        const artist = mockArtistData[candidate] || artistFallbacks[candidate];
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
  hideSpotifyEmbed = false
}: SimpleItemDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [zoomImage, setZoomImage] = useState<ZoomImage | null>(null);
  const [forceWikipedia, setForceWikipedia] = useState(false);

  const fallbackData = useFallbackData(category, itemName);

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
              signal: AbortSignal.timeout(10000)
            });

            if (!response.ok) {
              throw new Error(`Books API failed with status ${response.status}`);
            }

            const results = await response.json();
            const book = results?.[0];

            if (book) {
              setData({
                volumeInfo: {
                  title: book.title,
                  authors: book.authors,
                  description: book.description,
                  imageLinks: book.thumbnail ? { thumbnail: book.thumbnail } : undefined,
                  publishedDate: book.publishedDate,
                  pageCount: book.pageCount,
                  categories: book.categories,
                  language: book.language,
                  infoLink: book.infoLink
                }
              });
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
            throw err;
          }
        }

        if (category === 'Movies') {
          try {
            const response = await fetch(`/api/search/movies?query=${encodeURIComponent(itemName)}`, {
              signal: AbortSignal.timeout(10000)
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

              throw new Error(`Movies API failed with status ${response.status}`);
            }

            const { results } = await response.json();
            if (results && results.length > 0) {
              setData(mergeWithFallback(results[0], fallbackData));
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
            console.error('[SimpleItemDetails] Movies fetch error:', err);
            if (fallbackData) {
              setData(fallbackData);
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
              signal: AbortSignal.timeout(10000)
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

              throw new Error(`TV API failed with status ${response.status}`);
            }

            const { results } = await response.json();
            if (results && results.length > 0) {
              setData(mergeWithFallback(results[0], fallbackData));
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
            console.error('[SimpleItemDetails] TV fetch error:', err);
            if (fallbackData) {
              setData(fallbackData);
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
              signal: AbortSignal.timeout(10000)
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
              signal: AbortSignal.timeout(10000)
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

            if (subjectData && (subjectData.spotifyId || subjectData.id || subjectData.image)) {
              setData(mergeWithFallback(subjectData, fallbackData));
              return;
            }

            if (fallbackData) {
              setData(fallbackData);
              return;
            }

            setData(null);
            return;
          } catch (err) {
            if (fallbackData) {
              setData(fallbackData);
              setError(null);
              return;
            }
            console.error('[SimpleItemDetails] Music fetch error:', err);
            throw err;
          }
        }

        if (category === 'Podcasts') {
          try {
            const response = await fetch('/api/subject-info', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subject: itemName, category: 'Podcasts' }),
              signal: AbortSignal.timeout(10000)
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

            if (subjectData && (subjectData.spotifyId || subjectData.image)) {
              setData(mergeWithFallback(subjectData, fallbackData));
              return;
            }

            if (fallbackData) {
              setData(fallbackData);
              return;
            }

            setData(null);
            return;
          } catch (err) {
            if (fallbackData) {
              setData(fallbackData);
              setError(null);
              return;
            }
            console.error('[SimpleItemDetails] Podcast fetch error:', err);
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

    const spotifyEmbedSrc = buildSpotifyEmbedUrl({
      type: 'artist',
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
              height="80"
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
    if (!data) return renderGeneric();

    const title = data.title || data.original_title || itemName;
    const posterUrl = data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : data.image || data.artwork || null;
    const releaseYear = data.release_date
      ? new Date(data.release_date).getFullYear()
      : data.year;
    const description = data.overview || data.description;

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
    if (!data) return renderGeneric();

    const title = data.name || data.original_name || itemName;
    const posterUrl = data.poster_path
      ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
      : data.image || data.artwork || null;
    const firstAirYear = data.first_air_date
      ? new Date(data.first_air_date).getFullYear()
      : data.year || data.startYear;
    const description = data.overview || data.description;
    const countries = Array.isArray(data.origin_country)
      ? data.origin_country
      : data.country
      ? [data.country]
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

    const podcastImageCandidates = [
      data.artwork,
      data.image,
      Array.isArray(data.images) ? data.images[0] : undefined,
      data.coverArt?.sources?.[0]?.url,
      fallbackData?.image,
      fallbackData?.artwork,
      subjectFallbacks[normalizeSubjectKey(itemName, category || 'Podcasts')]?.image,
      subjectFallbacks[normalizeSubjectKey(itemName, category || 'Podcasts')]?.artwork
    ];

    const artworkUrl = podcastImageCandidates.map(normalizeMusicImage).find(Boolean);
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
            {data.description && (
              <div className="text-base text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">{limitToSentences(data.description)}</p>
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
              height="80"
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
