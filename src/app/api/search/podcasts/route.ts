import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // Try iTunes Podcast API
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=podcast&entity=podcast&limit=${limit}`, {
        headers: {
          'User-Agent': 'Five Alike App/1.0'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const results = data.results || [];
        const podcasts = results.map((podcast: any) => ({
          id: podcast.collectionId,
          name: podcast.collectionName,
          description: podcast.description || '',
          artist: podcast.artistName,
          artwork: podcast.artworkUrl600 || podcast.artworkUrl100,
          genre: podcast.primaryGenreName,
          trackCount: podcast.trackCount,
          releaseDate: podcast.releaseDate,
          country: podcast.country,
          feedUrl: podcast.feedUrl,
          websiteUrl: podcast.collectionViewUrl
        }));

        return NextResponse.json(podcasts);
      }
    } catch (error) {
      console.error('iTunes API error:', error);
    }

    // Fallback mock data
    const mockPodcasts = [
      {
        id: 1,
        name: "The Joe Rogan Experience",
        description: "The Joe Rogan Experience podcast is a long form conversation hosted by comedian Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA fighters, authors, artists, and beyond.",
        artist: "Joe Rogan",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/1d/5f/7a/1d5f7a7a-8b9b-9b7a-8b7a-1d5f7a7a8b9b/mza_123456789.jpg/600x600bb.jpg",
        genre: "Comedy",
        trackCount: 2000,
        releaseDate: "2009-12-24",
        country: "USA"
      },
      {
        id: 2,
        name: "Serial",
        description: "Serial is a podcast from the creators of This American Life, hosted by Sarah Koenig. Serial unfolds one story - a true story - over the course of a whole season.",
        artist: "Sarah Koenig",
        artwork: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/2b/6c/8d/2b6c8d2b-7c9d-9c8d-7c8d-2b6c8d2b7c9d/mza_987654321.jpg/600x600bb.jpg",
        genre: "True Crime",
        trackCount: 50,
        releaseDate: "2014-10-03",
        country: "USA"
      }
    ];

    const filteredPodcasts = query
      ? mockPodcasts.filter(podcast =>
          podcast.name.toLowerCase().includes(query.toLowerCase()) ||
          podcast.artist.toLowerCase().includes(query.toLowerCase()) ||
          podcast.description.toLowerCase().includes(query.toLowerCase())
        )
      : mockPodcasts;

    return NextResponse.json(filteredPodcasts.slice(0, limit));
  } catch (error) {
    console.error('Podcast search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
