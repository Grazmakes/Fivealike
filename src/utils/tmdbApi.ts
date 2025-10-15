const PUBLIC_TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
const TMDB_API_KEY = PUBLIC_TMDB_API_KEY && PUBLIC_TMDB_API_KEY !== 'your_tmdb_api_key'
  ? PUBLIC_TMDB_API_KEY
  : '';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_DISABLED = !TMDB_API_KEY;
const DEFAULT_TIMEOUT = 2000;

const fetchWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

export interface TMDBSearchResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: 'movie' | 'tv';
}

export interface TMDBMovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  director?: string;
}

export interface TMDBTVDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  created_by: { name: string }[];
}

// Search for movies and TV shows
export async function searchTMDB(query: string): Promise<TMDBSearchResult[]> {
  if (TMDB_DISABLED) {
    return [];
  }
  try {
    const response = await fetchWithTimeout(
      `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
    );
    
    if (!response || !response.ok) {
      throw new Error('Failed to search TMDB');
    }
    
    const data = await response.json();
    return data.results?.slice(0, 5) || [];
  } catch (error) {
    return [];
  }
}

// Get detailed movie information
export async function getMovieDetails(movieId: number): Promise<TMDBMovieDetails | null> {
  if (TMDB_DISABLED) {
    return null;
  }
  try {
    const [movieResponse, creditsResponse] = await Promise.all([
      fetchWithTimeout(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`),
      fetchWithTimeout(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`)
    ]);
    
    if (!movieResponse || !movieResponse.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const movie = await movieResponse.json();
    const credits = creditsResponse && creditsResponse.ok ? await creditsResponse.json() : null;
    
    // Find director
    const director = credits?.crew?.find((person: any) => person.job === 'Director')?.name;
    
    return {
      ...movie,
      director
    };
  } catch (error) {
    return null;
  }
}

// Get detailed TV show information
export async function getTVDetails(tvId: number): Promise<TMDBTVDetails | null> {
  if (TMDB_DISABLED) {
    return null;
  }
  try {
    const response = await fetchWithTimeout(`${TMDB_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}`);
    
    if (!response || !response.ok) {
      throw new Error('Failed to fetch TV details');
    }
    
    const tvShow = await response.json();
    return tvShow;
  } catch (error) {
    return null;
  }
}

// Get image URL
export function getTMDBImageUrl(path: string | null): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${path}`;
}

// Smart search that tries to match the best result
const fetchViaSubjectInfo = async (itemName: string, category?: string) => {
  if (!category) return null;

  try {
    const response = await fetch('/api/subject-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: itemName, category }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data) {
      return null;
    }

    return {
      type: category.toLowerCase().includes('tv') ? 'tv' : 'movie',
      name: itemName,
      description: data.description || '',
      year: data.release_date?.substring(0, 4) || data.first_air_date?.substring(0, 4),
      rating: data.vote_average,
      poster: data.poster_path ? getTMDBImageUrl(data.poster_path) : data.image,
      poster_path: data.poster_path,
      image: data.image,
      sourceName: data.sourceName,
      sourceUrl: data.sourceUrl,
    };
  } catch (error) {
    return null;
  }
};

export async function getItemDetailsByName(itemName: string, category?: string): Promise<any> {
  try {
    if (TMDB_DISABLED) {
      return fetchViaSubjectInfo(itemName, category);
    }

    const searchResults = await searchTMDB(itemName);
    
    if (searchResults.length === 0) {
      return fetchViaSubjectInfo(itemName, category);
    }
    
    // Find the best match (exact title match or first result)
    const bestMatch = searchResults.find(result => {
      const title = result.title || result.name || '';
      return title.toLowerCase() === itemName.toLowerCase();
    }) || searchResults[0];
    
    if (!bestMatch) return null;
    
    // Get detailed information based on media type
    if (bestMatch.media_type === 'movie' || (bestMatch.title && !bestMatch.name)) {
      const details = await getMovieDetails(bestMatch.id);
      if (details) {
        return {
          type: 'movie',
          name: details.title,
          description: details.overview,
          year: details.release_date?.substring(0, 4),
          rating: details.vote_average,
          genres: details.genres?.map(g => g.name).join(', '),
          runtime: details.runtime,
          director: details.director,
          poster: getTMDBImageUrl(details.poster_path),
          poster_path: details.poster_path
        };
      }
    } else if (bestMatch.media_type === 'tv' || (bestMatch.name && !bestMatch.title)) {
      const details = await getTVDetails(bestMatch.id);
      if (details) {
        return {
          type: 'tv',
          name: details.name,
          description: details.overview,
          year: details.first_air_date?.substring(0, 4),
          rating: details.vote_average,
          genres: details.genres?.map(g => g.name).join(', '),
          seasons: details.number_of_seasons,
          creators: details.created_by?.map(c => c.name).join(', '),
          poster: getTMDBImageUrl(details.poster_path),
          poster_path: details.poster_path
        };
      }
    }
    
    // Fallback to search result data
    const fallback = {
      type: bestMatch.media_type || 'movie',
      name: bestMatch.title || bestMatch.name || itemName,
      description: bestMatch.overview,
      year: (bestMatch.release_date || bestMatch.first_air_date)?.substring(0, 4),
      rating: bestMatch.vote_average,
      poster: getTMDBImageUrl(bestMatch.poster_path),
      poster_path: bestMatch.poster_path
    };

    if (!fallback.poster) {
      const subjectInfo = await fetchViaSubjectInfo(itemName, category);
      if (subjectInfo?.poster || subjectInfo?.image) {
        return { ...fallback, poster: subjectInfo.poster || subjectInfo.image };
      }
    }

    return fallback;
  } catch (error) {
    const subjectInfo = await fetchViaSubjectInfo(itemName, category);
    if (subjectInfo) {
      return subjectInfo;
    }
    return null;
  }
}
