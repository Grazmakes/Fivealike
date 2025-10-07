import { NextRequest, NextResponse } from 'next/server';

// Get Spotify access token using client credentials flow
async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get('artistId');
    const artistName = searchParams.get('artistName');

    if (!artistId && !artistName) {
      return NextResponse.json({ error: 'artistId or artistName is required' }, { status: 400 });
    }

    const accessToken = await getSpotifyAccessToken();

    let topTracksUrl;

    if (artistId) {
      // Use artist ID to get top tracks
      topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;
    } else {
      // Search for artist first
      const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName!)}&type=artist&limit=1`;
      const searchResponse = await fetch(searchUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!searchResponse.ok) {
        return NextResponse.json({ error: 'Failed to search for artist' }, { status: searchResponse.status });
      }

      const searchData = await searchResponse.json();

      if (!searchData.artists?.items?.[0]) {
        return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
      }

      const foundArtistId = searchData.artists.items[0].id;
      topTracksUrl = `https://api.spotify.com/v1/artists/${foundArtistId}/top-tracks?market=US`;
    }

    // Fetch top tracks
    const tracksResponse = await fetch(topTracksUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!tracksResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: tracksResponse.status });
    }

    const tracksData = await tracksResponse.json();

    // Find the first track with a preview URL
    const trackWithPreview = tracksData.tracks?.find((track: any) => track.preview_url);

    if (!trackWithPreview) {
      return NextResponse.json({ error: 'No preview available' }, { status: 404 });
    }

    return NextResponse.json({
      previewUrl: trackWithPreview.preview_url,
      trackName: trackWithPreview.name,
      artistName: trackWithPreview.artists?.[0]?.name,
      albumImage: trackWithPreview.album?.images?.[0]?.url
    });

  } catch (error) {
    console.error('Preview track error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
