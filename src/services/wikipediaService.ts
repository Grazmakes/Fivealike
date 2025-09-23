export interface WikipediaSearchResult {
  title: string;
  description: string;
  id: number;
  url: string;
}

export interface WikipediaSummary {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  pageUrl: string;
}

class WikipediaService {
  private baseUrl = 'https://en.wikipedia.org/w/api.php';
  private restApiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary';
  private cache = new Map<string, { data: any; timestamp: number }>();
  private lastRequestTime = 0;
  private minRequestInterval = 100; // Minimum 100ms between requests
  private requestCount = 0;

  private async throttledRequest(url: string, options?: RequestInit): Promise<any> {
    // Check cache first
    const cacheKey = url;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 300000) { // 5 minute cache
      console.log(`[Wikipedia] Using cached response for: ${url}`);
      return cached.data;
    }

    // Throttle requests
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minRequestInterval) {
      const delay = this.minRequestInterval - timeSinceLastRequest;
      console.log(`[Wikipedia] Throttling request, waiting ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    this.lastRequestTime = Date.now();
    this.requestCount++;
    console.log(`[Wikipedia] Making request #${this.requestCount} to: ${url}`);

    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...options?.headers
      },
      mode: 'cors'
    });

    if (!response.ok) {
      console.error(`[Wikipedia] HTTP ${response.status} for: ${url}`);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache successful responses
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    console.log(`[Wikipedia] Cached response for: ${url}`);

    return data;
  }

  async searchWikipedia(query: string, limit: number = 5): Promise<WikipediaSearchResult[]> {
    try {
      console.log(`[Wikipedia] Searching for: "${query}"`);
      const url = `${this.baseUrl}?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=${limit}`;
      const data = await this.throttledRequest(url);

      const results = data.query?.search?.map((result: any) => ({
        title: result.title,
        description: result.snippet?.replace(/<[^>]*>/g, ''), // Remove HTML tags
        id: result.pageid,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`
      })) || [];

      console.log(`[Wikipedia] Found ${results.length} search results for: "${query}"`);
      return results;
    } catch (error) {
      console.error('[Wikipedia] Search failed:', error);
      return [];
    }
  }

  async getWikipediaSummary(title: string): Promise<WikipediaSummary | null> {
    try {
      if (!title || title.trim().length === 0) {
        return null;
      }

      console.log(`[Wikipedia] Getting summary for: "${title}"`);

      // Try REST API first
      try {
        const encodedTitle = encodeURIComponent(title.replace(/ /g, '_'));
        const url = `${this.restApiUrl}/${encodedTitle}`;
        const data = await this.throttledRequest(url);

        // Validate required data structure
        if (data && typeof data === 'object') {
          const result = {
            title: data.title || title,
            extract: data.extract || '',
            description: data.description || undefined,
            thumbnail: data.thumbnail && data.thumbnail.source ? {
              source: data.thumbnail.source,
              width: data.thumbnail.width || 100,
              height: data.thumbnail.height || 100
            } : undefined,
            pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodedTitle}`
          };

          console.log(`[Wikipedia] Successfully got summary for: "${title}" via REST API`);
          return result;
        }
      } catch (restError) {
        console.log(`[Wikipedia] REST API failed for "${title}", trying fallback method`);
      }

      // Fallback to regular API with extracts
      try {
        const extract = await this.getWikipediaExtract(title);
        if (extract) {
          const encodedTitle = encodeURIComponent(title.replace(/ /g, '_'));
          const result = {
            title: title,
            extract: this.getFirstParagraph(extract),
            description: undefined,
            thumbnail: undefined,
            pageUrl: `https://en.wikipedia.org/wiki/${encodedTitle}`
          };

          console.log(`[Wikipedia] Successfully got summary for: "${title}" via fallback method`);
          return result;
        }
      } catch (fallbackError) {
        console.log(`[Wikipedia] Fallback method also failed for "${title}"`);
      }

      return null;
    } catch (error) {
      console.error(`[Wikipedia] Summary fetch failed for "${title}":`, error);
      return null;
    }
  }

  async getWikipediaExtract(title: string): Promise<string | null> {
    try {
      console.log(`[Wikipedia] Getting extract for: "${title}"`);
      const url = `${this.baseUrl}?action=query&format=json&origin=*&prop=extracts&exintro=&explaintext=&titles=${encodeURIComponent(title)}`;
      const data = await this.throttledRequest(url);

      const pages = data.query?.pages;
      if (!pages) return null;

      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];

      if (pageId === '-1' || !page.extract) return null;

      console.log(`[Wikipedia] Successfully got extract for: "${title}"`);
      return page.extract;
    } catch (error) {
      console.error(`[Wikipedia] Extract fetch failed for "${title}":`, error);
      return null;
    }
  }

  cleanWikipediaText(text: string): string {
    return text
      .replace(/\([^)]*\)/g, '') // Remove parenthetical content
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  getFirstParagraph(text: string): string {
    const paragraphs = text.split('\n\n');
    const firstParagraph = paragraphs[0] || text;

    // Limit to reasonable length for dropdown display
    if (firstParagraph.length > 300) {
      const sentences = firstParagraph.split('. ');
      let result = sentences[0];

      for (let i = 1; i < sentences.length; i++) {
        if ((result + '. ' + sentences[i]).length > 300) break;
        result += '. ' + sentences[i];
      }

      return result + (result.endsWith('.') ? '' : '.');
    }

    return firstParagraph;
  }
}

export const wikipediaService = new WikipediaService();