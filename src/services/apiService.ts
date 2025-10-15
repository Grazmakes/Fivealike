// External API service for integrating with TMDB, Google Books, and RAWG APIs

export interface MovieSearchResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface OMDBSearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  imdbRating?: string;
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
  };
}

class APIService {
  private readonly TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || process.env.TMDB_API_KEY || '';
  private readonly TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  private readonly OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY || '';
  private readonly OMDB_BASE_URL = 'https://www.omdbapi.com';
  private readonly GOOGLE_BOOKS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || '';
  private readonly GOOGLE_BOOKS_BASE_URL = 'https://www.googleapis.com/books/v1';
  private readonly RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY || '';
  private readonly RAWG_BASE_URL = 'https://api.rawg.io/api';
  private readonly SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
  private readonly SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET || '';
  private readonly LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY || '';
  private readonly LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0';
  
  private spotifyAccessToken: string | null = null;

  async searchMovies(query: string, limit: number = 20): Promise<MovieSearchResult[]> {
    try {
      // Try TMDB first if available
      if (this.TMDB_API_KEY && this.TMDB_API_KEY !== 'your_tmdb_api_key_here') {
        const response = await fetch(
          `${this.TMDB_BASE_URL}/search/movie?api_key=${this.TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=1`
        );
        
        if (response.ok) {
          const data = await response.json();
          return data.results?.slice(0, limit) || [];
        }
      }

      // Fallback to OMDB
      return await this.searchOMDB(query, limit);
    } catch (error) {
      // Try OMDB as final fallback
      return await this.searchOMDB(query, limit);
    }
  }

  private async searchOMDB(query: string, limit: number = 20): Promise<MovieSearchResult[]> {
    try {
      if (!this.OMDB_API_KEY) {
        // Return sample movie suggestions based on query
        return this.getSampleMovieResults(query, limit);
      }

      const response = await fetch(
        `${this.OMDB_BASE_URL}/?apikey=${this.OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
      );

      if (!response.ok) {
        throw new Error(`OMDB API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.Response === "False") {
        // Fallback to sample results if no API results
        return this.getSampleMovieResults(query, limit);
      }

      const movies = data.Search || [];
      
      // Convert OMDB format to MovieSearchResult format
      return movies.slice(0, limit).map((movie: OMDBSearchResult) => ({
        id: parseInt(movie.imdbID.replace('tt', '')) || 0,
        title: movie.Title,
        overview: movie.Plot || '',
        poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
        release_date: movie.Year,
        vote_average: movie.imdbRating ? parseFloat(movie.imdbRating) : 0
      }));
    } catch (error) {
      return this.getSampleMovieResults(query, limit);
    }
  }

  private getSampleMovieResults(query: string, limit: number): MovieSearchResult[] {
    // Sample movie suggestions for common queries
    const sampleMovies: MovieSearchResult[] = [
      {
        id: 1,
        title: `${query} (Movie)`,
        overview: `A movie related to ${query}`,
        poster_path: null,
        release_date: '2023',
        vote_average: 7.5
      },
      {
        id: 2,
        title: `The ${query} Chronicles`,
        overview: `An epic adventure featuring ${query}`,
        poster_path: null,
        release_date: '2022',
        vote_average: 8.2
      },
      {
        id: 3,
        title: `${query}: The Movie`,
        overview: `The definitive ${query} experience`,
        poster_path: null,
        release_date: '2024',
        vote_average: 7.8
      },
      {
        id: 4,
        title: `Return to ${query}`,
        overview: `A sequel to the classic ${query} story`,
        poster_path: null,
        release_date: '2021',
        vote_average: 7.0
      },
      {
        id: 5,
        title: `${query} Forever`,
        overview: `The ultimate ${query} adventure`,
        poster_path: null,
        release_date: '2023',
        vote_average: 8.5
      }
    ];

    return sampleMovies.slice(0, limit);
  }

  async getMovieDetails(movieId: number): Promise<MovieSearchResult | null> {
    try {
      if (!this.TMDB_API_KEY) {
        return null;
      }

      const response = await fetch(
        `${this.TMDB_BASE_URL}/movie/${movieId}?api_key=${this.TMDB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return null;
    }
  }

  async searchBooks(query: string, limit: number = 20): Promise<BookSearchResult[]> {
    try {
      if (!this.GOOGLE_BOOKS_API_KEY) {
        return [];
      }

      const response = await fetch(
        `${this.GOOGLE_BOOKS_BASE_URL}/volumes?q=${encodeURIComponent(query)}&key=${this.GOOGLE_BOOKS_API_KEY}&maxResults=${limit}`
      );
      
      if (!response.ok) {
        throw new Error(`Google Books API error: ${response.status}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      return [];
    }
  }

  async searchGames(query: string, limit: number = 20): Promise<GameSearchResult[]> {
    try {
      if (!this.RAWG_API_KEY || this.RAWG_API_KEY === 'get_free_key_from_rawg.io') {
        return this.getFallbackGameData(query, limit);
      }

      const response = await fetch(
        `${this.RAWG_BASE_URL}/games?key=${this.RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=${limit}`,
        {
          headers: {
            'User-Agent': 'Five Alike App/1.0'
          }
        }
      );
      
      if (!response.ok) {
        return this.getFallbackGameData(query, limit);
      }

      const data = await response.json();
      return data.results || this.getFallbackGameData(query, limit);
    } catch (error) {
      return this.getFallbackGameData(query, limit);
    }
  }

  // Fallback game data when RAWG API is unavailable
  private getFallbackGameData(query: string, limit: number): GameSearchResult[] {
    const fallbackGames = [
      {
        id: 1,
        name: 'Minecraft',
        description_raw: 'A sandbox video game developed by Mojang Studios. Players explore a blocky, procedurally-generated 3D world and can build structures, craft items, and survive against various threats.',
        background_image: null,
        released: '2011-11-18',
        rating: 4.4,
        platforms: [
          { platform: { name: 'PC' } },
          { platform: { name: 'PlayStation 4' } },
          { platform: { name: 'Xbox One' } },
          { platform: { name: 'Nintendo Switch' } }
        ]
      },
      {
        id: 2,
        name: 'The Witcher 3: Wild Hunt',
        description_raw: 'An action role-playing game developed by CD Projekt Red. Players control Geralt of Rivia, a monster hunter known as a witcher, in a vast open world.',
        background_image: null,
        released: '2015-05-19',
        rating: 4.7,
        platforms: [
          { platform: { name: 'PC' } },
          { platform: { name: 'PlayStation 4' } },
          { platform: { name: 'Xbox One' } },
          { platform: { name: 'Nintendo Switch' } }
        ]
      },
      {
        id: 3,
        name: 'Grand Theft Auto V',
        description_raw: 'An action-adventure game developed by Rockstar North. The game follows three protagonists in the fictional city of Los Santos.',
        background_image: null,
        released: '2013-09-17',
        rating: 4.5,
        platforms: [
          { platform: { name: 'PC' } },
          { platform: { name: 'PlayStation 4' } },
          { platform: { name: 'Xbox One' } }
        ]
      },
      {
        id: 4,
        name: 'Among Us',
        description_raw: 'An online multiplayer social deduction game developed by InnerSloth. Players work together to complete tasks while trying to identify impostors.',
        background_image: null,
        released: '2018-06-15',
        rating: 4.0,
        platforms: [
          { platform: { name: 'PC' } },
          { platform: { name: 'Mobile' } },
          { platform: { name: 'Nintendo Switch' } }
        ]
      },
      {
        id: 5,
        name: 'Fortnite',
        description_raw: 'A battle royale game developed by Epic Games. Players fight to be the last person standing in a shrinking battlefield.',
        background_image: null,
        released: '2017-07-25',
        rating: 4.1,
        platforms: [
          { platform: { name: 'PC' } },
          { platform: { name: 'PlayStation 4' } },
          { platform: { name: 'Xbox One' } },
          { platform: { name: 'Nintendo Switch' } },
          { platform: { name: 'Mobile' } }
        ]
      }
    ];

    // Filter games based on query
    const filteredGames = query ? 
      fallbackGames.filter(game => 
        game.name.toLowerCase().includes(query.toLowerCase())
      ) : fallbackGames;

    return filteredGames.slice(0, limit);
  }

  async getGameDetails(gameId: number): Promise<GameSearchResult | null> {
    try {
      if (!this.RAWG_API_KEY) {
        return null;
      }

      const response = await fetch(
        `${this.RAWG_BASE_URL}/games/${gameId}?key=${this.RAWG_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`RAWG API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return null;
    }
  }

  // Get Spotify access token using Client Credentials flow
  private async getSpotifyAccessToken(): Promise<string | null> {
    try {
      if (!this.SPOTIFY_CLIENT_ID || !this.SPOTIFY_CLIENT_SECRET) {
        return null;
      }

      if (this.spotifyAccessToken) {
        return this.spotifyAccessToken;
      }

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${this.SPOTIFY_CLIENT_ID}:${this.SPOTIFY_CLIENT_SECRET}`)}`
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error(`Spotify token error: ${response.status}`);
      }

      const data = await response.json();
      this.spotifyAccessToken = data.access_token;
      
      // Token expires in 1 hour, clear it after 50 minutes
      setTimeout(() => {
        this.spotifyAccessToken = null;
      }, 50 * 60 * 1000);

      return this.spotifyAccessToken;
    } catch (error) {
      return null;
    }
  }

  async searchMusic(query: string, limit: number = 20): Promise<MusicSearchResult[]> {
    try {
      // Try Spotify first (better for artists and albums)
      const spotifyResults = await this.searchSpotify(query, limit);
      
      if (spotifyResults.length > 0) {
        return spotifyResults;
      }

      // Fallback to Last.fm (doesn't require OAuth)
      const lastfmResults = await this.searchLastfm(query, limit);
      return lastfmResults;
    } catch (error) {
      return [];
    }
  }

  private async searchSpotify(query: string, limit: number = 20): Promise<MusicSearchResult[]> {
    try {
      const accessToken = await this.getSpotifyAccessToken();
      if (!accessToken) {
        return [];
      }

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist,album,track&limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Spotify search error: ${response.status}`);
      }

      const data = await response.json();
      const results: MusicSearchResult[] = [];

      // Add artists (prioritized)
      if (data.artists?.items) {
        results.push(...data.artists.items.slice(0, Math.floor(limit / 2)));
      }

      // Add albums
      if (data.albums?.items && results.length < limit) {
        results.push(...data.albums.items.slice(0, limit - results.length));
      }

      // Add tracks if we still have room
      if (data.tracks?.items && results.length < limit) {
        results.push(...data.tracks.items.slice(0, limit - results.length));
      }

      return results;
    } catch (error) {
      return [];
    }
  }

  private async searchLastfm(query: string, limit: number = 20): Promise<MusicSearchResult[]> {
    try {
      if (!this.LASTFM_API_KEY) {
        return [];
      }

      const response = await fetch(
        `${this.LASTFM_BASE_URL}/?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${this.LASTFM_API_KEY}&format=json&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Last.fm API error: ${response.status}`);
      }

      const data = await response.json();
      const artists = data.results?.artistmatches?.artist || [];
      
      return Array.isArray(artists) ? artists.map((artist: any) => ({
        id: artist.mbid || artist.name,
        name: artist.name,
        type: 'artist' as const,
        images: artist.image?.map((img: any) => ({
          url: img['#text'],
          height: img.size === 'large' ? 300 : 150,
          width: img.size === 'large' ? 300 : 150
        })) || [],
        external_urls: {
          spotify: artist.url
        }
      })) : [];
    } catch (error) {
      return [];
    }
  }

  // Get artist biography from multiple sources
  async getArtistInfo(artistName: string): Promise<{ bio?: string; summary?: string } | null> {
    try {
      // First try MusicBrainz (free, no API key needed)
      const mbResult = await this.getMusicBrainzArtistInfo(artistName);
      if (mbResult) {
        return mbResult;
      }

      // Fallback to Last.fm if API key is available
      if (this.LASTFM_API_KEY && this.LASTFM_API_KEY !== 'your_lastfm_api_key_here') {
        const response = await fetch(
          `${this.LASTFM_BASE_URL}/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${this.LASTFM_API_KEY}&format=json`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.artist?.bio) {
            return {
              bio: data.artist.bio.content,
              summary: data.artist.bio.summary
            };
          }
        }
      }

      // Final fallback to curated content
      return this.getFallbackArtistInfo(artistName);
    } catch (error) {
      return this.getFallbackArtistInfo(artistName);
    }
  }

  // Get artist info from MusicBrainz (free API)
  private async getMusicBrainzArtistInfo(artistName: string): Promise<{ bio?: string; summary?: string } | null> {
    try {
      // Search for artist
      const searchResponse = await fetch(
        `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(artistName)}&fmt=json&limit=1`
      );

      if (!searchResponse.ok) return null;

      const searchData = await searchResponse.json();
      const artist = searchData.artists?.[0];
      
      if (!artist) return null;

      // Create bio from available data
      let bio = '';
      if (artist.disambiguation) {
        bio += artist.disambiguation + '. ';
      }
      if (artist['life-span']?.begin) {
        bio += `Active since ${artist['life-span'].begin}. `;
      }
      if (artist.country) {
        bio += `From ${artist.country}. `;
      }
      if (artist.tags && artist.tags.length > 0) {
        const genres = artist.tags.slice(0, 3).map((tag: any) => tag.name).join(', ');
        bio += `Known for ${genres} music. `;
      }

      return bio ? { summary: bio.trim(), bio: bio.trim() } : null;
    } catch (error) {
      return null;
    }
  }

  // Fallback artist information when API is unavailable
  private getFallbackArtistInfo(artistName: string): { bio?: string; summary?: string } {
    const fallbackBios: { [key: string]: string } = {
      'the kinks': 'The Kinks were an English rock band formed in London in 1963. Led by brothers Ray and Dave Davies, they were influential in the development of hard rock and heavy metal music. Known for hits like "You Really Got Me," "Waterloo Sunset," and "Lola," The Kinks were inducted into the Rock and Roll Hall of Fame in 1990.',
      'kinks': 'The Kinks were an English rock band formed in London in 1963. Led by brothers Ray and Dave Davies, they were influential in the development of hard rock and heavy metal music. Known for hits like "You Really Got Me," "Waterloo Sunset," and "Lola," The Kinks were inducted into the Rock and Roll Hall of Fame in 1990.',
      'the beatles': 'The Beatles were an English rock band formed in Liverpool in 1960. Comprising John Lennon, Paul McCartney, George Harrison, and Ringo Starr, they are regarded as the most influential band of all time. They were integral to the development of 1960s counterculture and popular music\'s recognition as an art form.',
      'beatles': 'The Beatles were an English rock band formed in Liverpool in 1960. Comprising John Lennon, Paul McCartney, George Harrison, and Ringo Starr, they are regarded as the most influential band of all time. They were integral to the development of 1960s counterculture and popular music\'s recognition as an art form.',
      'led zeppelin': 'Led Zeppelin were an English rock band formed in London in 1968. The group consisted of vocalist Robert Plant, guitarist Jimmy Page, bassist/keyboardist John Paul Jones, and drummer John Bonham. They are widely considered one of the most successful, innovative, and influential rock groups in history.',
      'pink floyd': 'Pink Floyd were an English rock band formed in London in 1965. Known for their progressive and psychedelic music, philosophical lyrics, sonic experimentation, and elaborate live shows, they became one of the most influential and commercially successful groups in popular music history.',
      'queen': 'Queen are a British rock band formed in London in 1970. Their classic line-up was Freddie Mercury (lead vocals, piano), Brian May (guitar, vocals), Roger Taylor (drums, vocals) and John Deacon (bass). Known for hits like "Bohemian Rhapsody" and "We Will Rock You," they are one of the best-selling music artists of all time.',
      'rolling stones': 'The Rolling Stones are an English rock band formed in London in 1962. Active for six decades, they are one of the most popular and enduring bands of the rock era. Known for blues-inspired rock and roll, the band has been led by vocalist Mick Jagger and guitarist Keith Richards.',
      'the rolling stones': 'The Rolling Stones are an English rock band formed in London in 1962. Active for six decades, they are one of the most popular and enduring bands of the rock era. Known for blues-inspired rock and roll, the band has been led by vocalist Mick Jagger and guitarist Keith Richards.'
    };

    const normalizedName = artistName.toLowerCase();
    const bio = fallbackBios[normalizedName];
    
    if (bio) {
      return { summary: bio, bio: bio };
    }

    // Generic fallback for unknown artists
    return {
      summary: `${artistName} is a musical artist. Information about their biography and career would be displayed here when available through music databases and APIs.`,
      bio: `${artistName} is a musical artist. Information about their biography and career would be displayed here when available through music databases and APIs.`
    };
  }

  // Search across all APIs based on category
  async searchByCategory(query: string, category: string, limit: number = 20): Promise<any[]> {
    switch (category.toLowerCase()) {
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
      
      default:
        // For other categories, return empty array or implement generic search
        return [];
    }
  }

  // Format results for consistent display
  formatSearchResults(results: any[], category: string): any[] {
    switch (category.toLowerCase()) {
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
        return results.map((music: MusicSearchResult) => ({
          id: music.id,
          title: music.name,
          description: music.type === 'artist' ? `Artist` : music.type === 'album' ? `Album${music.artists ? ` by ${music.artists.map(a => a.name).join(', ')}` : ''}` : `Track${music.artists ? ` by ${music.artists.map(a => a.name).join(', ')}` : ''}`,
          image: music.images?.[0]?.url || null,
          year: music.album?.release_date ? new Date(music.album.release_date).getFullYear() : null,
          rating: music.popularity,
          artists: music.artists?.map(a => a.name),
          musicType: music.type,
          type: 'music'
        }));
      
      default:
        return results;
    }
  }
}

export const apiService = new APIService();
