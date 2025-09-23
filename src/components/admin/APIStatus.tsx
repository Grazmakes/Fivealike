'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink, Key } from 'lucide-react';
import { secureApiService } from '@/services/secureApiService';
import { UnifiedSearch } from '@/utils/apiService';

interface APIStatus {
  [key: string]: boolean;
}

interface TestResult {
  api: string;
  status: 'success' | 'error' | 'testing';
  message?: string;
  data?: any;
}

export default function APIStatus() {
  const [apiStatus, setApiStatus] = useState<APIStatus>({});
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTestResults, setShowTestResults] = useState(false);

  const checkAllAPIs = async () => {
    setLoading(true);
    try {
      const status: APIStatus = {};
      
      // Test Books API
      try {
        const books = await secureApiService.searchBooks('Harry Potter', 1);
        status['Google Books'] = books.length > 0;
      } catch {
        status['Google Books'] = false;
      }
      
      // Test Games API  
      try {
        const games = await secureApiService.searchGames('Minecraft', 1);
        status['RAWG Games'] = games.length > 0;
      } catch {
        status['RAWG Games'] = false;
      }
      
      // Test Music API
      try {
        const music = await secureApiService.searchMusic('Beatles', 1);
        status['Music (Spotify/Last.fm)'] = music.length > 0;
      } catch {
        status['Music (Spotify/Last.fm)'] = false;
      }
      
      // Test TMDB API
      try {
        const movies = await secureApiService.searchMovies('Inception', 1);
        status['TMDB Movies'] = movies.length > 0;
      } catch {
        status['TMDB Movies'] = false;
      }
      
      setApiStatus(status);
    } catch (error) {
      console.error('API health check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const runDetailedTests = async () => {
    setShowTestResults(true);
    setTestResults([
      { api: 'Spotify', status: 'testing', message: 'Testing music search...' },
      { api: 'OMDB', status: 'testing', message: 'Testing movie search...' },
      { api: 'Google Books', status: 'testing', message: 'Testing book search...' },
      { api: 'RAWG Games', status: 'testing', message: 'Testing game search...' }
    ]);

    // Test each API individually
    const results: TestResult[] = [];

    // Test Spotify
    try {
      const spotifyResults = await UnifiedSearch.searchByType('Beatles', 'music');
      results.push({
        api: 'Spotify',
        status: 'success',
        message: `Found ${spotifyResults.length} music results`,
        data: spotifyResults[0]
      });
    } catch (error) {
      results.push({
        api: 'Spotify',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test OMDB
    try {
      const movieResults = await UnifiedSearch.searchByType('Inception', 'movie');
      results.push({
        api: 'OMDB',
        status: 'success',
        message: `Found ${movieResults.length} movie results`,
        data: movieResults[0]
      });
    } catch (error) {
      results.push({
        api: 'OMDB',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test Google Books
    try {
      const bookResults = await UnifiedSearch.searchByType('Harry Potter', 'book');
      results.push({
        api: 'Google Books',
        status: 'success',
        message: `Found ${bookResults.length} book results`,
        data: bookResults[0]
      });
    } catch (error) {
      results.push({
        api: 'Google Books',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test RAWG Games
    try {
      const gameResults = await UnifiedSearch.searchByType('Zelda', 'game');
      results.push({
        api: 'RAWG Games',
        status: 'success',
        message: `Found ${gameResults.length} game results`,
        data: gameResults[0]
      });
    } catch (error) {
      results.push({
        api: 'RAWG Games',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    setTestResults(results);
  };

  useEffect(() => {
    checkAllAPIs();
  }, []);

  const getStatusIcon = (status: boolean | undefined) => {
    if (status === undefined) {
      return <AlertCircle className="text-yellow-500" size={20} />;
    }
    return status ? 
      <CheckCircle className="text-green-500" size={20} /> : 
      <XCircle className="text-red-500" size={20} />;
  };

  const getStatusText = (status: boolean | undefined) => {
    if (status === undefined) return 'Unknown';
    return status ? 'Connected' : 'Failed';
  };

  const apis = [
    {
      name: 'Spotify',
      key: 'spotify',
      description: 'Music tracks, artists, and albums',
      setupUrl: 'https://developer.spotify.com/dashboard/applications',
      envVars: ['NEXT_PUBLIC_SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET']
    },
    {
      name: 'OMDB',
      key: 'movies',
      description: 'Movies and TV shows metadata',
      setupUrl: 'http://www.omdbapi.com/apikey.aspx',
      envVars: ['NEXT_PUBLIC_OMDB_API_KEY']
    },
    {
      name: 'Google Books',
      key: 'books',
      description: 'Book information and metadata',
      setupUrl: 'https://console.developers.google.com/',
      envVars: ['NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY']
    },
    {
      name: 'RAWG Games',
      key: 'games',
      description: 'Video game database',
      setupUrl: 'https://rawg.io/apidocs',
      envVars: ['NEXT_PUBLIC_RAWG_API_KEY']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            API Integration Status
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and test your external API connections
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={checkAllAPIs}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Status</span>
          </button>
          <button
            onClick={runDetailedTests}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <AlertCircle size={16} />
            <span>Run Tests</span>
          </button>
        </div>
      </div>

      {/* API Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apis.map(api => (
          <div key={api.key} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(apiStatus[api.key])}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {api.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getStatusText(apiStatus[api.key])}
                  </p>
                </div>
              </div>
              <a
                href={api.setupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Setup Guide"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {api.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <Key size={12} className="text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  Required: {api.envVars.join(', ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Test Results */}
      {showTestResults && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Detailed Test Results
          </h3>
          
          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-shrink-0 mt-0.5">
                  {result.status === 'testing' && (
                    <RefreshCw size={16} className="animate-spin text-blue-500" />
                  )}
                  {result.status === 'success' && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                  {result.status === 'error' && (
                    <XCircle size={16} className="text-red-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {result.api}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      result.status === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                      result.status === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {result.message}
                  </p>
                  
                  {result.data && result.status === 'success' && (
                    <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded text-xs">
                      <strong>Sample result:</strong> {result.data.title || result.data.name || 'Data received'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Setup Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Quick Setup Guide
        </h3>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <p>1. Copy <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">.env.example</code> to <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">.env.local</code></p>
          <p>2. Get API keys from the external links above</p>
          <p>3. Add your API keys to <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">.env.local</code></p>
          <p>4. Restart your development server</p>
          <p>5. Use the &ldquo;Refresh Status&rdquo; button to verify connections</p>
        </div>
        
        <a
          href="/API_SETUP_GUIDE.md"
          target="_blank"
          className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-3 text-sm font-medium"
        >
          <ExternalLink size={14} />
          <span>View Detailed Setup Guide</span>
        </a>
      </div>
    </div>
  );
};