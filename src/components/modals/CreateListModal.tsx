'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Search, MapPin, Loader2 } from 'lucide-react';
import { List } from '@/types';
import { categories, categoryEmojis } from '@/data/mockData';
import { secureApiService } from '@/services/secureApiService';
import SmartSearch from '@/components/search/SmartSearch';
import { LoadingButton, SearchResultsSkeleton } from '@/components/ui/LoadingStates';
import { ModalErrorBoundary, SearchErrorBoundary } from '@/components/ui/ErrorBoundaries';

interface CreateListModalProps {
  setShowNewListForm: (show: boolean) => void;
  allLists: List[];
  setAllLists: (lists: List[]) => void;
}

export default function CreateListModal({ 
  setShowNewListForm, 
  allLists, 
  setAllLists 
}: CreateListModalProps) {
  const [step, setStep] = useState<'category' | 'details'>('category');
  const [newListTitle, setNewListTitle] = useState('');
  const [newListCategory, setNewListCategory] = useState('');
  const [newListItems, setNewListItems] = useState(['', '', '', '', '']);
  const [newListDescription, setNewListDescription] = useState('');
  const [isNSFW, setIsNSFW] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  
  // Geolocation states
  const [location, setLocation] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showLocationField, setShowLocationField] = useState(false);
  
  // Autofill states
  const [suggestions, setSuggestions] = useState<{ [key: number]: any[] }>({});
  const [showSuggestions, setShowSuggestions] = useState<{ [key: number]: boolean }>({});
  const [searchTimeouts, setSearchTimeouts] = useState<{ [key: number]: NodeJS.Timeout }>({});
  const [loadingSuggestions, setLoadingSuggestions] = useState<{ [key: number]: boolean }>({});
  const [isCreatingList, setIsCreatingList] = useState(false);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  
  // Subject auto-fill states
  const [subjectSuggestions, setSubjectSuggestions] = useState<any[]>([]);
  const [showSubjectSuggestions, setShowSubjectSuggestions] = useState(false);
  const [subjectSearchTimeout, setSubjectSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loadingSubjectSuggestions, setLoadingSubjectSuggestions] = useState(false);
  
  // Wikipedia auto-fill states
  const [wikipediaSuggestions, setWikipediaSuggestions] = useState<any[]>([]);
  const [showWikipediaSuggestions, setShowWikipediaSuggestions] = useState(false);
  const [wikipediaSearchTimeout, setWikipediaSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loadingWikipediaSuggestions, setLoadingWikipediaSuggestions] = useState(false);
  
  // Check if category is location-related
  const isLocationCategory = (category: string) => {
    const locationCategories = ['Travel', 'Food', 'Art', 'Events', 'Photography'];
    return locationCategories.includes(category);
  };
  
  // Check if category has API support
  const hasApiSupport = (category: string) => {
    const supportedCategories = ['Movies', 'TV Shows', 'Books', 'Games', 'Music', 'Podcasts'];
    return supportedCategories.includes(category);
  };
  
  // Handle category change to show/hide location field
  useEffect(() => {
    setShowLocationField(isLocationCategory(newListCategory));
  }, [newListCategory]);
  
  // Get user's current location
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }
    
    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get location name
          // For demo purposes, we'll use a simple format
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          const locationString = `${data.city || data.locality || 'Unknown City'}, ${data.principalSubdivision || data.countryName || 'Unknown'}`;
          setLocation(locationString);
        } catch (error) {
          // Fallback to coordinates if geocoding fails
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLoadingLocation(false);
        alert('Unable to retrieve your location. Please enter it manually.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  const handleItemChange = (index: number, value: string) => {
    const updatedItems = [...newListItems];
    updatedItems[index] = value;
    setNewListItems(updatedItems);
    
    // Clear existing timeout for this input
    if (searchTimeouts[index]) {
      clearTimeout(searchTimeouts[index]);
    }
    
    // Hide suggestions if input is empty
    if (!value.trim()) {
      setShowSuggestions(prev => ({ ...prev, [index]: false }));
      setSuggestions(prev => ({ ...prev, [index]: [] }));
      return;
    }
    
    // Set new timeout to search APIs
    const timeout = setTimeout(async () => {
      try {
        setLoadingSuggestions(prev => ({ ...prev, [index]: true }));
        // Search using appropriate API based on category
        const results = await secureApiService.searchByCategory(value, newListCategory, 5);
        const formattedResults = secureApiService.formatSearchResults(results, newListCategory);
        setSuggestions(prev => ({ ...prev, [index]: formattedResults }));
        setShowSuggestions(prev => ({ ...prev, [index]: formattedResults.length > 0 }));
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoadingSuggestions(prev => ({ ...prev, [index]: false }));
      }
    }, 300); // Debounce search by 300ms
    
    setSearchTimeouts(prev => ({ ...prev, [index]: timeout }));
  };

  const handleSuggestionSelect = (index: number, suggestion: any) => {
    const title = suggestion.title || suggestion.name || '';
    const updatedItems = [...newListItems];
    updatedItems[index] = title;
    setNewListItems(updatedItems);
    setShowSuggestions(prev => ({ ...prev, [index]: false }));
    setSuggestions(prev => ({ ...prev, [index]: [] }));
  };

  // Handle subject title change with auto-suggestions
  const handleSubjectChange = (value: string) => {
    setNewListTitle(value);
    
    // Clear existing timeouts
    if (subjectSearchTimeout) {
      clearTimeout(subjectSearchTimeout);
    }
    if (wikipediaSearchTimeout) {
      clearTimeout(wikipediaSearchTimeout);
    }
    
    // Hide suggestions if input is empty
    if (!value.trim()) {
      setShowSubjectSuggestions(false);
      setSubjectSuggestions([]);
      setShowWikipediaSuggestions(false);
      setWikipediaSuggestions([]);
      return;
    }
    
    // If category has API support, use specific API
    if (hasApiSupport(newListCategory)) {
      const timeout = setTimeout(async () => {
        try {
          setLoadingSubjectSuggestions(true);
          const results = await secureApiService.searchByCategory(value, newListCategory, 8);
          const formattedResults = secureApiService.formatSearchResults(results, newListCategory);
          setSubjectSuggestions(formattedResults);
          setShowSubjectSuggestions(formattedResults.length > 0);
        } catch (error) {
          console.error('Subject search failed:', error);
        } finally {
          setLoadingSubjectSuggestions(false);
        }
      }, 300);
      setSubjectSearchTimeout(timeout);
    } else {
      // Use Wikipedia for categories without specific APIs
      const timeout = setTimeout(async () => {
        try {
          setLoadingWikipediaSuggestions(true);
          const results = await searchWikipedia(value);
          setWikipediaSuggestions(results);
          setShowWikipediaSuggestions(results.length > 0);
        } catch (error) {
          console.error('Wikipedia search failed:', error);
        } finally {
          setLoadingWikipediaSuggestions(false);
        }
      }, 300);
      setWikipediaSearchTimeout(timeout);
    }
  };

  const handleSubjectSuggestionSelect = (suggestion: any) => {
    const title = suggestion.title || suggestion.name || '';
    setNewListTitle(title);
    setShowSubjectSuggestions(false);
    setSubjectSuggestions([]);
  };

  const handleWikipediaSuggestionSelect = (suggestion: any) => {
    setNewListTitle(suggestion.title);
    setShowWikipediaSuggestions(false);
    setWikipediaSuggestions([]);
  };

  // Wikipedia search function
  const searchWikipedia = async (query: string) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=5`
      );
      const data = await response.json();
      
      return data.query?.search?.map((result: any) => ({
        title: result.title,
        description: result.snippet?.replace(/<[^>]*>/g, ''), // Remove HTML tags
        id: result.pageid
      })) || [];
    } catch (error) {
      console.error('Wikipedia search failed:', error);
      return [];
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(searchTimeouts).forEach(clearTimeout);
      if (subjectSearchTimeout) {
        clearTimeout(subjectSearchTimeout);
      }
      if (wikipediaSearchTimeout) {
        clearTimeout(wikipediaSearchTimeout);
      }
    };
  }, [searchTimeouts, subjectSearchTimeout, wikipediaSearchTimeout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingList(true);
    
    if (!newListTitle.trim() || !newListCategory || newListItems.some(item => !item.trim())) {
      alert('Please fill in all required fields');
      setIsCreatingList(false);
      return;
    }

    const newList: List = {
      id: Math.max(...allLists.map(l => l.id), 0) + 1,
      title: `If you like "${newListTitle}", try these 5...`,
      author: '@graz',
      category: newListCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
      votes: 0,
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      highFives: 0,
      userHighFived: false,
      items: newListItems.filter(item => item.trim()),
      description: newListDescription.trim() || `Great recommendations similar to ${newListTitle}${location && showLocationField ? ` in ${location}` : ''}`,
      comments: [],
      saves: 0,
      isRejected: false,
      isNSFW: isNSFW,
      isOrdered: isOrdered
    };

    setAllLists([newList, ...allLists]);
    setShowNewListForm(false);
    
    // Reset form
    setNewListTitle('');
    setNewListCategory('');
    setNewListItems(['', '', '', '', '']);
    setNewListDescription('');
    setIsNSFW(false);
    setIsOrdered(false);
    setLocation('');
    setShowLocationField(false);
    setIsCreatingList(false);
  };

  const handleClose = () => {
    setShowNewListForm(false);
    setStep('category');
    setNewListCategory('');
    setNewListTitle('');
    setNewListItems(['', '', '', '', '']);
    setNewListDescription('');
    setLocation('');
  };

  const handleCategorySelect = (category: string) => {
    setNewListCategory(category);
    setStep('details');
  };

  return (
    <ModalErrorBoundary>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowNewListForm(false);
          }
        }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {step === 'category' ? 'Choose a Category' : 'Create New List'}
              </h2>
              {step === 'details' && (
                <button
                  type="button"
                  onClick={() => setStep('category')}
                  className="text-sm text-green-600 dark:text-green-400 hover:underline mt-1"
                >
                  ← Back to categories
                </button>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {step === 'category' ? (
            // Step 1: Category Selection
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Select a category to enable smart search suggestions for your recommendations
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group"
                  >
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {categoryEmojis[category] || '📝'}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Step 2: List Details
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Category Display */}
              <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-2xl">{categoryEmojis[newListCategory]}</span>
                <span className="font-medium text-green-700 dark:text-green-300">
                  {newListCategory} List
                </span>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  If you like...
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    onFocus={() => {
                      if (hasApiSupport(newListCategory) && subjectSuggestions.length > 0) {
                        setShowSubjectSuggestions(true);
                      } else if (!hasApiSupport(newListCategory) && wikipediaSuggestions.length > 0) {
                        setShowWikipediaSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setShowSubjectSuggestions(false);
                        setShowWikipediaSuggestions(false);
                      }, 200);
                    }}
                    placeholder={`e.g., ${newListCategory === 'Music' ? 'The Beatles' : newListCategory === 'Movies' ? 'The Matrix' : newListCategory === 'Books' ? 'Harry Potter' : newListCategory === 'Games' ? 'Stardew Valley' : newListCategory === 'Podcasts' ? 'The Joe Rogan Experience' : newListCategory === 'Photography' ? 'Annie Leibovitz' : newListCategory === 'Art' ? 'Pablo Picasso' : 'Something great'}${hasApiSupport(newListCategory) ? ' (smart suggestions)' : ' (Wikipedia search)'}`}
                    className="input-field pr-10"
                    required
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  
                  {/* Loading Subject Suggestions */}
                  {(loadingSubjectSuggestions || loadingWikipediaSuggestions) && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      <div className="p-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">
                          {loadingWikipediaSuggestions ? 'Searching Wikipedia...' : 'Searching...'}
                        </p>
                        <SearchResultsSkeleton count={3} />
                      </div>
                    </div>
                  )}

                  {/* API-based Subject Auto-suggestions */}
                  {showSubjectSuggestions && !loadingSubjectSuggestions && subjectSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      {subjectSuggestions.map((suggestion, suggestionIndex) => {
                        const title = suggestion.title || suggestion.name || '';
                        const year = suggestion.year || suggestion.release_date?.split('-')[0] || suggestion.first_air_date?.split('-')[0];
                        const mediaType = suggestion.type ? suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1) : 'Item';
                        const subType = suggestion.musicType ? ` (${suggestion.musicType})` : '';
                        const authors = suggestion.authors ? ` by ${suggestion.authors.join(', ')}` : '';
                        
                        return (
                          <div
                            key={suggestion.id}
                            onClick={() => handleSubjectSuggestionSelect(suggestion)}
                            className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                          >
                            <div className="flex-shrink-0 w-12 h-16 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden mr-3">
                              {(suggestion.poster_path || suggestion.image) ? (
                                <Image
                                  src={suggestion.image || `https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                                  alt={title}
                                  width={48}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-white truncate">
                                {title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {year && `${year} • `}{mediaType}{subType}{authors}
                              </div>
                              {(suggestion.overview || suggestion.description) && (
                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">
                                  {((suggestion.description || suggestion.overview) || '').length > 80 
                                    ? `${(suggestion.description || suggestion.overview).substring(0, 80)}...` 
                                    : (suggestion.description || suggestion.overview)}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Wikipedia Subject Auto-suggestions */}
                  {showWikipediaSuggestions && !loadingWikipediaSuggestions && wikipediaSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      <div className="p-2">
                        <p className="text-xs text-blue-600 dark:text-blue-400 mb-2 px-2 flex items-center">
                          <span className="mr-1">📖</span> Wikipedia suggestions
                        </p>
                        {wikipediaSuggestions.map((suggestion, suggestionIndex) => (
                          <div
                            key={suggestion.id}
                            onClick={() => handleWikipediaSuggestionSelect(suggestion)}
                            className="flex items-start p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3 mt-1">
                              <span className="text-blue-600 dark:text-blue-400 text-lg">📖</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-white truncate">
                                {suggestion.title}
                              </div>
                              {suggestion.description && (
                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">
                                  {suggestion.description.length > 120 
                                    ? `${suggestion.description.substring(0, 120)}...` 
                                    : suggestion.description}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            {/* Location Field (for location-based categories) */}
            {showLocationField && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location (Optional)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location or click to detect..."
                    className="input-field flex-1"
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap"
                    title="Get current location"
                  >
                    {isLoadingLocation ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <MapPin size={16} />
                    )}
                    {isLoadingLocation ? (
                      <span className="hidden sm:inline">Loading...</span>
                    ) : (
                      <span className="hidden sm:inline">Detect</span>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Add location context for {newListCategory.toLowerCase()} recommendations
                </p>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your 5 Recommendations
              </label>
              <div className="space-y-3">
                {newListItems.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="relative">
                      <input
                        ref={el => { if (el) inputRefs.current[index] = el; }}
                        type="text"
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                        onFocus={() => {
                          if (suggestions[index]?.length > 0) {
                            setShowSuggestions(prev => ({ ...prev, [index]: true }));
                          }
                        }}
                        onBlur={() => {
                          // Delay hiding suggestions to allow clicks
                          setTimeout(() => {
                            setShowSuggestions(prev => ({ ...prev, [index]: false }));
                          }, 200);
                        }}
                        placeholder={`Recommendation ${index + 1}${hasApiSupport(newListCategory) ? ' (smart suggestions enabled)' : ''}`}
                        className="input-field pr-10"
                        required
                      />
                      {hasApiSupport(newListCategory) && (
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    
                    {/* Loading Suggestions */}
                    {loadingSuggestions[index] && (
                      <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        <div className="p-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">Searching...</p>
                          <SearchResultsSkeleton count={3} />
                        </div>
                      </div>
                    )}

                    {/* Autofill Suggestions */}
                    {showSuggestions[index] && !loadingSuggestions[index] && suggestions[index]?.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto">
                        {suggestions[index].map((suggestion, suggestionIndex) => {
                          const title = suggestion.title || suggestion.name || '';
                          const year = suggestion.year || suggestion.release_date?.split('-')[0] || suggestion.first_air_date?.split('-')[0];
                          const mediaType = suggestion.type ? suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1) : 'Item';
                          const subType = suggestion.musicType ? ` (${suggestion.musicType})` : '';
                          
                          return (
                            <div
                              key={suggestion.id}
                              onClick={() => handleSuggestionSelect(index, suggestion)}
                              className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                            >
                              <div className="flex-shrink-0 w-12 h-16 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden mr-3">
                                {(suggestion.poster_path || suggestion.image) ? (
                                  <Image
                                    src={suggestion.image || `https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                                    alt={title}
                                    width={48}
                                    height={64}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                    No Image
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 dark:text-white truncate">
                                  {title}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {year && `${year} • `}{mediaType}{subType}
                                </div>
                                {(suggestion.overview || suggestion.description) && (
                                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">
                                    {((suggestion.description || suggestion.overview) || '').length > 80 
                                      ? `${(suggestion.description || suggestion.overview).substring(0, 80)}...` 
                                      : (suggestion.description || suggestion.overview)}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Why you&apos;ll love these (Optional)
              </label>
              <textarea
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
                placeholder="Help others understand what makes these recommendations special and why they connect to your source"
                className="input-field min-h-[100px] resize-y"
              />
            </div>

            {/* Ordering Option */}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Show items as ranked list (1st, 2nd, 3rd...)
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Enable this if the order matters (like &ldquo;Top 5 movies to watch first&rdquo; vs &ldquo;5 great coffee shops&rdquo;)
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={isOrdered}
                  onChange={(e) => setIsOrdered(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* NSFW Option */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mark as NSFW (Not Safe For Work)
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Lists containing mature themes, adult content, or potentially sensitive material should be marked as NSFW
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={isNSFW}
                  onChange={(e) => setIsNSFW(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
              </label>
            </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-4">
                <LoadingButton
                  type="submit"
                  loading={isCreatingList}
                  className="flex-1 btn-primary py-3 text-base font-medium"
                >
                  Publish List
                </LoadingButton>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 btn-secondary py-3 text-base font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        </div>
      </div>
      </div>
    </ModalErrorBoundary>
  );
}