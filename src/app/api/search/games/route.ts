import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const rawgApiKey = process.env.RAWG_API_KEY;

    if (rawgApiKey && rawgApiKey !== 'your_rawg_api_key_here') {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${rawgApiKey}&search=${encodeURIComponent(query)}&page_size=${limit}`, {
          headers: {
            'User-Agent': 'Five Alike App/1.0'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const games = (data.results || []).map((game: any) => ({
            id: game.id,
            name: game.name,
            description: game.description_raw || `${game.name} is a popular video game with a rating of ${game.rating}/5.`,
            background_image: game.background_image,
            released: game.released,
            rating: game.rating,
            rating_count: game.ratings_count,
            platforms: game.platforms?.map((p: any) => p.platform.name),
            genres: game.genres?.map((g: any) => g.name),
            stores: game.stores?.map((s: any) => s.store.name)
          }));

          return NextResponse.json(games);
        }
      } catch (error) {
        console.error('RAWG API error:', error);
      }
    }

    // Fallback mock data
    const mockGames = [
      {
        id: 1,
        name: "The Legend of Zelda: Breath of the Wild",
        description: "An action-adventure game developed by Nintendo for the Nintendo Switch and Wii U consoles. Players control Link as he awakens from a hundred-year slumber.",
        background_image: "https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
        released: "2017-03-03",
        rating: 4.5,
        rating_count: 6000,
        platforms: ["Nintendo Switch", "Wii U"],
        genres: ["Action", "Adventure"]
      },
      {
        id: 2,
        name: "The Witcher 3: Wild Hunt",
        description: "An action role-playing game developed by CD Projekt Red. Players control Geralt of Rivia, a monster slayer known as a witcher, in a vast open world.",
        background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
        released: "2015-05-19",
        rating: 4.7,
        rating_count: 8500,
        platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
        genres: ["Action", "RPG"]
      }
    ];

    const filteredGames = query
      ? mockGames.filter(game =>
          game.name.toLowerCase().includes(query.toLowerCase()) ||
          game.description.toLowerCase().includes(query.toLowerCase())
        )
      : mockGames;

    return NextResponse.json(filteredGames.slice(0, limit));
  } catch (error) {
    console.error('Games search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
