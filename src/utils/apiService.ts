// API Integration utilities for Five Alike
// This file contains integrations with various external APIs

// Note: Using direct API calls to avoid circular dependency issues

// ============== API CONFIGURATION ==============

const API_CONFIG = {
  // For production, these would come from environment variables
  SPOTIFY: {
    CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || 'your_spotify_client_id',
    CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || 'your_spotify_client_secret',
    BASE_URL: 'https://api.spotify.com/v1'
  },
  OMDB: {
    API_KEY: process.env.NEXT_PUBLIC_OMDB_API_KEY || 'your_omdb_api_key',
    BASE_URL: 'https://www.omdbapi.com'
  },
  GOOGLE_BOOKS: {
    API_KEY: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || 'your_google_books_api_key',
    BASE_URL: 'https://www.googleapis.com/books/v1'
  },
  STEAM: {
    API_KEY: process.env.NEXT_PUBLIC_STEAM_API_KEY || 'your_steam_api_key',
    BASE_URL: 'https://api.steampowered.com'
  },
  RAWG: {
    API_KEY: process.env.NEXT_PUBLIC_RAWG_API_KEY || 'your_rawg_api_key',
    BASE_URL: 'https://api.rawg.io/api'
  },
  TMDB: {
    API_KEY: process.env.TMDB_API_KEY || 'your_tmdb_api_key',
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500'
  }
};

// ============== TYPE DEFINITIONS ==============

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
    release_date: string;
  };
  preview_url?: string;
  external_urls: { spotify: string };
  popularity: number;
  duration_ms: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: { url: string; height: number; width: number }[];
  followers: { total: number };
  popularity: number;
  external_urls: { spotify: string };
}

export interface MovieData {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Type: string;
}

export interface BookData {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    categories?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    pageCount?: number;
    averageRating?: number;
    ratingsCount?: number;
    language?: string;
    previewLink?: string;
    infoLink?: string;
  };
}

export interface GameData {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  metacritic: number;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  developers: { name: string }[];
  publishers: { name: string }[];
  description_raw: string;
}

// ============== UNIFIED SEARCH INTERFACE ==============

export interface UnifiedSearchResult {
  id: string;
  type: 'music' | 'movie' | 'book' | 'game';
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  rating?: number;
  year?: string;
  genres?: string[];
  external_url?: string;
  raw_data: any;
}

export class UnifiedSearch {
  static async searchAll(query: string): Promise<UnifiedSearchResult[]> {
    try {
      // Import the client API service for direct API calls
      const { ClientApiService } = await import('../services/clientApiService');

      // Try music first
      const musicResults = await ClientApiService.searchMusic(query);
      if (musicResults.length > 0) {
        return musicResults.slice(0, 3).map((item: any) => ({
          id: item.id?.toString() || Math.random().toString(),
          type: 'music' as const,
          title: item.name || item.title,
          subtitle: `Music • ${item.artist || 'Unknown Artist'}`,
          description: item.description || '',
          image: item.artwork || undefined,
          rating: undefined,
          year: undefined,
          genres: [],
          external_url: undefined,
          raw_data: item
        }));
      }

      // If no music results, try movies
      const movieResults = await ClientApiService.searchMovies(query);
      if (movieResults.length > 0) {
        return movieResults.slice(0, 3).map((item: any) => ({
          id: item.id?.toString() || Math.random().toString(),
          type: 'movie' as const,
          title: item.title,
          subtitle: `${item.release_date?.split('-')[0] || 'Unknown'} • Movie`,
          description: item.overview || '',
          image: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : undefined,
          rating: item.vote_average,
          year: item.release_date?.split('-')[0] || undefined,
          genres: [],
          external_url: undefined,
          raw_data: item
        }));
      }

      return [];
    } catch (error) {
      return [];
    }
  }

  static async searchByType(query: string, type: 'music' | 'movie' | 'book' | 'game'): Promise<UnifiedSearchResult[]> {
    try {
      console.log(`[UnifiedSearch] Searching for "${query}" with type "${type}"`);

      // Import the client API service for direct API calls
      const { ClientApiService } = await import('../services/clientApiService');

      let results: any[] = [];

      // Use client-side API calls instead of server routes
      switch (type) {
        case 'movie':
          results = await ClientApiService.searchMovies(query);
          break;
        case 'book':
          results = await ClientApiService.searchBooks(query);
          break;
        case 'game':
          results = await ClientApiService.searchGames(query);
          break;
        case 'music':
          results = await ClientApiService.searchMusic(query);
          break;
      }

      console.log(`[UnifiedSearch] Got ${results.length} results for "${query}"`);
      console.log(`[UnifiedSearch] First result:`, results[0]);

      // If it's a music search and we get no results, create a fallback music result
      if (type === 'music' && results.length === 0) {
        return [{
          id: Math.random().toString(),
          type: 'music' as const,
          title: query,
          subtitle: 'Artist • Music',
          description: `Information about ${query} would be displayed here when music APIs are available.`,
          image: undefined,
          rating: undefined,
          year: undefined,
          genres: [],
          external_url: undefined,
          raw_data: { name: query, type: 'artist' }
        }];
      }

      // Convert API results to UnifiedSearchResult format
      return results.map((item: any) => {
        let title, subtitle, description, image, rating, year, external_url;

        switch (type) {
          case 'music':
            title = item.name || item.title;
            subtitle = `${item.type || 'Music'} • ${item.artists?.[0]?.name || 'Unknown Artist'}`;
            description = item.description || '';
            image = item.images?.[0]?.url;
            rating = item.popularity ? item.popularity / 20 : undefined;
            year = item.album?.release_date?.split('-')[0];
            external_url = item.external_urls?.spotify || item.external_urls?.lastfm;
            break;
          case 'movie':
            title = item.title;
            subtitle = `${item.release_date?.split('-')[0] || 'Unknown'} • Movie`;
            description = item.overview || '';
            image = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : undefined;
            rating = item.vote_average;
            year = item.release_date?.split('-')[0];
            break;
          case 'book':
            title = item.volumeInfo?.title || item.title;
            subtitle = `${item.volumeInfo?.publishedDate?.split('-')[0] || 'Unknown'} • Book`;
            description = item.volumeInfo?.description || '';
            image = item.volumeInfo?.imageLinks?.thumbnail;
            rating = item.volumeInfo?.averageRating;
            year = item.volumeInfo?.publishedDate?.split('-')[0];
            break;
          case 'game':
            title = item.name;
            subtitle = `${item.released?.split('-')[0] || 'Unknown'} • Game`;
            description = item.description_raw || '';
            image = item.background_image;
            rating = item.rating;
            year = item.released?.split('-')[0];
            break;
          default:
            title = item.title || item.name;
            subtitle = 'Unknown';
            description = '';
        }

        return {
          id: item.id?.toString() || Math.random().toString(),
          type: type,
          title: title,
          subtitle: subtitle,
          description: description,
          image: image,
          rating: rating,
          year: year,
          genres: item.genres || [],
          external_url: external_url,
          raw_data: item
        };
      });
    } catch (error) {
      console.error(`[UnifiedSearch] Search failed for query "${query}" with type "${type}":`, error);
      return [];
    }
  }
}

// Export everything
export {
  API_CONFIG
};