import { NextRequest, NextResponse } from 'next/server';

// Enhanced podcast descriptions for popular shows
const enhancedDescriptions = {
  "lex fridman podcast": "Conversations about science, technology, history, philosophy and the nature of intelligence, consciousness, love, and power. Lex is an AI researcher at MIT and beyond.",
  "the joe rogan experience": "The Joe Rogan Experience podcast is a long form conversation hosted by comedian Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA fighters, authors, artists, and beyond.",
  "serial": "Serial is a podcast from the creators of This American Life, hosted by Sarah Koenig. Serial unfolds one story - a true story - over the course of a whole season.",
  "this american life": "This American Life is a weekly public radio show, heard by 2.2 million people on more than 500 stations. Another 2.5 million people download the weekly podcast.",
  "radiolab": "Radiolab is a show about curiosity. Where sound illuminates ideas, and the boundaries blur between science, philosophy, and human experience.",
  "hardcore history": "In 'Hardcore History' journalist and broadcaster Dan Carlin takes his 'Martian', unorthodox way of thinking and applies it to the past.",
  "conan o'brien needs a friend": "Conan O'Brien has been a writer and performer for more than 20 years. Now he's branching out into podcasting in the hopes of finding some friends.",
  "my favorite murder": "Georgia Hardstark and Karen Kilgariff hit the road and talk to friends old and new about their favorite murders.",
  "planet money": "The economy explained. Imagine you could call up a friend and say, 'Meet me at the bar and tell me what's going on with the economy.' Now imagine that's actually a fun evening.",
  "stuff you should know": "If you've ever wanted to know about champagne, satanism, the Stonewall Uprising, chaos theory, LSD, El Nino, true crime and Rosa Parks, then look no further.",
  "ted talks daily": "TED is a nonprofit devoted to Ideas Worth Spreading. On this video feed, you'll find TED Talks to inspire, intrigue and stir the imagination from some of the world's leading thinkers and doers.",
  "the tim ferriss show": "Tim Ferriss is a five-time #1 New York Times and Wall Street Journal bestseller, investor, and host of The Tim Ferriss Show podcast, which has been downloaded more than 700 million times.",
  "fresh air": "Fresh Air with Terry Gross, the Peabody Award-winning weekday magazine of contemporary arts and issues, is one of public radio's most popular programs.",
  "armchair expert": "Hi, I'm Dax Shepard, and I love talking to people. I am endlessly fascinated by the messiness of being human, and I find people who are vulnerable and honest about their struggles and shortcomings to be incredibly sexy.",
  "reply all": "Reply All is a show about the internet that is actually an unfailingly original exploration of modern life and how to survive it.",
  "smartless": "New episodes come out every Monday for free, with 1-week early access when you join Amazon Music or 1-week early and ad-free for Wondery+ subscribers.",
  "huberman lab": "Huberman Lab discusses neuroscience: how our brain and its connections with the organs of our body control our perceptions, our behaviors, and our health.",
  "crime junkie": "If you can never get enough true crime... Congratulations, you've found your people."
};

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
        const podcasts = results.map((podcast: any) => {
          const podcastName = podcast.collectionName?.toLowerCase() || '';
          const enhancedDescription = enhancedDescriptions[podcastName] || podcast.description || '';

          return {
            id: podcast.collectionId,
            name: podcast.collectionName,
            description: enhancedDescription,
            artist: podcast.artistName,
            artwork: podcast.artworkUrl600 || podcast.artworkUrl100,
            genre: podcast.primaryGenreName,
            trackCount: podcast.trackCount,
            releaseDate: podcast.releaseDate,
            country: podcast.country,
            feedUrl: podcast.feedUrl,
            websiteUrl: podcast.collectionViewUrl
          };
        });

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
        description: enhancedDescriptions["the joe rogan experience"],
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
        description: enhancedDescriptions["serial"],
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
