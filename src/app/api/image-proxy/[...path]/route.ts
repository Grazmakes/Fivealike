import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_HOSTS = new Set(['image.tmdb.org']);

export async function GET(request: NextRequest, context: { params: { path?: string[] } }) {
  try {
    const segments = context.params.path || [];

    if (segments.length === 0) {
      return NextResponse.json({ error: 'Missing image path' }, { status: 400 });
    }

    const joinedPath = segments.join('/');

    if (joinedPath.includes('..')) {
      return NextResponse.json({ error: 'Invalid image path' }, { status: 400 });
    }

    const targetHost = 'image.tmdb.org';
    const targetUrl = `https://${targetHost}/${joinedPath}`;

    if (!ALLOWED_HOSTS.has(targetHost)) {
      return NextResponse.json({ error: 'Host not allowed' }, { status: 403 });
    }

    const upstream = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Five Alike Image Proxy/1.0'
      },
      cache: 'no-store'
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: upstream.status || 502 });
    }

    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const responseHeaders = new Headers({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Image-Source': targetUrl
    });

    return new NextResponse(upstream.body, {
      status: 200,
      headers: responseHeaders
    });
  } catch (error: any) {
    console.error('[image-proxy] error', error);
    return NextResponse.json({ error: 'Image proxy error' }, { status: 500 });
  }
}
