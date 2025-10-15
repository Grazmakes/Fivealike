import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    apis: {
      tmdb: process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY ? 'configured' : 'missing',
      omdb: process.env.OMDB_API_KEY ? 'configured' : 'missing',
      google_books: process.env.GOOGLE_BOOKS_API_KEY ? 'configured' : 'missing',
      rawg: process.env.RAWG_API_KEY ? 'configured' : 'missing',
      spotify: (process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET) ? 'configured' : 'missing',
      lastfm: process.env.LASTFM_API_KEY ? 'configured' : 'optional',
      news: process.env.NEXT_PUBLIC_NEWS_API_KEY ? 'configured' : 'optional'
    },
    features: {
      caching: 'enabled',
      rate_limiting: 'enabled',
      image_optimization: 'enabled',
      security_headers: 'enabled'
    }
  };

  return NextResponse.json(healthStatus);
}
