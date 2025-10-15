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
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`, {
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
        console.error('TMDB TV API error:', error);
      }
    }

    // Fallback mock data
    const mockTVShows = [
      {
        id: 1,
        name: "Stranger Things",
        overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
        first_air_date: "2016-07-15",
        poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
        vote_average: 8.6,
        vote_count: 15234,
        genre_ids: [18, 10765, 9648],
        origin_country: ["US"],
        original_language: "en",
        popularity: 1234.56
      },
      {
        id: 2,
        name: "The Mandalorian",
        overview: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
        first_air_date: "2019-11-12",
        poster_path: "/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        backdrop_path: "/9ijMGlJKqcslswWUzTEwScm82Gs.jpg",
        vote_average: 8.5,
        vote_count: 8901,
        genre_ids: [10765, 37],
        origin_country: ["US"],
        original_language: "en",
        popularity: 876.54
      }
    ];

    const filteredShows = query
      ? mockTVShows.filter(show =>
          show.name.toLowerCase().includes(query.toLowerCase()) ||
          show.overview.toLowerCase().includes(query.toLowerCase())
        )
      : mockTVShows;

    return NextResponse.json({ results: filteredShows.slice(0, limit) });
  } catch (error) {
    console.error('TV Shows search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
