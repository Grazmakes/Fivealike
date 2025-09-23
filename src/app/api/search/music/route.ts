import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // Try Deezer API first
    const enrichedFromDeezer: any[] = [];

    try {
      const deezerResponse = await fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(query)}&limit=${limit}`, {
        headers: {
          'User-Agent': 'Five Alike App/1.0'
        }
      });

      if (deezerResponse.ok) {
        const deezerData = await deezerResponse.json();
        if (deezerData.data && deezerData.data.length > 0) {
          const artists = deezerData.data.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
            description: `Popular artist with ${artist.nb_fan || 0} fans. Known for their unique style and musical contributions.`,
            artist: artist.name,
            artwork: artist.picture_medium || artist.picture,
            genre: "Music",
            type: "artist",
            fans: artist.nb_fan,
            link: artist.link
          }));

          enrichedFromDeezer.push(...artists);
        }
      }
    } catch (error) {
      console.error('Deezer API error:', error);
    }

    const summarizeBiography = (text: string) => {
      if (!text) return null;
      const normalized = text.replace(/\r\n/g, ' ').replace(/\s+/g, ' ').trim();
      const sentences = normalized.split(/(?<=[.!?])\s+/);
      let summary = sentences[0] || '';

      if (summary.length < 160 && sentences[1]) {
        summary = `${summary} ${sentences[1]}`.trim();
      }

      if (summary.length > 400) {
        summary = `${summary.slice(0, 397)}...`;
      }

      return summary;
    };

    const fetchBiography = async (name: string) => {
      try {
        const response = await fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(name)}`);
        if (!response.ok) return null;
        const data = await response.json();
        const artist = data?.artists?.[0];
        if (!artist) return null;

        const bio = artist.strBiographyEN || '';
        const summary = summarizeBiography(bio);

        return {
          summary,
          full: bio,
          image: artist.strArtistThumb || artist.strArtistFanart || artist.strArtistFanart2 || null,
          genres: [artist.strGenre, artist.strStyle, artist.strMood].filter(Boolean) as string[]
        };
      } catch (error) {
        console.error('AudioDB biography fetch error:', error);
        return null;
      }
    };

    if (enrichedFromDeezer.length > 0) {
      const maxBioRequests = 5;
      const targets = enrichedFromDeezer.slice(0, Math.min(maxBioRequests, enrichedFromDeezer.length));

      await Promise.all(targets.map(async (artist, index) => {
        const bioDetails = await fetchBiography(artist.name);
        if (bioDetails) {
          enrichedFromDeezer[index] = {
            ...artist,
            description: bioDetails.summary || artist.description,
            bio: bioDetails.summary ? { summary: bioDetails.summary, full: bioDetails.full } : artist.bio,
            artwork: bioDetails.image || artist.artwork || null,
            genres: artist.genres || bioDetails.genres || undefined,
            images: bioDetails.image
              ? [{ url: bioDetails.image, height: 250, width: 250 }]
              : artist.images
          };
        }
      }));

      return NextResponse.json(enrichedFromDeezer);
    }

    // Fallback mock data
    const mockMusic = [
      {
        id: 1,
        name: "Bohemian Rhapsody",
        artist: "Queen",
        description: "A rock opera song written by Freddie Mercury for the British rock band Queen. It was originally included in the album A Night at the Opera in 1975.",
        artwork: "https://i.scdn.co/image/ab67616d0000b273e319baafd16e84f0408af2a0",
        genre: "Rock",
        type: "song",
        album: "A Night at the Opera",
        year: 1975
      },
      {
        id: 2,
        name: "Hotel California",
        artist: "Eagles",
        description: "A song by the American rock band Eagles, written by Don Felder, Don Henley, and Glenn Frey. It's one of the best-known songs of the album of the same name.",
        artwork: "https://i.scdn.co/image/ab67616d0000b273268f8e3de9a4a49c0134fe79",
        genre: "Rock",
        type: "song",
        album: "Hotel California",
        year: 1976
      }
    ];

    const filteredMusic = query
      ? mockMusic.filter(music =>
          music.name.toLowerCase().includes(query.toLowerCase()) ||
          music.artist.toLowerCase().includes(query.toLowerCase()) ||
          music.description.toLowerCase().includes(query.toLowerCase())
        )
      : mockMusic;

    return NextResponse.json(filteredMusic.slice(0, limit));
  } catch (error) {
    console.error('Music search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
