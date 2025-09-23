'use client';

import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Search, ExternalLink, Star, Calendar, User } from 'lucide-react';
import { secureApiService } from '@/services/secureApiService';
import { SearchResultsSkeleton } from '@/components/ui/LoadingStates';
import { SearchErrorBoundary } from '@/components/ui/ErrorBoundaries';
import { wikipediaService, WikipediaSearchResult } from '@/services/wikipediaService';

interface SmartSearchProps {
  category: string;
  onSelectItem: (item: any) => void;
  placeholder?: string;
}

interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  images?: Array<{ url: string; height?: number; width?: number }>;
  year?: number;
  rating?: number;
  authors?: string[];
  platforms?: string[];
  artists?: string[];
  musicType?: 'artist' | 'album' | 'track';
  bio?: { summary: string; full?: string };
  type: 'movie' | 'book' | 'game' | 'music';
}

function SmartSearch({ category, onSelectItem, placeholder }: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [wikipediaResults, setWikipediaResults] = useState<WikipediaSearchResult[]>([]);
  const [showWikipediaResults, setShowWikipediaResults] = useState(false);

  // Check if category has API support
  const hasApiSupport = useMemo(() => {
    const supportedCategories = ['Movies', 'TV Shows', 'Books', 'Games', 'Music', 'Podcasts'];
    return supportedCategories.includes(category);
  }, [category]);

  // Memoized search function to prevent recreation on every render
  const debouncedSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      setShowResults(false);
      setWikipediaResults([]);
      setShowWikipediaResults(false);
      return;
    }

    setLoading(true);
    try {
      if (hasApiSupport) {
        // Use specific API for supported categories
        const rawResults = await secureApiService.searchByCategory(searchQuery, category, 10);
        const formattedResults = secureApiService.formatSearchResults(rawResults, category);
        setResults(formattedResults);
        setShowResults(true);
        setWikipediaResults([]);
        setShowWikipediaResults(false);
      } else {
        // Use Wikipedia for unsupported categories
        const wikipediaRes = await wikipediaService.searchWikipedia(searchQuery, 8);
        setWikipediaResults(wikipediaRes);
        setShowWikipediaResults(true);
        setResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setWikipediaResults([]);
    } finally {
      setLoading(false);
    }
  }, [category, hasApiSupport]);

  // Memoized placeholder getter
  const placeholderText = useMemo(() => {
    if (placeholder) return placeholder;
    
    switch (category.toLowerCase()) {
      case 'movies & tv':
      case 'movies':
        return 'Search movies and TV shows...';
      case 'music':
        return 'Search artists and albums...';
      case 'books':
        return 'Search books and authors...';
      case 'games':
        return 'Search games...';
      default:
        return 'Search...';
    }
  }, [category, placeholder]);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      debouncedSearch(query);
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query, debouncedSearch]);

  const handleSelectItem = useCallback((item: SearchResult | WikipediaSearchResult) => {
    onSelectItem(item);
    setQuery('');
    setResults([]);
    setShowResults(false);
    setWikipediaResults([]);
    setShowWikipediaResults(false);
  }, [onSelectItem]);

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (category.toLowerCase()) {
      case 'movies & tv':
      case 'movies':
        return 'Search movies and TV shows...';
      case 'books':
        return 'Search books and authors...';
      case 'games':
        return 'Search games...';
      default:
        return 'Search...';
    }
  };

  const renderResultItem = (item: SearchResult) => {
    return (
      <button
        key={`${item.type}-${item.id}`}
        onClick={() => handleSelectItem(item)}
        className="w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left flex items-start space-x-3"
      >
        {/* Image */}
        <div className="w-12 h-16 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0 overflow-hidden">
          {item.image ? (
            <Image 
              src={item.image} 
              alt={item.title}
              width={48}
              height={64}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <ExternalLink size={16} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
              {item.title}
            </h4>
            <div className="flex items-center ml-2 flex-shrink-0">
              {item.rating && (
                <div className="flex items-center text-yellow-500">
                  <Star size={12} className="fill-current" />
                  <span className="text-xs ml-1">{item.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
            {item.year && (
              <div className="flex items-center">
                <Calendar size={10} className="mr-1" />
                {item.year}
              </div>
            )}
            
            {item.authors && item.authors.length > 0 && (
              <div className="flex items-center">
                <User size={10} className="mr-1" />
                {item.authors[0]}
                {item.authors.length > 1 && ` +${item.authors.length - 1}`}
              </div>
            )}

            {item.artists && item.artists.length > 0 && (
              <div className="flex items-center">
                <User size={10} className="mr-1" />
                {item.artists[0]}
                {item.artists.length > 1 && ` +${item.artists.length - 1}`}
              </div>
            )}

            {item.platforms && item.platforms.length > 0 && (
              <div className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-0.5 rounded">
                {item.platforms[0]}
                {item.platforms.length > 1 && ` +${item.platforms.length - 1}`}
              </div>
            )}

            {item.musicType && (
              <div className="text-xs bg-purple-100 dark:bg-purple-600 px-2 py-0.5 rounded">
                {item.musicType}
              </div>
            )}

            <span className="capitalize text-green-600 dark:text-green-400 font-medium">
              {item.type}
            </span>
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {item.description.length > 150 
                ? `${item.description.substring(0, 150)}...`
                : item.description
              }
            </p>
          )}
        </div>
      </button>
    );
  };

  return (
    <SearchErrorBoundary>
      <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-4 w-4 ${loading ? 'animate-spin' : ''} text-gray-400`} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholderText}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          onFocus={() => setShowResults(true)}
          onBlur={() => {
            // Delay hiding results to allow clicks
            setTimeout(() => setShowResults(false), 150);
          }}
        />
      </div>

      {/* Loading Results */}
      {(showResults || showWikipediaResults) && loading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-96 overflow-y-auto z-50">
          <div className="p-2 border-b border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {hasApiSupport ? 'Searching external APIs...' : 'Searching Wikipedia...'}
            </p>
          </div>
          <div className="p-2">
            <SearchResultsSkeleton count={3} />
          </div>
        </div>
      )}

      {/* Results Dropdown */}
      {showResults && !loading && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-96 overflow-y-auto z-50">
          <div className="p-2 border-b border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {results.length} results from external APIs
            </p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {results.map(renderResultItem)}
          </div>
        </div>
      )}

      {/* Wikipedia Results Dropdown */}
      {showWikipediaResults && !loading && wikipediaResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-96 overflow-y-auto z-50">
          <div className="p-2 border-b border-gray-200 dark:border-gray-600">
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
              <span className="mr-1">📖</span>
              {wikipediaResults.length} results from Wikipedia
            </p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {wikipediaResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelectItem(result)}
                className="w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left flex items-start space-x-3"
              >
                {/* Wikipedia Icon */}
                <div className="w-12 h-16 bg-blue-100 dark:bg-blue-900/20 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-2xl">📖</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                    {result.title}
                  </h4>

                  {/* Wikipedia badge */}
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span className="text-xs bg-blue-100 dark:bg-blue-600 px-2 py-0.5 rounded text-blue-600 dark:text-blue-100">
                      Wikipedia
                    </span>
                  </div>

                  {/* Description */}
                  {result.description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {result.description.length > 150
                        ? `${result.description.substring(0, 150)}...`
                        : result.description
                      }
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {((showResults && !loading && query.length > 2 && results.length === 0 && hasApiSupport) ||
        (showWikipediaResults && !loading && query.length > 2 && wikipediaResults.length === 0 && !hasApiSupport)) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
          <div className="p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No results found for &ldquo;{query}&rdquo;
            </p>
            {!hasApiSupport && (
              <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                Try searching Wikipedia directly for broader results
              </p>
            )}
          </div>
        </div>
      )}
      </div>
    </SearchErrorBoundary>
  );
}

// Memoized SmartSearch to prevent re-renders when props haven't changed
export default memo(SmartSearch, (prevProps, nextProps) => {
  return (
    prevProps.category === nextProps.category &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.onSelectItem === nextProps.onSelectItem
  );
});
