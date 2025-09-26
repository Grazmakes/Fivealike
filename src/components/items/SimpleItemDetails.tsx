'use client';

import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { mockArtistData } from '@/data/mockData';
import { artistFallbacks } from '@/data/artistFallbacks';
import { getBookFallback } from '@/data/bookFallbacks';

interface SimpleItemDetailsProps {
  itemName: string;
  category?: string;
  onClose: () => void;
}

export default function SimpleItemDetails({ itemName, category, onClose }: SimpleItemDetailsProps) {
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
            members: artist.members?.join(', ')
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
        // For music, prioritize live API over fallbacks
        const shouldPrioritizeLiveAPI = category === 'Music';

        if (fallbackData && !shouldPrioritizeLiveAPI) {
          setData(fallbackData);
          setError(null);
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        console.log(`[SimpleItemDetails] Fetching data for "${itemName}" in category "${category}"`);
        console.log(`[SimpleItemDetails] Category type:`, typeof category);
        console.log(`[SimpleItemDetails] Category exact value:`, JSON.stringify(category));

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
              setData(results[0]);
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

            if (results && results.results && results.results.length > 0) {
              console.log('[SimpleItemDetails] Setting movie data:', results.results[0]);
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
          const response = await fetch(`/api/search/podcasts?query=${encodeURIComponent(itemName)}&limit=1`, {
            signal: AbortSignal.timeout(10000) // 10 second timeout
          });
          if (!response.ok) {
            throw new Error(`Podcasts API failed: ${response.status}`);
          }
          const results = await response.json();
          console.log('[SimpleItemDetails] Podcasts API results:', results);

          if (results && results.length > 0) {
            console.log('[SimpleItemDetails] Setting podcasts data:', results[0]);
            setData(results[0]);
          } else {
            console.log('[SimpleItemDetails] No podcasts found, will use Wikipedia fallback');
            setData(null);
          }
        } else if (category === 'TV Shows') {
          const response = await fetch(`/api/search/tvshows?query=${encodeURIComponent(itemName)}&limit=1`, {
            signal: AbortSignal.timeout(10000) // 10 second timeout
          });
          if (!response.ok) {
            throw new Error(`TV Shows API failed: ${response.status}`);
          }
          const results = await response.json();
          console.log('[SimpleItemDetails] TV Shows API results:', results);

          if (results && results.results && results.results.length > 0) {
            console.log('[SimpleItemDetails] Setting TV show data:', results.results[0]);
            setData(results.results[0]);
          } else {
            console.log('[SimpleItemDetails] No TV shows found, will use Wikipedia fallback');
            setData(null);
          }
        } else if (category === 'Music') {
          console.log('[SimpleItemDetails] Fetching music data via subject-info API...');
          try {
            const response = await fetch('/api/subject-info', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subject: itemName, category }),
              signal: AbortSignal.timeout(10000) // 10 second timeout
            });

            if (!response.ok) {
              console.error('[SimpleItemDetails] Subject-info API error:', response.status);
              throw new Error(`Subject-info API failed: ${response.status}`);
            }

            const result = await response.json();
            console.log('[SimpleItemDetails] Subject-info API results:', result);

            if (result && (result.image || result.description)) {
              console.log('[SimpleItemDetails] Setting subject-info data:', result);
              setData({
                type: 'music',
                name: itemName,
                description: result.description,
                image: result.image,
                sourceName: result.sourceName,
                sourceUrl: result.sourceUrl
              });
            } else {
              console.log('[SimpleItemDetails] No subject-info found, will check fallbacks');
              // Try fallback data if available
              if (fallbackData) {
                console.log('[SimpleItemDetails] Using fallback data after no API results:', fallbackData);
                setData(fallbackData);
              } else {
                setData(null);
              }
            }
          } catch (fetchError) {
            console.error('[SimpleItemDetails] Subject-info fetch error:', fetchError);
            // Try fallback data if available
            if (fallbackData) {
              console.log('[SimpleItemDetails] Using fallback data after API failure:', fallbackData);
              setData(fallbackData);
            } else {
              setData(null);
            }
          }
        } else {
          // If no specific category handler, set data to null to trigger Wikipedia fallback
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
            <div className="flex gap-4">
              {/* Book cover on the left */}
              {(() => {
                const thumbnail = data.volumeInfo.imageLinks?.thumbnail;
                if (!thumbnail) return null;
                return (
                <div className="flex-shrink-0">
                  <img
                    src={thumbnail}
                    alt={data.volumeInfo.title}
                    className="w-24 h-36 object-cover rounded shadow-md"
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
                </div>
                );
              })()}
              <div className="book-placeholder w-24 h-36 bg-gradient-to-br from-slate-400 to-slate-600 rounded shadow-md flex items-center justify-center text-white font-bold text-lg" style={{ display: data.volumeInfo.imageLinks?.thumbnail ? 'none' : 'flex' }}>
                {data.volumeInfo.title.substring(0, 2).toUpperCase()}
              </div>

              {/* Details on the right */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {data.volumeInfo.title}
                </h4>

                <div className="space-y-1 mb-3">
                  {data.volumeInfo.authors && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      By: {data.volumeInfo.authors.join(', ')}
                    </p>
                  )}
                  {data.volumeInfo.publishedDate && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Published: {data.volumeInfo.publishedDate}
                    </p>
                  )}
                  {data.volumeInfo.pageCount && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pages: {data.volumeInfo.pageCount}
                    </p>
                  )}
                  {data.volumeInfo.categories && data.volumeInfo.categories.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Genre: {data.volumeInfo.categories[0]}
                    </p>
                  )}
                </div>

                {data.volumeInfo.description && (
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">
                      {data.volumeInfo.description.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : category === 'Movies' && data ? (
            <div className="flex gap-4">
              {/* Poster on the left */}
              {data.poster_path && (
                <div className="flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt={data.title || itemName}
                    className="w-24 h-36 object-cover rounded shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('Image failed to load:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Details on the right */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {data.title || data.original_title || itemName}
                </h4>

                <div className="space-y-1 mb-3">
                  {data.release_date && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Released: {new Date(data.release_date).getFullYear()}
                    </p>
                  )}
                  {data.vote_average && data.vote_average > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Rating: {data.vote_average.toFixed(1)}/10 ({data.vote_count || 0} votes)
                    </p>
                  )}
                </div>

                {data.overview && (
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">
                      {data.overview}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : category === 'Music' && data ? (
            <div className="flex gap-4">
              {/* Artist artwork on the left */}
              <div className="flex-shrink-0 relative">
                {(() => {
                  const imageUrl = data.image;
                  console.log('[SimpleItemDetails] Rendering music artwork. Data:', JSON.stringify(data, null, 2));
                  console.log('[SimpleItemDetails] Image URL:', imageUrl);

                  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '') {
                    return (
                      <>
                        <img
                          src={imageUrl}
                          alt={data.name || itemName}
                          className="w-24 h-24 object-cover rounded shadow-md bg-gray-200"
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
                        <div className="music-placeholder w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded shadow-md flex items-center justify-center text-white font-bold text-lg absolute top-0 left-0" style={{display: 'none'}}>
                          {(data.name || itemName).substring(0, 2).toUpperCase()}
                        </div>
                      </>
                    );
                  } else {
                    console.log('[SimpleItemDetails] No valid image URL, showing placeholder');
                    return (
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded shadow-md flex items-center justify-center text-white font-bold text-lg">
                        {(data.name || itemName).substring(0, 2).toUpperCase()}
                      </div>
                    );
                  }
                })()}
              </div>

              {/* Details on the right */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {data.name}
                </h4>

                <div className="space-y-1 mb-3">
                  {data.type && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Type: {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                    </p>
                  )}
                  {(() => {
                    if (!data.genres) return null;
                    if (Array.isArray(data.genres) && data.genres.length > 0) {
                      return (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Genres: {data.genres.slice(0, 3).join(', ')}
                        </p>
                      );
                    }
                    if (typeof data.genres === 'string' && data.genres.trim().length > 0) {
                      return (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Genres: {data.genres}
                        </p>
                      );
                    }
                    return null;
                  })()}
                  {data.popularity && data.popularity > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Popularity: {data.popularity}/100
                    </p>
                  )}
                  {data.followers && data.followers.total > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Followers: {data.followers.total.toLocaleString()}
                    </p>
                  )}
                </div>

                {data.description ? (
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">
                      {String(data.description).replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                ) : data.bio && data.bio.summary ? (
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">
                      {data.bio.summary.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          ) : category === 'Games' && data ? (
            <>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {data.name}
              </h4>
              {data.released && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Released: {data.released}
                </p>
              )}
              {data.rating && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rating: {data.rating}/5
                </p>
              )}
              {data.platforms && data.platforms.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Platforms: {data.platforms.map((p: any) => p.platform.name).join(', ')}
                </p>
              )}
              {data.description_raw && (
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <p className="line-clamp-4">
                    {data.description_raw}
                  </p>
                </div>
              )}
              {data.background_image && (
                <img
                  src={data.background_image}
                  alt={data.name}
                  className="w-64 h-36 object-cover rounded"
                />
              )}
            </>
          ) : category === 'Podcasts' && data ? (
            <div className="flex gap-4">
              {/* Podcast artwork on the left */}
              {data.artwork && (
                <div className="flex-shrink-0">
                  <img
                    src={data.artwork}
                    alt={data.name}
                    className="w-24 h-24 object-cover rounded shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('Podcast artwork failed to load:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Details on the right */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {data.name}
                </h4>

                <div className="space-y-1 mb-3">
                  {data.artist && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      By: {data.artist}
                    </p>
                  )}
                  {data.genre && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Genre: {data.genre}
                    </p>
                  )}
                  {data.trackCount && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Episodes: {data.trackCount}
                    </p>
                  )}
                </div>

                {data.description && (
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : category === 'TV Shows' && data ? (
            <div className="flex gap-4">
              {/* TV Show poster on the left */}
              {data.poster_path && (
                <div className="flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt={data.name || itemName}
                    className="w-24 h-36 object-cover rounded shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log('TV Show poster failed to load:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Details on the right */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {data.name || data.original_name || itemName}
                </h4>

                <div className="space-y-1 mb-3">
                  {data.first_air_date && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      First Aired: {new Date(data.first_air_date).getFullYear()}
                    </p>
                  )}
                  {data.vote_average && data.vote_average > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Rating: {data.vote_average.toFixed(1)}/10 ({data.vote_count || 0} votes)
                    </p>
                  )}
                  {data.origin_country && data.origin_country.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Country: {data.origin_country.join(', ')}
                    </p>
                  )}
                </div>

                {data.overview && (
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <p className="leading-relaxed">
                      {data.overview}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{data.title || data.name || itemName}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{data.description || `Details for ${itemName} would appear here.`}</p>
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
    <div className="flex gap-4">
      {/* Wikipedia thumbnail on the left */}
      <div className="flex-shrink-0">
        {wikiData.thumbnail ? (
          <img
            src={wikiData.thumbnail}
            alt={wikiData.title}
            className="w-24 h-24 object-cover rounded shadow-md"
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
        <div className="wiki-placeholder w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded shadow-md flex items-center justify-center text-white font-bold text-lg" style={{display: wikiData.thumbnail ? 'none' : 'flex'}}>
          {itemName.substring(0, 2).toUpperCase()}
        </div>
      </div>

      {/* Details on the right */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          {wikiData.title}
        </h4>

        <div className="space-y-1 mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Source: Wikipedia
          </p>
          {category && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Category: {category}
            </p>
          )}
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-300">
          <p className="leading-relaxed">
            {wikiData.description}
          </p>
        </div>

        {wikiData.url && (
          <div className="mt-3">
            <a
              href={wikiData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              Read more on Wikipedia →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
