'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { MapPin, Compass, TrendingUp, Users, Star, Filter, Settings, Navigation, ArrowLeft } from 'lucide-react';
import { List, ItemVotes, User } from '@/types';
import ListCard from '@/components/lists/ListCard';

interface LocalDiscoveryProps {
  userProfile: User;
  setUserProfile?: (profile: User | ((prev: User) => User)) => void;
  allLists: List[];
  itemVotes: ItemVotes;
  onListVote: (listId: number, voteType: 'up' | 'down') => void;
  onItemVote: (listId: number, itemIndex: number, voteType: 'up' | 'down') => void;
  onHighFive: (listId: number) => void;
  onTitleClick?: (title: string) => void;
  onAuthorClick?: (author: string) => void;
  onMessage?: (username: string) => void;
  onItemBookmark?: (listId: number, itemIndex: number) => void;
  bookmarkState?: { [key: string]: boolean };
  savedLists: number[];
  setSavedLists: (lists: number[]) => void;
  onAddComment?: (listId: number, comment: string) => void;
  events?: any[];
  onJoinEvent?: (eventId: string, status: 'going' | 'maybe' | 'not_going') => void;
  onBack?: () => void;
}

type LocalTab = 'nearby' | 'trending' | 'featured' | 'creators';
type DistanceFilter = 'city' | 'metro' | 'state' | 'region';

export default function LocalDiscovery({
  userProfile,
  setUserProfile,
  allLists,
  itemVotes,
  onListVote,
  onItemVote,
  onHighFive,
  onTitleClick,
  onAuthorClick,
  onMessage,
  onItemBookmark,
  bookmarkState = {},
  savedLists,
  setSavedLists,
  onAddComment,
  events,
  onJoinEvent,
  onBack
}: LocalDiscoveryProps) {
  const [selectedTab, setSelectedTab] = useState<LocalTab>('nearby');
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('city');
  const [showLocationSettings, setShowLocationSettings] = useState(true);
  const [userLocation, setUserLocation] = useState<string>(userProfile.homeCity || '');
  const [locationUpdateMessage, setLocationUpdateMessage] = useState<string>('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  
  // Update local location when profile changes
  useEffect(() => {
    const newLocation = userProfile.homeCity || '';
    if (newLocation !== userLocation && newLocation) {
      setUserLocation(newLocation);
      setLocationUpdateMessage(`Location updated to ${newLocation}`);
      // Clear message after 3 seconds
      setTimeout(() => setLocationUpdateMessage(''), 3000);
    }
  }, [userProfile.homeCity, userLocation]);

  // Auto-detect user location using geolocation API
  const detectLocation = useCallback(() => {
    console.log('detectLocation called');
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      alert('Geolocation is not supported by this browser.');
      return;
    }

    console.log('Starting geolocation request');
    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('Position received:', position);
        try {
          const { latitude, longitude } = position.coords;
          console.log('Coordinates:', latitude, longitude);

          // Use BigDataCloud API for reverse geocoding
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (response.ok) {
            const data = await response.json();
            const city = data.city || data.locality || data.principalSubdivision;
            const countryCode = data.countryCode;
            
            if (city) {
              const locationString = countryCode ? `${city}, ${countryCode}` : city;
              setUserLocation(locationString);
              
              // Update the user profile with detected location
              if (setUserProfile) {
                setUserProfile(prev => ({
                  ...prev,
                  homeCity: locationString
                }));
              }
              
              setLocationUpdateMessage(`Location detected: ${locationString}`);
              setTimeout(() => setLocationUpdateMessage(''), 3000);
            } else {
              alert('Could not determine your city from your location.');
            }
          } else {
            alert('Failed to get location details. Please enter manually.');
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          alert('Failed to get location details. Please enter manually.');
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsDetectingLocation(false);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied. Please enable location services and try again.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out.');
            break;
          default:
            alert('An unknown error occurred while retrieving location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }
    );
  }, [setUserProfile]);

  // Auto-detect location on first mount if no location is set (disabled - user should manually choose)
  // useEffect(() => {
  //   if (!userLocation && !userProfile.homeCity) {
  //     detectLocation();
  //   }
  // }, [detectLocation, userLocation, userProfile.homeCity]);
  
  // Mock location data for demonstration
  const mockUserLocations = useMemo((): { [key: string]: string } => ({
    '@moviebuff': 'Los Angeles, CA',
    '@musiclover': 'Austin, TX',
    '@bookworm': 'Portland, OR',
    '@techguru': 'San Francisco, CA',
    '@foodie': 'San Francisco, CA',
    '@traveler': 'Seattle, WA',
    '@photographer': 'Los Angeles, CA',
    '@writer': 'Portland, OR',
    // Boston users
    '@bostonexplorer': 'Boston, MA',
    '@beantown_foodie': 'Boston, MA',
    '@harvard_grad': 'Cambridge, MA',
    '@patriots_fan': 'Boston, MA',
    '@south_end_local': 'Boston, MA',
    '@beacon_hill_guide': 'Boston, MA',
    '@bostonfoodie': 'Boston, US',
    '@redsoxfan': 'Boston, US',
    '@bostoneats': 'Boston, US',
    '@historyboston': 'Boston, US',
    '@cambridgestudent': 'Cambridge, US',
    '@bostonfilmbuff': 'Boston, US',
    '@bostonshopper': 'Boston, US',
    '@bostonmusic': 'Boston, US',
    '@beerboston': 'Boston, US',
    '@bostontechie': 'Boston, US',
    '@bostonrunner': 'Boston, US',
    '@bostontv': 'Boston, US',
    '@bostonart': 'Boston, US',
    '@collegeboston': 'Boston, US',
    '@bostoncoffee': 'Boston, US',
    '@bostonwater': 'Boston, US',
    '@bostonpunk': 'Boston, US',
    '@bostonstudent': 'Boston, US',
    '@bostonwinter': 'Boston, US'
  }), []);

  // Extract user's city and state
  const [userCity, userState] = useMemo(() => {
    if (!userLocation) return ['', ''];
    const parts = userLocation.split(', ');
    return parts.length >= 2 ? [parts[0], parts[1]] : [userLocation, ''];
  }, [userLocation]);

  // Filter lists based on location proximity and genre
  const getLocationFilteredLists = useMemo(() => {
    if (!userLocation) return []; // Show no lists until location is set

    let filtered = allLists.filter(list => {
      const authorLocation = mockUserLocations[list.author] || '';
      if (!authorLocation) return false;

      const [authorCity, authorState] = authorLocation.split(', ');

      switch (distanceFilter) {
        case 'city':
          return authorCity === userCity && authorState === userState;
        case 'metro':
          // Same city or metro area (simplified - same state + major cities)
          const majorCities = ['Los Angeles', 'San Francisco', 'Portland', 'Seattle', 'Austin', 'Boston', 'Cambridge'];
          return authorState === userState && 
            (authorCity === userCity || 
             (majorCities.includes(authorCity) && majorCities.includes(userCity)));
        case 'state':
          return authorState === userState;
        case 'region':
          // West Coast region example
          const westCoast = ['CA', 'OR', 'WA'];
          const southwest = ['CA', 'AZ', 'NV', 'TX'];
          const northeast = ['MA', 'NY', 'CT', 'RI', 'NH', 'VT', 'ME'];
          const userRegion = westCoast.includes(userState) ? westCoast : 
                           southwest.includes(userState) ? southwest :
                           northeast.includes(userState) ? northeast : [userState];
          return userRegion.includes(authorState);
        default:
          return true;
      }
    });

    // Filter by selected genre if one is selected
    if (selectedGenre) {
      const genreKeywords: { [key: string]: string[] } = {
        'bars': ['bar', 'pub', 'brewery', 'cocktail', 'drink', 'nightlife', 'beer'],
        'restaurants': ['restaurant', 'food', 'dining', 'cafe', 'pizza', 'burger', 'cuisine'],
        'colleges': ['college', 'university', 'campus', 'student', 'education', 'school'],
        'shopping': ['shop', 'store', 'mall', 'market', 'boutique', 'retail'],
        'sight seeing': ['tourist', 'attraction', 'landmark', 'historic', 'monument', 'scenic', 'view'],
        'museums': ['museum', 'gallery', 'art', 'exhibit', 'culture', 'history']
      };
      
      const keywords = genreKeywords[selectedGenre] || [];
      filtered = filtered.filter(list => 
        keywords.some(keyword => 
          list.title.toLowerCase().includes(keyword) ||
          list.description.toLowerCase().includes(keyword) ||
          list.items.some(item => item.toLowerCase().includes(keyword))
        )
      );
    }

    return filtered;
  }, [allLists, userLocation, userCity, userState, distanceFilter, selectedGenre, mockUserLocations]);

  // Get trending local lists (most votes/saves in last week)
  const getTrendingLists = useMemo(() => {
    return getLocationFilteredLists
      .sort((a, b) => (b.upvotes + b.saves) - (a.upvotes + a.saves))
      .slice(0, 10);
  }, [getLocationFilteredLists]);

  // Get featured local creators
  const getFeaturedCreators = useMemo(() => {
    const creatorStats = getLocationFilteredLists.reduce((acc, list) => {
      if (!acc[list.author]) {
        acc[list.author] = { 
          author: list.author, 
          lists: 0, 
          totalVotes: 0, 
          totalSaves: 0,
          location: mockUserLocations[list.author] || ''
        };
      }
      acc[list.author].lists++;
      acc[list.author].totalVotes += list.upvotes + list.downvotes;
      acc[list.author].totalSaves += list.saves;
      return acc;
    }, {} as { [key: string]: any });

    return Object.values(creatorStats)
      .sort((a: any, b: any) => (b.totalVotes + b.totalSaves) - (a.totalVotes + a.totalSaves))
      .slice(0, 6);
  }, [getLocationFilteredLists, mockUserLocations]);

  const handleSaveList = (listId: number) => {
    setSavedLists(
      savedLists.includes(listId) 
        ? savedLists.filter(id => id !== listId)
        : [...savedLists, listId]
    );
  };


  const distanceLabels = {
    city: `Same city (${userCity})`,
    metro: `Metro area (${userCity} region)`,
    state: `Same state (${userState})`,
    region: 'Regional area'
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'nearby':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Lists Near You
              </h3>
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(e.target.value as DistanceFilter)}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="city">{distanceLabels.city}</option>
                  <option value="metro">{distanceLabels.metro}</option>
                  <option value="state">{distanceLabels.state}</option>
                  <option value="region">{distanceLabels.region}</option>
                </select>
              </div>
            </div>
            
            {getLocationFilteredLists.length > 0 ? (
              <div className="space-y-6">
                {getLocationFilteredLists.slice(0, 10).map(list => (
                  <div key={list.id}>
                    <ListCard
                      list={list}
                      itemVotes={itemVotes[list.id.toString()] || {}}
                      onListVote={onListVote}
                      onItemVote={onItemVote}
                      onHighFive={onHighFive}
                      onTitleClick={onTitleClick}
                      onAuthorClick={onAuthorClick}
                      onMessage={onMessage}
                      onItemBookmark={onItemBookmark}
                      bookmarkState={bookmarkState}
                      onSaveList={handleSaveList}
                      isSaved={savedLists.includes(list.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {!userLocation ? 'Set your location to discover local lists' : 'No local lists found'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {!userLocation
                    ? 'Enter your city in the location settings above to see lists from people near you'
                    : 'Try expanding your search radius or check back later'
                  }
                </p>
                {!userLocation ? (
                  <button
                    onClick={() => setShowLocationSettings(true)}
                    className="btn-primary bg-green-600 hover:bg-green-700"
                  >
                    Set Location
                  </button>
                ) : (
                  <button
                    onClick={() => setDistanceFilter('region')}
                    className="btn-primary"
                  >
                    Expand to Regional
                  </button>
                )}
              </div>
            )}
          </div>
        );

      case 'trending':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <TrendingUp size={20} />
              <span>Trending in {userCity}</span>
            </h3>
            
            <div className="space-y-6">
              {getTrendingLists.map(list => (
                <div key={list.id} className="relative">
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center space-x-1">
                    <TrendingUp size={12} />
                    <span>Trending</span>
                  </div>
                  <ListCard
                    list={list}
                    itemVotes={itemVotes[list.id.toString()] || {}}
                    onListVote={onListVote}
                    onItemVote={onItemVote}
                    onHighFive={onHighFive}
                    onTitleClick={onTitleClick}
                    onAuthorClick={onAuthorClick}
                    onMessage={onMessage}
                    onItemBookmark={onItemBookmark}
                    bookmarkState={bookmarkState}
                    onSaveList={handleSaveList}
                    isSaved={savedLists.includes(list.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'featured':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Star size={20} />
              <span>Featured Local Creators</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFeaturedCreators.map((creator: any) => (
                <div key={creator.author} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {creator.author.charAt(1).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {creator.author}
                        </h4>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin size={12} />
                          <span>{creator.location}</span>
                        </div>
                      </div>
                    </div>
                    <Star size={16} className="text-yellow-500" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">{creator.lists}</div>
                      <div className="text-gray-500">Lists</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">{creator.totalVotes}</div>
                      <div className="text-gray-500">Votes</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">{creator.totalSaves}</div>
                      <div className="text-gray-500">Saves</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => onAuthorClick?.(creator.author)}
                      className="flex-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => onMessage?.(creator.author)}
                      className="flex-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'creators':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Star size={20} />
              <span>Featured Local Creators</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFeaturedCreators.map((creator: any) => (
                <div key={creator.author} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {creator.author.charAt(1).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {creator.author}
                        </h4>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin size={12} />
                          <span>{creator.location}</span>
                        </div>
                      </div>
                    </div>
                    <Star size={16} className="text-yellow-500" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">{creator.lists}</div>
                      <div className="text-gray-500">Lists</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">{creator.totalVotes}</div>
                      <div className="text-gray-500">Votes</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 dark:text-white">{creator.totalSaves}</div>
                      <div className="text-gray-500">Saves</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => onAuthorClick?.(creator.author)}
                      className="flex-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => onMessage?.(creator.author)}
                      className="flex-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Content coming soon...</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
            <Compass className="text-green-500" />
            <span>Local Discovery</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-1">
            <MapPin size={16} />
            <span>Discover great lists from people near {userLocation || 'you'}</span>
          </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowLocationSettings(!showLocationSettings)}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Location settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Location Update Message */}
      {locationUpdateMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 flex items-center space-x-2">
          <MapPin size={16} className="text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-700 dark:text-green-300">{locationUpdateMessage}</span>
        </div>
      )}

      {/* Location Settings */}
      {showLocationSettings && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="mb-3">
            <button
              onClick={() => {
                console.log('Detect Location button clicked');
                detectLocation();
              }}
              disabled={isDetectingLocation}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isDetectingLocation ? 'Detecting...' : 'Detect Location'}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              placeholder="Enter your city, state"
              className="flex-1 px-3 py-2 border border-green-300 dark:border-green-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            />
            <button
              onClick={() => {
                // Update the user profile with new location
                if (setUserProfile && userLocation !== userProfile.homeCity) {
                  setUserProfile(prev => ({
                    ...prev,
                    homeCity: userLocation
                  }));
                  setLocationUpdateMessage(`Location updated to ${userLocation}`);
                  setTimeout(() => setLocationUpdateMessage(''), 3000);
                }
                setShowLocationSettings(false);
              }}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {[
          { id: 'nearby', label: 'Near You', icon: MapPin },
          { id: 'featured', label: 'Local Creators', icon: Star }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedTab(id as LocalTab)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
              selectedTab === id
                ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Local Genre Buttons */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        {[
          { id: 'bars', label: 'Bars', emoji: '🍻' },
          { id: 'restaurants', label: 'Restaurants', emoji: '🍽️' },
          { id: 'colleges', label: 'Colleges', emoji: '🎓' },
          { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
          { id: 'sight seeing', label: 'Sight Seeing', emoji: '👁️' },
          { id: 'museums', label: 'Museums', emoji: '🏛️' }
        ].map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setSelectedGenre(selectedGenre === id ? '' : id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedGenre === id
                ? 'bg-green-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}