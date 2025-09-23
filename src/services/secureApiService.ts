// Secure API service that calls server-side routes instead of exposing API keys

export interface MovieSearchResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface BookSearchResult {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    averageRating?: number;
    pageCount?: number;
  };
}

export interface GameSearchResult {
  id: number;
  name: string;
  description_raw: string;
  background_image: string | null;
  released: string;
  rating: number;
  platforms: Array<{
    platform: {
      name: string;
    };
  }>;
}

export interface MusicSearchResult {
  id: string;
  name: string;
  type: 'artist' | 'album' | 'track';
  images?: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  artists?: Array<{
    name: string;
  }>;
  album?: {
    name: string;
    release_date?: string;
  };
  popularity?: number;
  external_urls?: {
    spotify?: string;
    lastfm?: string;
  };
  description?: string;
  artwork?: string | null;
  fans?: number;
  link?: string;
  genres?: string[];
  followers?: {
    total: number;
  };
}

export interface PodcastSearchResult {
  id: number;
  name: string;
  description: string;
  artist: string;
  artwork: string | null;
  genre: string;
  trackCount: number;
  releaseDate: string;
  country: string;
  feedUrl: string | null;
  websiteUrl: string | null;
}

class SecureAPIService {
  async searchMovies(query: string, limit: number = 20): Promise<MovieSearchResult[]> {
    try {
      const response = await fetch(`/api/search/movies?query=${encodeURIComponent(query)}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async searchBooks(query: string, limit: number = 20): Promise<BookSearchResult[]> {
    try {
      const response = await fetch(`/api/search/books?query=${encodeURIComponent(query)}&limit=${limit}`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`[SecureApiService] Books search failed for "${query}":`, error);
      return [];
    }
  }

  async searchGames(query: string, limit: number = 20): Promise<GameSearchResult[]> {
    try {
      const response = await fetch(`/api/search/games?query=${encodeURIComponent(query)}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async searchMusic(query: string, limit: number = 20): Promise<MusicSearchResult[]> {
    try {
      const response = await fetch(`/api/search/music?query=${encodeURIComponent(query)}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async searchPodcasts(query: string, limit: number = 20): Promise<PodcastSearchResult[]> {
    try {
      const response = await fetch(`/api/search/podcasts?query=${encodeURIComponent(query)}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return [];
    }
  }

  // Search across all APIs based on category
  async searchByCategory(query: string, category: string, limit: number = 20): Promise<any[]> {
    const normalizedCategory = category.toLowerCase().trim();
    
    switch (normalizedCategory) {
      case 'movies & tv':
      case 'movies':
      case 'tv shows':
        return await this.searchMovies(query, limit);
      
      case 'books':
        return await this.searchBooks(query, limit);
      
      case 'games':
        return await this.searchGames(query, limit);
      
      case 'music':
        return await this.searchMusic(query, limit);
      
      case 'podcasts':
        return await this.searchPodcasts(query, limit);
      
      default:
        return [];
    }
  }

  // Format results for consistent display
  formatSearchResults(results: any[], category: string): any[] {
    const normalizedCategory = category.toLowerCase().trim();
    
    switch (normalizedCategory) {
      case 'movies & tv':
      case 'movies':
      case 'tv shows':
        return results.map((movie: MovieSearchResult) => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
          rating: movie.vote_average,
          type: 'movie'
        }));
      
      case 'books':
        return results.map((book: BookSearchResult) => ({
          id: book.id,
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail || book.volumeInfo.imageLinks?.smallThumbnail,
          year: book.volumeInfo.publishedDate ? new Date(book.volumeInfo.publishedDate).getFullYear() : null,
          rating: book.volumeInfo.averageRating,
          authors: book.volumeInfo.authors,
          type: 'book'
        }));
      
      case 'games':
        return results.map((game: GameSearchResult) => ({
          id: game.id,
          title: game.name,
          description: game.description_raw,
          image: game.background_image,
          year: game.released ? new Date(game.released).getFullYear() : null,
          rating: game.rating,
          platforms: game.platforms?.map(p => p.platform.name),
          type: 'game'
        }));
      
      case 'music':
        return results.map((music: MusicSearchResult & { bio?: string | { summary?: string; full?: string }; fans?: number; artwork?: string | null; link?: string; genres?: string[]; artist?: string }) => {
          const fallbackDescription = music.type === 'artist'
            ? 'Artist'
            : music.type === 'album'
              ? `Album${music.artists ? ` by ${music.artists.map(a => a.name).join(', ')}` : ''}`
              : `Track${music.artists ? ` by ${music.artists.map(a => a.name).join(', ')}` : ''}`;

          const rawDescription = typeof music.bio === 'string'
            ? music.bio
            : (typeof music.description === 'string' ? music.description : undefined);

          const description = rawDescription || (typeof music.bio === 'object' ? music.bio?.summary : undefined) || fallbackDescription;
          const image = music.artwork || music.images?.[0]?.url || null;
          const rating = music.popularity ?? music.fans ?? null;
          const artists = music.artists?.map(a => a.name) || (music.artist ? [music.artist] : undefined);
          const followerTotal = music.followers?.total ?? music.fans ?? null;
          const bio = typeof music.bio === 'object'
            ? music.bio
            : (typeof description === 'string' ? { summary: description } : undefined);

          return {
            id: music.id,
            title: music.name,
            description,
            image,
            images: image ? [{ url: image, height: 250, width: 250 }] : music.images,
            year: music.album?.release_date ? new Date(music.album.release_date).getFullYear() : null,
            rating,
            artists,
            fans: music.fans,
            followers: followerTotal !== null ? { total: followerTotal } : undefined,
            link: music.link,
            genres: music.genres,
            musicType: music.type,
            bio,
            type: 'music'
          };
        });
      
      case 'podcasts':
        return results.map((podcast: PodcastSearchResult) => ({
          id: podcast.id,
          title: podcast.name,
          description: podcast.description,
          image: podcast.artwork,
          year: podcast.releaseDate ? new Date(podcast.releaseDate).getFullYear() : null,
          rating: null,
          artist: podcast.artist,
          genre: podcast.genre,
          episodeCount: podcast.trackCount,
          type: 'podcast'
        }));
      
      default:
        return results;
    }
  }
}

export const secureApiService = new SecureAPIService();
