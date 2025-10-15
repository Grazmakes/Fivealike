import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

    if (apiKey && apiKey !== 'your_tmdb_api_key_here') {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`, {
          headers: {
            'User-Agent': 'Five Alike App/1.0'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const results = data.results || [];
          return NextResponse.json({ results: results.slice(0, limit) });
        }
      } catch (error) {
        console.error('TMDB API error:', error);
      }
    }

    // Fallback mock data
    const mockMovies = [
      {
        id: 1,
        title: "The Matrix",
        overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        release_date: "1999-03-31",
        poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
        vote_average: 8.7,
        vote_count: 23000,
        genre_ids: [28, 878],
        original_language: "en",
        popularity: 85.123
      },
      {
        id: 2,
        title: "Inception",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        release_date: "2010-07-16",
        poster_path: "/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
        backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        vote_average: 8.8,
        vote_count: 33000,
        genre_ids: [28, 878, 53],
        original_language: "en",
        popularity: 90.456
      }
    ];

    const filteredMovies = query
      ? mockMovies.filter(movie =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.overview.toLowerCase().includes(query.toLowerCase())
        )
      : mockMovies;

    return NextResponse.json({ results: filteredMovies.slice(0, limit) });
  } catch (error) {
    console.error('Movies search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
