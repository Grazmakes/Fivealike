'use client';

import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { mockArtistData } from '@/data/mockData';
import { artistFallbacks } from '@/data/artistFallbacks';
import { getBookFallback } from '@/data/bookFallbacks';
import { getCategorySwatch, getCategoryText } from '@/utils/categoryColors';

interface SimpleItemDetailsProps {
  itemName: string;
  category?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

// Helper function to limit text to 4 sentences
const limitToSentences = (text: string, maxSentences: number = 4): string => {
  if (!text) return '';
  // Split on sentence endings (., !, ?) followed by space or end of string
  const sentences = text.split(/(?<=[.!?])\s+/);
  const limited = sentences.slice(0, maxSentences).join(' ').trim();
  return limited;
};

export default function SimpleItemDetails({ itemName, category, onClose, showCloseButton = true }: SimpleItemDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const fallbackData = useMemo(() => {
    if (!category) return null;
    const normalizedCategory = category.toLowerCase();

    if (normalizedCategory === 'music') {
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
    }

    if (normalizedCategory === 'books') {
      const book = getBookFallback(itemName);
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

    if (normalizedCategory === 'books') {
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

    return null;
  }, [category, itemName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Don't use fallback data immediately - try API first for best quality data
        // Fallback will be used if API fails (see error handlers below)

        setLoading(true);
        setError(null);

        console.log(`[SimpleItemDetails] Fetching data for "${itemName}" in category "${category}"`);
        console.log(`[SimpleItemDetails] Category type:`, typeof category);
        console.log(`[SimpleItemDetails] Category exact value:`, JSON.stringify(category));

        // Categories that should use Wikipedia fallback for rich content
        const wikipediaCategories = [
          'Travel', 'Sports', 'Technology', 'Food', 'Art', 'Fashion', 'Photography',
          'Fitness', 'Science', 'History', 'Politics', 'Comedy', 'Horror', 'Romance',
          'Adventure', 'Board Games', 'Health', 'Relationships', 'Business', 'Education',
          'Transportation', 'Pets', 'Environment', 'Social', 'Shopping', 'Work'
        ];

        if (wikipediaCategories.includes(category)) {
          console.log(`[SimpleItemDetails] ${category} category detected - using Wikipedia fallback for rich content`);
          setData(null); // This will trigger WikipediaFallback component
          return;
        }

        if (category === 'Books') {
          const bookFallback = getBookFallback(itemName);
          console.log('[SimpleItemDetails] Fetching books data...');
          try {
            const response = await fetch(`/api/search/books?query=${encodeURIComponent(itemName)}&limit=1`, {
              signal: AbortSignal.timeout(10000) // 10 second timeout
            });
            console.log('[SimpleItemDetails] Books response status:', response.status);

            if (!response.ok) {
              const errorText = await response.text();
              console.error('[SimpleItemDetails] Books API error:', response.status, errorText);
              throw new Error(`Books API failed: ${response.status}`);
            }

            const results = await response.json();
            console.log('[SimpleItemDetails] Books API results:', results);

            if (results && results.length > 0) {
              console.log('[SimpleItemDetails] Setting book data:', results[0]);
              // Transform flat API response to match expected volumeInfo structure
              const bookData = results[0];
              setData({
                volumeInfo: {
                  title: bookData.title,
                  authors: bookData.authors,
                  description: bookData.description,
                  imageLinks: bookData.thumbnail ? { thumbnail: bookData.thumbnail } : undefined,
                  publishedDate: bookData.publishedDate,
                  pageCount: bookData.pageCount,
                  categories: bookData.categories,
                  language: bookData.language,
                  infoLink: bookData.infoLink
                }
              });
            } else {
              console.log('[SimpleItemDetails] No books found, will use fallback');
              if (bookFallback) {
                setData({
                  volumeInfo: {
                    title: bookFallback.title,
                    authors: bookFallback.authors,
                    description: bookFallback.description,
                    imageLinks: bookFallback.thumbnail ? { thumbnail: bookFallback.thumbnail } : undefined,
                    publishedDate: bookFallback.publishedDate,
                    pageCount: bookFallback.pageCount
                  }
                });
              } else {
                setData(null);
              }
            }
          } catch (fetchError) {
            console.error('[SimpleItemDetails] Books fetch error:', fetchError);
            if (bookFallback) {
              setData({
                volumeInfo: {
                  title: bookFallback.title,
                  authors: bookFallback.authors,
                  description: bookFallback.description,
                  imageLinks: bookFallback.thumbnail ? { thumbnail: bookFallback.thumbnail } : undefined,
                  publishedDate: bookFallback.publishedDate,
                  pageCount: bookFallback.pageCount
                }
              });
              setError(null);
              setLoading(false);
              return;
            }
            throw fetchError;
          }
        } else if (category === 'Movies') {
          console.log('[SimpleItemDetails] Fetching movies data...');
          try {
            const response = await fetch(`/api/search/movies?query=${encodeURIComponent(itemName)}&limit=1`, {
              signal: AbortSignal.timeout(10000) // 10 second timeout
            });
            console.log('[SimpleItemDetails] Movies response status:', response.status);

            if (!response.ok) {
              const errorText = await response.text();
              console.error('[SimpleItemDetails] Movies API error:', response.status, errorText);
              throw new Error(`Movies API failed: ${response.status}`);
            }

            const results = await response.json();
            console.log('[SimpleItemDetails] Movies API results:', results);

            if (results && Array.isArray(results) && results.length > 0) {
              console.log('[SimpleItemDetails] Setting movie data:', results[0]);
              setData(results[0]);
            } else if (results && results.results && results.results.length > 0) {
              console.log('[SimpleItemDetails] Setting movie data (nested):', results.results[0]);
              setData(results.results[0]);
            } else {
              console.log('[SimpleItemDetails] No movies found, will use Wikipedia fallback');
              setData(null);
            }
          } catch (fetchError) {
            console.error('[SimpleItemDetails] Movies fetch error:', fetchError);
            throw fetchError;
          }
        } else if (category === 'Games') {
          const response = await fetch(`/api/search/games?query=${encodeURIComponent(itemName)}&limit=1`, {
            signal: AbortSignal.timeout(10000) // 10 second timeout
          });
          if (!response.ok) {
            throw new Error(`Games API failed: ${response.status}`);
          }
          const results = await response.json();
          console.log('[SimpleItemDetails] Games API results:', results);

          if (results && results.length > 0) {
            console.log('[SimpleItemDetails] Setting games data:', results[0]);
            setData(results[0]);
          } else {
            console.log('[SimpleItemDetails] No games found, will use Wikipedia fallback');
            setData(null);
          }
        } else if (category === 'Podcasts') {
          // Use subject-info API which already merges iTunes and Spotify data
          const subjectInfoResponse = await fetch(`/api/subject-info?cacheBust=${Date.now()}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
            body: JSON.stringify({ subject: itemName, category: 'Podcasts' }),
            signal: AbortSignal.timeout(10000),
            cache: 'no-store'
          });

          console.log('[SimpleItemDetails] Response status:', subjectInfoResponse.status);
          const subjectData = subjectInfoResponse.ok ? await subjectInfoResponse.json() : null;
          console.log('[SimpleItemDetails] Subject info data:', JSON.stringify(subjectData, null, 2));
          console.log('[SimpleItemDetails] Has spotifyId?:', !!subjectData?.spotifyId);
          console.log('[SimpleItemDetails] Has id?:', !!subjectData?.id);

          if (subjectData) {
            // Extract Spotify ID from sourceUrl if not present in id/spotifyId fields
            let spotifyId = subjectData.spotifyId || subjectData.id;

            if (!spotifyId && subjectData.sourceUrl && subjectData.sourceUrl.includes('open.spotify.com/show/')) {
              const match = subjectData.sourceUrl.match(/\/show\/([a-zA-Z0-9]+)/);
              if (match) {
                spotifyId = match[1];
                console.log('[SimpleItemDetails] Extracted Spotify ID from sourceUrl:', spotifyId);
                // Add the spotifyId to the data
                subjectData.spotifyId = spotifyId;
                subjectData.id = spotifyId;
              }
            }

            // Map API response fields to component expected fields
            const podcastData = {
              ...subjectData,
              name: subjectData.name || itemName,
              artwork: subjectData.image || subjectData.artwork, // Map 'image' to 'artwork'
              description: subjectData.description || '',
              spotifyId: spotifyId
            };

            console.log('[SimpleItemDetails] Setting podcast data with spotifyId:', spotifyId);
            console.log('[SimpleItemDetails] About to call setData with:', JSON.stringify(podcastData, null, 2));
            setData(podcastData);
            console.log('[SimpleItemDetails] setData called successfully');
          } else {
            // If subject-info fails, try iTunes search as fallback
            console.log('[SimpleItemDetails] Subject info returned null, trying iTunes search');
            const itunesResponse = await fetch(`/api/search/podcasts?query=${encodeURIComponent(itemName)}&limit=1`, {
              signal: AbortSignal.timeout(10000)
            });
            const itunesResults = itunesResponse.ok ? await itunesResponse.json() : [];

            if (itunesResults && itunesResults.length > 0) {
              console.log('[SimpleItemDetails] Using iTunes data without Spotify player');
              setData(itunesResults[0]);
            } else {
              console.log('[SimpleItemDetails] No podcast data found, will use Wikipedia fallback');
              setData(null);
            }
          }
        } else if (category === 'TV Shows') {
          // Skip slow TMDB API, use Wikipedia fallback immediately
          console.log('[SimpleItemDetails] Using Wikipedia fallback for TV show');
          setData(null);
        } else if (category === 'Music') {
          // Always fetch Spotify data for music
          const spotifyResponse = await fetch('/api/subject-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject: itemName, category: 'Music' }),
            signal: AbortSignal.timeout(10000)
          });

          const spotifyData = spotifyResponse.ok ? await spotifyResponse.json() : null;
          console.log('[SimpleItemDetails] Spotify data for music:', spotifyData);

          if (fallbackData) {
            // Merge fallback data with Spotify ID
            console.log('[SimpleItemDetails] Using music fallback data with Spotify ID');
            setData({
              ...fallbackData,
              spotifyId: spotifyData?.id || fallbackData.id
            });
          } else if (spotifyData?.id) {
            // Use Spotify data directly
            console.log('[SimpleItemDetails] Using Spotify data for music');
            setData({
              name: itemName,
              spotifyId: spotifyData.id,
              image: spotifyData.image,
              description: spotifyData.description
            });
          } else {
            console.log('[SimpleItemDetails] No fallback or Spotify data for music, using Wikipedia fallback');
            setData(null); // Will trigger Wikipedia fallback component
          }
        } else {
          // If no specific category handler, set data to null to trigger Wikipedia fallback
          console.log('[SimpleItemDetails] Unhandled category:', category, '- using Wikipedia fallback');
          setData(null);
        }
      } catch (err) {
        console.error('[SimpleItemDetails] Error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemName, category, fallbackData]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
      {showCloseButton && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {itemName}
          </h3>
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
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Loading details...
          </span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded text-red-700">
          <h4 className="font-semibold">Error:</h4>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && data && (
        <div className="space-y-3">
          {category === 'Books' && data.volumeInfo ? (
            <div className="flex flex-col items-center space-y-4">
              {/* Book cover */}
              <div className="flex-shrink-0 flex flex-col items-center">
                {(() => {
                  const thumbnail = data.volumeInfo.imageLinks?.thumbnail;
                  if (thumbnail) {
                    return (
                      <img
                        src={thumbnail}
                        alt={data.volumeInfo.title}
                        className="w-56 h-72 object-contain rounded shadow-md bg-white dark:bg-gray-800"
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.log('Book cover failed to load:', target.src);
                          target.style.display = 'none';
                          const placeholder = target.parentElement?.querySelector('.book-placeholder');
                          if (placeholder) {
                            (placeholder as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                    );
                  } else {
                    return (
                      <div className="book-placeholder w-56 h-72 bg-gradient-to-br from-slate-400 to-slate-600 rounded shadow-md flex items-center justify-center text-white font-bold text-2xl">
                        {data.volumeInfo.title.substring(0, 2).toUpperCase()}
                      </div>
                    );
                  }
                })()}

                {/* Amazon button under cover */}
                <div className="mt-3 w-56">
                  <a
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(itemName)}&i=stripbooks`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-2 px-3 rounded text-center text-base">
                      Try on Amazon
                    </div>
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="w-full space-y-3 text-center">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {data.volumeInfo.title}
                </h4>

                <div className="space-y-1">
                  {data.volumeInfo.authors && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      By: {data.volumeInfo.authors.join(', ')}
                    </p>
                  )}
                  {data.volumeInfo.publishedDate && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Published: {data.volumeInfo.publishedDate}
                    </p>
                  )}
                  {data.volumeInfo.pageCount && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Pages: {data.volumeInfo.pageCount}
                    </p>
                  )}
                  {data.volumeInfo.categories && data.volumeInfo.categories.length > 0 && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Genre: {data.volumeInfo.categories[0]}
                    </p>
                  )}
                </div>

                {data.volumeInfo.description && (
                  <div className="text-base text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed font-semibold">
                      {limitToSentences(data.volumeInfo.description.replace(/<[^>]*>/g, ''))}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : category === 'Movies' && data ? (
            <div className="flex flex-col items-center space-y-4">
              {/* Poster */}
              <div className="flex-shrink-0 flex flex-col items-center">
                {data.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt={data.title || itemName}
                    className="w-56 h-72 object-contain rounded shadow-md bg-white dark:bg-gray-800"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('Image failed to load:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                )}

                {/* Amazon button under poster */}
                <div className="mt-3 w-56">
                  <a
                    href={`https://www.amazon.com/gp/video/search?phrase=${encodeURIComponent(itemName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="bg-yellow-500 text-white font-semibold py-2 px-3 rounded text-center text-base">
                      Try on Amazon
                    </div>
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="w-full space-y-3 text-center">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {data.title || data.original_title || itemName}
                </h4>

                <div className="space-y-1">
                  {data.release_date && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Released: {new Date(data.release_date).getFullYear()}
                    </p>
                  )}
                  {data.vote_average && data.vote_average > 0 && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Rating: {data.vote_average.toFixed(1)}/10 ({data.vote_count || 0} votes)
                    </p>
                  )}
                </div>

                {data.overview && (
                  <div className="text-base text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed font-semibold">
                      {limitToSentences(data.overview)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : category === 'Music' && data ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                {/* Artist artwork */}
                <div className="flex-shrink-0 relative flex flex-col items-center">
                  {(() => {
                    const imageUrl = data.image;
                    console.log('[SimpleItemDetails] Rendering music artwork. imageUrl:', imageUrl);

                    if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '') {
                      return (
                        <>
                          <img
                            src={imageUrl}
                            alt={data.name || itemName}
                            className="w-56 h-56 object-cover rounded shadow-md bg-white dark:bg-gray-800"
                            onLoad={() => {
                              console.log('[SimpleItemDetails] Image loaded successfully:', imageUrl);
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              console.error('[SimpleItemDetails] Image failed to load:', target.src);
                              target.style.display = 'none';
                              const placeholder = target.parentElement?.querySelector('.music-placeholder');
                              if (placeholder) {
                                (placeholder as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                          <div className="music-placeholder w-56 h-56 bg-gradient-to-br from-purple-500 to-pink-500 rounded shadow-md flex items-center justify-center text-white font-bold text-2xl absolute top-0 left-0" style={{display: 'none'}}>
                            {(data.name || itemName).substring(0, 2).toUpperCase()}
                          </div>
                        </>
                      );
                    } else {
                      console.log('[SimpleItemDetails] No valid image URL, showing placeholder');
                      return (
                        <div className="w-56 h-56 bg-gradient-to-br from-purple-500 to-pink-500 rounded shadow-md flex items-center justify-center text-white font-bold text-2xl">
                          {(data.name || itemName).substring(0, 2).toUpperCase()}
                        </div>
                      );
                    }
                  })()}

                  {/* Amazon button under artwork */}
                  <div className="mt-3 w-56">
                    <a
                      href={`https://music.amazon.com/search/${encodeURIComponent(itemName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <div className="bg-yellow-500 text-white font-semibold py-2 px-3 rounded text-center text-base">
                        Try on Amazon
                      </div>
                    </a>
                  </div>
                </div>

                {/* Details */}
                <div className="w-full space-y-3 text-center">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {data.name}
                  </h4>

                  <div className="space-y-1">
                    {data.type && (
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        Type: {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                      </p>
                    )}
                    {(() => {
                      if (!data.genres) return null;
                      if (Array.isArray(data.genres) && data.genres.length > 0) {
                        return (
                          <p className="text-base text-gray-600 dark:text-gray-400">
                            Genres: {data.genres.slice(0, 3).join(', ')}
                          </p>
                        );
                      }
                      if (typeof data.genres === 'string' && data.genres.trim().length > 0) {
                        return (
                          <p className="text-base text-gray-600 dark:text-gray-400">
                            Genres: {data.genres}
                          </p>
                        );
                      }
                      return null;
                    })()}
                    {data.popularity && data.popularity > 0 && (
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        Popularity: {data.popularity}/100
                      </p>
                    )}
                    {data.followers && data.followers.total > 0 && (
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        Followers: {data.followers.total.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {data.description ? (
                    <div className="text-base text-gray-700 dark:text-gray-300">
                      <p className="leading-relaxed font-semibold">
                        {limitToSentences(String(data.description).replace(/<[^>]*>/g, ''))}
                      </p>
                    </div>
                  ) : data.bio && data.bio.summary ? (
                    <div className="text-base text-gray-700 dark:text-gray-300">
                      <p className="leading-relaxed font-semibold">
                        {limitToSentences(data.bio.summary.replace(/<[^>]*>/g, ''))}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Spotify Player for Music */}
              {(data.spotifyId || data.id) && (
                <div className="w-full mt-3">
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/artist/${data.spotifyId || data.id}?utm_source=generator`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ) : category === 'Games' && data ? (
            <div className="flex flex-col items-center space-y-4">
              {/* Game image */}
              <div className="flex-shrink-0 flex flex-col items-center">
                {data.background_image && (
                  <img
                    src={data.background_image}
                    alt={data.name}
                    className="w-56 h-32 object-contain rounded shadow-md bg-white dark:bg-gray-800"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('Game image failed to load:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                )}

                {/* Amazon button under game image */}
                <div className="mt-3 w-56">
                  <a
                    href={`https://www.amazon.com/s?k=${encodeURIComponent(itemName)}&i=videogames`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="bg-yellow-500 text-white font-semibold py-2 px-3 rounded text-center text-base">
                      Try on Amazon
                    </div>
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="w-full space-y-3 text-center">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {data.name}
                </h4>

                <div className="space-y-1">
                  {data.released && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Released: {new Date(data.released).getFullYear()}
                    </p>
                  )}
                  {data.rating && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Rating: {data.rating}/5 {data.rating_count && `(${data.rating_count.toLocaleString()} reviews)`}
                    </p>
                  )}
                  {data.metacritic && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Metacritic: {data.metacritic}/100
                    </p>
                  )}
                  {data.esrb_rating && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      ESRB: {data.esrb_rating}
                    </p>
                  )}
                  {data.genres && data.genres.length > 0 && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Genres: {data.genres.slice(0, 3).join(', ')}
                    </p>
                  )}
                  {data.platforms && data.platforms.length > 0 && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Platforms: {Array.isArray(data.platforms) ? data.platforms.slice(0, 4).join(', ') : data.platforms}
                      {data.platforms.length > 4 && ` +${data.platforms.length - 4} more`}
                    </p>
                  )}
                </div>

                {(data.description || data.description_raw) && (
                  <div className="text-base text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">
                      {limitToSentences(data.description || data.description_raw)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : category === 'Podcasts' && data ? (
            <div className="flex flex-col items-center space-y-4">
              {/* Podcast artwork */}
              <div className="flex-shrink-0 flex flex-col items-center">
                {data.artwork && (
                  <img
                    src={data.artwork}
                    alt={data.name}
                    className="w-56 h-56 object-contain rounded shadow-md bg-white dark:bg-gray-800"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('Podcast artwork failed to load:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                )}

                {/* Amazon button under podcast artwork */}
                <div className="mt-3 w-56">
                  <a
                    href={`https://music.amazon.com/search/${encodeURIComponent(itemName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="bg-yellow-500 text-white font-semibold py-2 px-3 rounded text-center text-base">
                      Try on Amazon
                    </div>
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="w-full space-y-3 text-center">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {data.name}
                </h4>

                <div className="space-y-1">
                  {data.artist && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      By: {data.artist}
                    </p>
                  )}
                  {data.genre && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Genre: {data.genre}
                    </p>
                  )}
                  {data.trackCount && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Episodes: {data.trackCount}
                    </p>
                  )}
                </div>

                {data.description && (
                  <div className="text-base text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">
                      {limitToSentences(data.description)}
                    </p>
                  </div>
                )}
              </div>

              {/* Spotify Player for Podcasts - only show if we have a valid Spotify ID */}
              {(() => {
                console.log('[SimpleItemDetails] Rendering podcast player check - data.spotifyId:', data.spotifyId);
                console.log('[SimpleItemDetails] Full data object:', JSON.stringify(data, null, 2));
                return data.spotifyId ? (
                  <div className="w-full mt-3">
                    <iframe
                      style={{ borderRadius: '12px' }}
                      src={`https://open.spotify.com/embed/show/${data.spotifyId}?utm_source=generator`}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                ) : null;
              })()}
            </div>
          ) : category === 'TV Shows' && data ? (
            <div className="flex flex-col items-center space-y-4">
              {/* TV Show poster */}
              <div className="flex-shrink-0 flex flex-col items-center">
                {data.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt={data.name || itemName}
                    className="w-56 h-72 object-contain rounded shadow-md bg-white dark:bg-gray-800"
                    style={{ objectFit: 'contain' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('TV Show poster failed to load:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                )}

                {/* Amazon button under TV show poster */}
                <div className="mt-3 w-56">
                  <a
                    href={`https://www.amazon.com/gp/video/search?phrase=${encodeURIComponent(itemName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="bg-yellow-500 text-white font-semibold py-2 px-3 rounded text-center text-base">
                      Try on Amazon
                    </div>
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="w-full space-y-3 text-center">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {data.name || data.original_name || itemName}
                </h4>

                <div className="space-y-1">
                  {data.first_air_date && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      First Aired: {new Date(data.first_air_date).getFullYear()}
                    </p>
                  )}
                  {data.vote_average && data.vote_average > 0 && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Rating: {data.vote_average.toFixed(1)}/10 ({data.vote_count || 0} votes)
                    </p>
                  )}
                  {data.origin_country && data.origin_country.length > 0 && (
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Country: {data.origin_country.join(', ')}
                    </p>
                  )}
                </div>

                {data.overview && (
                  <div className="text-base text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed font-semibold">
                      {limitToSentences(data.overview)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{data.title || data.name || itemName}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{data.description ? limitToSentences(data.description) : `Details for ${itemName} would appear here.`}</p>
              <div className="mt-3">
                <a
                  href={`https://www.amazon.com/s?k=${encodeURIComponent(itemName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-24 hover:opacity-80 transition-opacity"
                >
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-2 px-3 rounded text-center text-sm">
                    Try on Amazon
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && !error && !data && (
        <WikipediaFallback itemName={itemName} category={category} />
      )}
    </div>
  );
}

function WikipediaFallback({ itemName, category }: { itemName: string; category?: string }) {
  const [wikiData, setWikiData] = useState<any>(null);
  const [wikiLoading, setWikiLoading] = useState(true);

  useEffect(() => {
    const fetchWikipediaData = async () => {
      try {
        setWikiLoading(true);

        // Try to fetch from Wikipedia API
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

  if (wikiLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          Searching Wikipedia...
        </span>
      </div>
    );
  }

  if (!wikiData) {
    return (
      <p className="text-gray-600 dark:text-gray-400">No details found for &quot;{itemName}&quot;</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Wikipedia thumbnail */}
      <div className="flex-shrink-0 flex flex-col items-center">
        {wikiData.thumbnail ? (
          <img
            src={wikiData.thumbnail}
            alt={wikiData.title}
            className="w-48 h-48 object-contain rounded shadow-md bg-white dark:bg-gray-800"
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.log('Wikipedia image failed to load:', target.src);
              target.style.display = 'none';
              const placeholder = target.parentElement?.querySelector('.wiki-placeholder');
              if (placeholder) {
                (placeholder as HTMLElement).style.display = 'flex';
              }
            }}
          />
        ) : null}
        <div className="wiki-placeholder w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded shadow-md flex items-center justify-center text-white font-bold text-2xl" style={{display: wikiData.thumbnail ? 'none' : 'flex'}}>
          {itemName.substring(0, 2).toUpperCase()}
        </div>

        {/* Amazon button under cover */}
        <div className="mt-2 w-48">
          <a
            href={(() => {
              const searchTerm = encodeURIComponent(itemName);
              if (category === 'Music' || category === 'Podcasts') {
                return `https://music.amazon.com/search/${searchTerm}`;
              } else if (category === 'TV Shows' || category === 'Movies') {
                return `https://www.amazon.com/gp/video/search?phrase=${searchTerm}`;
              } else if (category === 'Books') {
                return `https://www.amazon.com/s?k=${searchTerm}&i=stripbooks`;
              } else if (category === 'Games') {
                return `https://www.amazon.com/s?k=${searchTerm}&i=videogames`;
              } else {
                return `https://www.amazon.com/s?k=${searchTerm}`;
              }
            })()}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            <div className="bg-yellow-500 text-white font-semibold py-2 px-3 rounded text-center text-base">
              Try on Amazon
            </div>
          </a>
        </div>
      </div>

      {/* Details */}
      <div className="w-full text-center">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {wikiData.title}
        </h4>

        <div className="space-y-1 mb-3">
          <p className="text-base text-gray-600 dark:text-gray-400">
            Source: Wikipedia
          </p>
          {category && (
            <div className="group flex items-center justify-center space-x-2 text-base text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              <span>Category:</span>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getCategorySwatch(category)} transition-all duration-200 group-hover:scale-125 group-hover:shadow-lg`}></div>
                <span className={`font-medium ${getCategoryText(category)} group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors`}>
                  {category}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="text-base text-gray-700 dark:text-gray-300">
          <p className="leading-relaxed">
            {limitToSentences(wikiData.description)}
          </p>
        </div>

        <div className="mt-3 space-y-2">
          {wikiData.url && (
            <div>
              <a
                href={wikiData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-base"
              >
                Read more on Wikipedia →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
