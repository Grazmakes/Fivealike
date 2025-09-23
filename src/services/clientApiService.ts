// Client-side API service for static deployment
export class ClientApiService {
  private static async fetchFromTMDB(query: string, type: 'movie' | 'tv') {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=c4e92b2d123456789abcdef&query=${encodeURIComponent(query)}&page=1`);
      if (response.ok) {
        const data = await response.json();
        return data.results || [];
      }
    } catch (error) {
      console.error(`TMDB ${type} API error:`, error);
    }
    return [];
  }

  private static async fetchFromGoogleBooks(query: string) {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=AIzaSyABCDEF123456789&maxResults=20`);
      if (response.ok) {
        const data = await response.json();
        return (data.items || []).map((book: any) => ({
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || [],
          description: book.volumeInfo.description,
          thumbnail: book.volumeInfo.imageLinks?.thumbnail,
          publishedDate: book.volumeInfo.publishedDate,
          pageCount: book.volumeInfo.pageCount,
          categories: book.volumeInfo.categories,
          language: book.volumeInfo.language,
          infoLink: book.volumeInfo.infoLink
        }));
      }
    } catch (error) {
      console.error('Google Books API error:', error);
    }
    return [];
  }

  private static async fetchFromRAWG(query: string) {
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=123456789abcdef&search=${encodeURIComponent(query)}&page_size=20`);
      if (response.ok) {
        const data = await response.json();
        return (data.results || []).map((game: any) => ({
          id: game.id,
          name: game.name,
          description: game.description_raw,
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
          platforms: game.platforms?.map((p: any) => p.platform.name),
          genres: game.genres?.map((g: any) => g.name)
        }));
      }
    } catch (error) {
      console.error('RAWG API error:', error);
    }
    return [];
  }

  private static getMockData(type: string, query: string) {
    const mockData: { [key: string]: any[] } = {
      movies: [
        { id: 1, title: "The Matrix", overview: "A hacker discovers reality is a simulation.", poster_path: "/placeholder.jpg", release_date: "1999-03-31" },
        { id: 2, title: "Inception", overview: "Dream thieves perform extraction jobs.", poster_path: "/placeholder.jpg", release_date: "2010-07-16" }
      ],
      books: [
        { id: 1, title: "The Great Gatsby", authors: ["F. Scott Fitzgerald"], description: "A classic American novel.", thumbnail: "/placeholder.jpg" },
        { id: 2, title: "1984", authors: ["George Orwell"], description: "A dystopian social science fiction novel.", thumbnail: "/placeholder.jpg" }
      ],
      music: [
        { id: 1, name: "Bohemian Rhapsody", artist: "Queen", description: "A rock opera song by Queen.", artwork: "/placeholder.jpg" },
        { id: 2, name: "Hotel California", artist: "Eagles", description: "A classic rock song by the Eagles.", artwork: "/placeholder.jpg" }
      ],
      games: [
        { id: 1, name: "The Legend of Zelda", description: "An action-adventure game series.", background_image: "/placeholder.jpg", rating: 4.5 },
        { id: 2, name: "Super Mario Bros", description: "A platform game series by Nintendo.", background_image: "/placeholder.jpg", rating: 4.8 }
      ]
    };

    const data = mockData[type] || [];
    if (!query.trim()) return data;

    return data.filter(item =>
      (item.title || item.name || '').toLowerCase().includes(query.toLowerCase()) ||
      (item.overview || item.description || '').toLowerCase().includes(query.toLowerCase()) ||
      (item.artist || '').toLowerCase().includes(query.toLowerCase())
    );
  }

  static async searchMovies(query: string): Promise<any[]> {
    const liveData = await this.fetchFromTMDB(query, 'movie');
    return liveData.length > 0 ? liveData : this.getMockData('movies', query);
  }

  static async searchBooks(query: string): Promise<any[]> {
    const liveData = await this.fetchFromGoogleBooks(query);
    return liveData.length > 0 ? liveData : this.getMockData('books', query);
  }

  static async searchGames(query: string): Promise<any[]> {
    const liveData = await this.fetchFromRAWG(query);
    return liveData.length > 0 ? liveData : this.getMockData('games', query);
  }

  static async searchMusic(query: string): Promise<any[]> {
    // For music, we'll use mock data since client-side music APIs are more complex
    return this.getMockData('music', query);
  }

  static async searchTVShows(query: string): Promise<any[]> {
    const liveData = await this.fetchFromTMDB(query, 'tv');
    return liveData.length > 0 ? liveData : this.getMockData('movies', query); // Use movies mock for TV
  }

  static async searchPodcasts(query: string): Promise<any[]> {
    // Use mock data for podcasts
    return this.getMockData('music', query); // Use music mock for podcasts
  }
}