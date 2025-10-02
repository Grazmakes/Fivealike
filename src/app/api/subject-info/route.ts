import { NextResponse } from 'next/server';
import { subjectFallbacks, normalizeSubjectKey } from '@/data/subjectFallbacks';

interface SubjectInfo {
  description: string;
  image?: string;
  sourceName: string;
  sourceUrl?: string;
}

interface SubjectInfoRequest {
  subject?: string;
  category?: string;
}

interface DuckDuckGoTopic {
  Text?: string;
  FirstURL?: string;
  Icon?: {
    URL?: string;
  };
  Topics?: DuckDuckGoTopic[];
}

const USER_AGENT = 'FiveAlike/1.0 (+https://fivealike.app/contact)';

const ensureHttps = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/')) {
    return `https://duckduckgo.com${url}`;
  }
  if (url.startsWith('data:')) {
    return undefined;
  }
  return `https://${url}`;
};

const cleanDescription = (raw?: string | null): string => {
  if (!raw) return '';
  const compact = raw.replace(/\s+/g, ' ').trim();
  return compact.length > 1200 ? `${compact.slice(0, 1197)}…` : compact;
};

const flattenTopics = (topics: DuckDuckGoTopic[] = []): DuckDuckGoTopic[] => {
  return topics.flatMap((topic) => {
    if (topic.Topics && topic.Topics.length > 0) {
      return flattenTopics(topic.Topics);
    }
    return [topic];
  });
};

const DEFAULT_TIMEOUT = 1000; // Reduced from 2000ms to 1000ms for faster failures

const fetchWithTimeout = async (input: string, init?: RequestInit, timeout = DEFAULT_TIMEOUT) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    return response;
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

const fetchFromTMDB = async (subject: string, type: 'movie' | 'tv'): Promise<SubjectInfo | null> => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return null;
  }

  const endpoint = `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(subject)}&include_adult=false&page=1`;

  try {
    const response = await fetchWithTimeout(endpoint, { cache: 'no-store' });
    if (!response || !response.ok) {
      return null;
    }

    const payload = await response.json();
    const results = payload.results || [];
    if (results.length === 0) {
      return null;
    }

    const match = results.find((item: any) => item.poster_path) || results[0];
    if (!match) {
      return null;
    }

    const image = match.poster_path ? ensureHttps(`https://image.tmdb.org/t/p/w500${match.poster_path}`) : undefined;
    const description = cleanDescription(match.overview);
    const sourceUrl = ensureHttps(`https://www.themoviedb.org/${type === 'tv' ? 'tv' : 'movie'}/${match.id}`);

    return {
      description,
      image,
      sourceName: 'TMDB',
      sourceUrl
    };
  } catch (error) {
    console.error('TMDB lookup failed', error);
    return null;
  }
};

const fetchFromOpenLibrary = async (subject: string): Promise<SubjectInfo | null> => {
  const endpoint = `https://openlibrary.org/search.json?title=${encodeURIComponent(subject)}&limit=5`;

  try {
    const response = await fetchWithTimeout(endpoint, { cache: 'no-store' });
    if (!response || !response.ok) {
      return null;
    }

    const payload = await response.json();
    const docs = payload.docs || [];

    if (docs.length === 0) {
      return null;
    }

    // Find the best match with a cover
    const book = docs.find((doc: any) => doc.cover_i && doc.author_name) || docs[0];
    if (!book) {
      return null;
    }

    // Open Library cover URLs - use Large size for best quality
    const image = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : undefined;

    // Build description from available data
    const author = Array.isArray(book.author_name) ? book.author_name[0] : book.author_name;
    const publishYear = book.first_publish_year;
    let description = '';

    if (author && publishYear) {
      description = `${book.title} by ${author}, first published in ${publishYear}.`;
    } else if (author) {
      description = `${book.title} by ${author}.`;
    }

    // Try to get Open Library URL
    const sourceUrl = book.key ? `https://openlibrary.org${book.key}` : undefined;

    if (!image && !description) {
      return null;
    }

    return {
      description,
      image,
      sourceName: 'Open Library',
      sourceUrl
    };
  } catch (error) {
    console.error('Open Library lookup failed', error);
    return null;
  }
};

const fetchFromGoogleBooks = async (subject: string): Promise<SubjectInfo | null> => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  let endpoint = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(subject)}&maxResults=5`;
  if (apiKey) {
    endpoint += `&key=${apiKey}`;
  }

  try {
    const response = await fetchWithTimeout(endpoint, { cache: 'no-store' });
    if (!response || !response.ok) {
      return null;
    }

    const payload = await response.json();
    const items = payload.items || [];
    if (items.length === 0) {
      return null;
    }

    const volume = items.find((item: any) => item.volumeInfo?.imageLinks?.thumbnail) || items[0];
    if (!volume?.volumeInfo) {
      return null;
    }

    const info = volume.volumeInfo;
    const description = cleanDescription(info.description);
    const image = ensureHttps(info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail);
    const sourceUrl = ensureHttps(info.infoLink || info.previewLink);

    return {
      description,
      image,
      sourceName: 'Google Books',
      sourceUrl
    };
  } catch (error) {
    console.error('Google Books lookup failed', error);
    return null;
  }
};

const upscaleItunesArtwork = (url?: string) => {
  if (!url) return undefined;
  const httpsUrl = ensureHttps(url);
  if (!httpsUrl) return undefined;
  return httpsUrl.replace(/\/[^/]*?(\d{2,4}x\d{2,4})bb\.(jpg|png)$/i, '/600x600bb.$2');
};

const fetchFromAudioDB = async (subject: string): Promise<SubjectInfo | null> => {
  const endpoint = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(subject)}`;

  try {
    const response = await fetchWithTimeout(endpoint, { cache: 'no-store' });
    if (!response || !response.ok) {
      return null;
    }

    const payload = await response.json();
    const artists = payload.artists || [];

    if (artists.length === 0) {
      return null;
    }

    const artist = artists[0];
    if (!artist) {
      return null;
    }

    // Prefer strArtistThumb (square) over strArtistFanart (landscape)
    const image = ensureHttps(artist.strArtistThumb || artist.strArtistFanart || artist.strArtistLogo);
    const description = cleanDescription(artist.strBiographyEN || artist.strBiographyCN || '');
    const sourceUrl = artist.strWebsite || artist.strFacebook || artist.strTwitter;

    if (!image && !description) {
      return null;
    }

    return {
      description,
      image,
      sourceName: 'AudioDB',
      sourceUrl: sourceUrl ? ensureHttps(sourceUrl) : undefined
    };
  } catch (error) {
    console.error('AudioDB lookup failed', error);
    return null;
  }
};

const fetchFromLastFM = async (subject: string): Promise<SubjectInfo | null> => {
  const apiKey = 'b25b959554ed76058ac220b7b2e0a026'; // Free Last.fm API key for music lookup

  // Try different search methods
  const searchMethods = [
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(subject)}&api_key=${apiKey}&format=json`,
    `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(subject)}&api_key=${apiKey}&format=json&limit=5`
  ];

  for (const endpoint of searchMethods) {
    try {
      const response = await fetchWithTimeout(endpoint, { cache: 'no-store' });
      if (!response || !response.ok) {
        continue;
      }

      const payload = await response.json();
      let artist = null;

      if (payload.artist) {
        // Direct artist info
        artist = payload.artist;
      } else if (payload.results?.artistmatches?.artist) {
        // Search results - find best match
        const artists = Array.isArray(payload.results.artistmatches.artist)
          ? payload.results.artistmatches.artist
          : [payload.results.artistmatches.artist];

        artist = artists.find((a: any) => a.image?.find((img: any) => img.size === 'large' && img['#text'])) || artists[0];
      }

      if (!artist) {
        continue;
      }

      // Find the largest image
      const images = Array.isArray(artist.image) ? artist.image : [];
      const largeImage = images.find((img: any) => img.size === 'extralarge' && img['#text']) ||
                       images.find((img: any) => img.size === 'large' && img['#text']) ||
                       images.find((img: any) => img.size === 'medium' && img['#text']);

      return {
        description: artist.bio?.summary || '',
        image: largeImage?.['#text'] ? ensureHttps(largeImage['#text']) : undefined,
        sourceName: 'Last.fm',
        sourceUrl: artist.url ? ensureHttps(artist.url) : undefined
      };
    } catch (error) {
      console.error('Last.fm lookup failed', error);
    }
  }

  return null;
};

const fetchFromITunes = async (subject: string): Promise<SubjectInfo | null> => {
  // Prioritize albums first since they have better artwork
  const searchEndpoints = [
    `https://itunes.apple.com/search?term=${encodeURIComponent(subject)}&entity=album&limit=3`,
    `https://itunes.apple.com/search?term=${encodeURIComponent(subject)}&entity=musicTrack&limit=3`,
    `https://itunes.apple.com/search?term=${encodeURIComponent(subject)}&entity=musicArtist&limit=1`
  ];

  for (const endpoint of searchEndpoints) {
    try {
      const response = await fetchWithTimeout(endpoint, { cache: 'no-store' });
      if (!response || !response.ok) {
        continue;
      }

      const payload = await response.json();
      // Look for the best result with artwork
      const result = payload.results?.find((item: any) =>
        item.artworkUrl100 || item.artworkUrl60
      );

      if (!result) {
        continue;
      }

      const image = upscaleItunesArtwork(result.artworkUrl100 || result.artworkUrl60);
      if (!image) {
        continue;
      }

      const sourceUrl = ensureHttps(result.artistViewUrl || result.collectionViewUrl || result.trackViewUrl);

      return {
        description: '',
        image,
        sourceName: 'Apple Music',
        sourceUrl
      };
    } catch (error) {
      console.error('Apple Music lookup failed', error);
    }
  }

  return null;
};

const fetchCategoryArtwork = async (subject: string, category?: string): Promise<SubjectInfo | null> => {
  if (!category) {
    return null;
  }

  const normalized = category.toLowerCase();

  if (['movies', 'movie', 'film', 'films', 'cinema'].includes(normalized)) {
    return fetchFromTMDB(subject, 'movie');
  }

  if (['tv shows', 'tv', 'television', 'series', 'show', 'shows'].includes(normalized)) {
    return fetchFromTMDB(subject, 'tv');
  }

  if (['books', 'book', 'novels', 'literature'].includes(normalized)) {
    // Try Open Library first for the best book covers
    const openLibraryData = await fetchFromOpenLibrary(subject);
    if (openLibraryData?.image) {
      // We have a good cover from Open Library, but check Google Books for better description
      const googleBooksData = await fetchFromGoogleBooks(subject);

      if (googleBooksData?.description && googleBooksData.description.length > openLibraryData.description.length) {
        // Merge: Open Library cover + Google Books description
        return {
          description: googleBooksData.description,
          image: openLibraryData.image,
          sourceName: 'Open Library + Google Books',
          sourceUrl: googleBooksData.sourceUrl || openLibraryData.sourceUrl
        };
      }

      return openLibraryData;
    }

    // Fall back to Google Books if Open Library has no cover
    return fetchFromGoogleBooks(subject);
  }

  if (['music', 'artist', 'song', 'songs', 'album', 'albums'].includes(normalized)) {
    // Try AudioDB first for the best music artwork coverage
    const audioDbData = await fetchFromAudioDB(subject);
    if (audioDbData?.image) {
      return audioDbData;
    }

    // Fall back to Last.fm for biography if AudioDB doesn't have image
    const lastFmData = await fetchFromLastFM(subject);
    if (lastFmData?.image || lastFmData?.description) {
      // Merge data: use AudioDB image if available, Last.fm biography
      return {
        description: lastFmData.description || audioDbData?.description || '',
        image: audioDbData?.image || lastFmData.image,
        sourceName: audioDbData?.image ? 'AudioDB' : 'Last.fm',
        sourceUrl: lastFmData.sourceUrl || audioDbData?.sourceUrl
      };
    }

    // Final fallback to iTunes if both fail
    return fetchFromITunes(subject);
  }

  return null;
};

const fetchDuckDuckGo = async (subject: string, category?: string): Promise<SubjectInfo | null> => {
  const segments = [subject];
  if (category && category.toLowerCase() !== 'general') {
    segments.push(category);
  }
  const query = segments.join(' ');
  const endpoint = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&no_redirect=1&skip_disambig=1&t=five-alike`;

  try {
    const response = await fetchWithTimeout(endpoint, {
      headers: { 'User-Agent': USER_AGENT },
      cache: 'no-store'
    });

    if (!response || !response.ok) {
      return null;
    }

    const payload = await response.json();

    let description: string = cleanDescription(payload.AbstractText || payload.Abstract);
    let image: string | undefined = ensureHttps(payload.Image);
    let sourceUrl: string | undefined = payload.AbstractURL;

    let fallbackRelatedImage = image;

    if (Array.isArray(payload.RelatedTopics)) {
      const related = flattenTopics(payload.RelatedTopics);
      const bestMatch = related.find((item) => item.Text);

      if (bestMatch?.Icon?.URL && !fallbackRelatedImage) {
        fallbackRelatedImage = ensureHttps(bestMatch.Icon.URL);
      }

      if (!description && bestMatch?.Text) {
        description = cleanDescription(bestMatch.Text);
        if (bestMatch.Icon?.URL) {
          fallbackRelatedImage = ensureHttps(bestMatch.Icon.URL);
        }
        if (bestMatch.FirstURL) {
          sourceUrl = bestMatch.FirstURL;
        }
      }
    }

    if (!description) {
      return null;
    }

    return {
      description,
      image: image || fallbackRelatedImage,
      sourceName: 'DuckDuckGo',
      sourceUrl: sourceUrl ? ensureHttps(sourceUrl) : undefined
    };
  } catch (error) {
    console.error('DuckDuckGo lookup failed', error);
    return null;
  }
};

const fetchWikipedia = async (subject: string): Promise<SubjectInfo | null> => {
  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(subject)}`;

  try {
    const response = await fetchWithTimeout(endpoint, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response || !response.ok) {
      return null;
    }

    const payload = await response.json();
    const description = cleanDescription(payload.extract);
    let image = ensureHttps(payload.thumbnail?.source || payload.originalimage?.source);
    const sourceUrl = ensureHttps(payload.content_urls?.desktop?.page || payload.content_urls?.mobile?.page);

    if (!image && payload.originalimage?.source) {
      image = ensureHttps(payload.originalimage.source);
    }

    if (!description && !image) {
      return null;
    }

    return {
      description,
      image,
      sourceName: 'Wikipedia',
      sourceUrl
    };
  } catch (error) {
    console.error('Wikipedia lookup failed', error);
    return null;
  }
};

export async function POST(request: Request) {
  const body: SubjectInfoRequest = await request.json().catch(() => ({}));

  try {
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const category = typeof body.category === 'string' ? body.category.trim() : undefined;

    if (!subject) {
      return NextResponse.json({ error: 'Subject is required.' }, { status: 400 });
    }

    // For music, prioritize live API calls over fallbacks
    const isMusicCategory = category && ['music', 'artist', 'song', 'songs', 'album', 'albums'].includes(category.toLowerCase());

    let data: SubjectInfo | null = null;
    let categoryDetails: SubjectInfo | null = null;

    if (isMusicCategory) {
      // Try live APIs first for music
      categoryDetails = await fetchCategoryArtwork(subject, category);
      if (categoryDetails?.image) {
        // Use live API data
        data = categoryDetails;
      } else {
        // Fall back to static data if APIs fail
        const fallbackKey = normalizeSubjectKey(subject, category);
        if (subjectFallbacks[fallbackKey]) {
          return NextResponse.json(subjectFallbacks[fallbackKey], { status: 200 });
        }
      }
    } else {
      // For non-music, use fallbacks first
      const fallbackKey = normalizeSubjectKey(subject, category);
      if (subjectFallbacks[fallbackKey]) {
        return NextResponse.json(subjectFallbacks[fallbackKey], { status: 200 });
      }
      categoryDetails = await fetchCategoryArtwork(subject, category);
    }

    // If we have category details, use them
    if (!data && categoryDetails) {
      data = {
        description: cleanDescription(categoryDetails.description) || '',
        image: categoryDetails.image,
        sourceName: categoryDetails.sourceName || 'External Source',
        sourceUrl: categoryDetails.sourceUrl
      };
    }

    // If no data yet, try DuckDuckGo and Wikipedia only if we don't have category data
    if (!data && !categoryDetails) {
      data = await fetchDuckDuckGo(subject, category);
    }

    if (!data && !categoryDetails) {
      data = await fetchWikipedia(subject);
    }

    if (!data) {
      return NextResponse.json({ description: '', sourceName: 'Not found' }, { status: 404 });
    }

    // Always prioritize category-specific images when available
    if (categoryDetails?.image && !isMusicCategory) {
      data.image = categoryDetails.image;
      data.sourceName = categoryDetails.sourceName || data.sourceName;
      data.sourceUrl = categoryDetails.sourceUrl || data.sourceUrl;
    }

    // Only try Wikipedia for image if we already have some data and are missing just the image
    if (!data.image && data.description) {
      const wikiFallback = await fetchWikipedia(subject);
      if (wikiFallback?.image) {
        data.image = wikiFallback.image;
        data.sourceUrl = data.sourceUrl || wikiFallback.sourceUrl;
        data.sourceName = data.sourceName || wikiFallback.sourceName;
      }
    }

    if (!data.description && categoryDetails?.description) {
      data.description = cleanDescription(categoryDetails.description);
      data.sourceName = categoryDetails.sourceName || data.sourceName;
      data.sourceUrl = categoryDetails.sourceUrl || data.sourceUrl;
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('subject-info route error', error);
    if (body?.subject) {
      const fallbackKey = normalizeSubjectKey(body.subject, body.category);
      if (subjectFallbacks[fallbackKey]) {
        return NextResponse.json(subjectFallbacks[fallbackKey], { status: 200 });
      }
    }
    return NextResponse.json({ error: 'Failed to resolve subject information.' }, { status: 500 });
  }
}
