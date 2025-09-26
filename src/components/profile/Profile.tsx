'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Edit, Trophy, Users, Bookmark, Plus, Camera, X, ChevronDown, ChevronUp, Target, Calendar, User as UserIcon, BarChart3, HelpCircle, MapPin, MessageCircle, ArrowLeft, UserPlus, UserMinus } from 'lucide-react';
import { User, List, ItemVotes } from '@/types';
import { categories, achievements as allAchievements } from '@/data/mockData';
import ListCard from '@/components/lists/ListCard';
import { BadgeList } from '@/components/badges/Badge';
import CreatorAnalytics from '@/components/analytics/CreatorAnalytics';
import { ProfileErrorBoundary, ListErrorBoundary } from '@/components/ui/ErrorBoundaries';

interface ProfileProps {
  userProfile: User;
  setUserProfile: (profile: User) => void;
  highFiveData: {
    totalHighFives: number;
    weeklyUsed: number;
    weeklyLimit: number;
    lastResetDate: string;
  };
  allLists: List[];
  itemVotes: ItemVotes;
  onListVote: (listId: number, voteType: 'up' | 'down') => void;
  onItemVote: (listId: number, itemIndex: number, voteType: 'up' | 'down') => void;
  onHighFive: (listId: number) => void;
  onTitleClick?: (title: string) => void;
  onNavigateToDiscover?: () => void;
  savedLists: number[];
  setSavedLists: (lists: number[]) => void;
  followedUsers?: string[];
  onFollowUser?: (username: string) => void;
  onCreateSeasonalList?: (reminder: any) => void;
  onClaimReward?: (rewardId: string) => void;
  onOpenMessage?: (username: string) => void;
  onAuthorClick?: (author: string) => void;
  viewingProfile?: string;
  onBack?: () => void;
  antiSocialMode?: boolean;
}

const avatarOptions = ['⭐', '🎵', '📚', '🎬', '🎮', '💻', '🎨', '⚽', '🍕', '✈️'];

export default function Profile({
  userProfile,
  setUserProfile,
  highFiveData,
  allLists,
  itemVotes,
  onListVote,
  onItemVote,
  onHighFive,
  onTitleClick,
  onNavigateToDiscover,
  savedLists,
  setSavedLists,
  followedUsers = [],
  onFollowUser,
  onCreateSeasonalList,
  onClaimReward,
  onOpenMessage,
  onAuthorClick,
  viewingProfile,
  onBack,
  antiSocialMode = false
}: ProfileProps) {
  // All hooks must be declared before any early returns
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showEarned, setShowEarned] = useState(true);
  const [showLocked, setShowLocked] = useState(true);
  const [selectedMyListsGenre, setSelectedMyListsGenre] = useState<string>('');
  const [showAllMyLists, setShowAllMyLists] = useState(true);
  const [showUserLists, setShowUserLists] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize editForm state (needs to be here with other hooks)
  const [editForm, setEditForm] = useState({
    bio: userProfile?.bio || '',
    avatar: userProfile?.avatar || '',
    selectedGenres: userProfile?.selectedGenres || [],
    avatarImage: userProfile?.avatarImage || null,
    pronouns: userProfile?.pronouns || '',
    homeCity: userProfile?.homeCity || '',
    birthday: userProfile?.birthday || '',
    email: userProfile?.email || '',
    gender: userProfile?.gender || ''
  });

  // Early return if userProfile is null/undefined
  if (!userProfile) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Profile Not Found</h2>
        <p className="text-gray-600 mb-4">Unable to load profile information.</p>
        <button
          onClick={onBack || (() => {})}
          className="btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  // Evaluate achievements based on user stats - with extra safety
  console.log('allAchievements:', allAchievements);
  console.log('userProfile.stats:', userProfile.stats);

  const achievements = (allAchievements || []).map(achievement => ({
    ...achievement,
    earned: userProfile?.stats && achievement?.condition ?
      (() => {
        try {
          return achievement.condition(userProfile.stats);
        } catch (error) {
          console.error('Error in achievement condition:', error, achievement);
          return false;
        }
      })() : false
  }));

  // Filter user's created lists (dynamic based on current profile being viewed)
  const userLists = (allLists || []).filter(list => list.author === `@${userProfile?.username || ''}`);
  const filteredUserLists = selectedMyListsGenre
    ? userLists.filter(list => list.category === selectedMyListsGenre)
    : userLists;

  const handleSaveList = (listId: number) => {
    setSavedLists(
      savedLists.includes(listId) 
        ? savedLists.filter(id => id !== listId)
        : [...savedLists, listId]
    );
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use reverse geocoding to get city name
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (response.ok) {
            const data = await response.json();
            const city = data.city || data.locality;
            const countryCode = data.countryCode;
            
            if (city) {
              const locationString = countryCode ? `${city}, ${countryCode}` : city;
              setEditForm({
                ...editForm,
                homeCity: locationString
              });
            } else {
              alert('Could not determine your city from your location.');
            }
          } else {
            alert('Failed to get location details. Please enter manually.');
          }
        } catch (error) {
          console.error('Error getting location details:', error);
          alert('Error getting location details. Please enter manually.');
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied. Please enable location permissions and try again.');
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
        maximumAge: 300000 // Cache for 5 minutes
      }
    );
  };


  const handleSaveProfile = () => {
    setUserProfile({
      ...userProfile,
      bio: editForm.bio,
      avatar: editForm.avatar,
      selectedGenres: editForm.selectedGenres,
      avatarImage: editForm.avatarImage,
      pronouns: editForm.pronouns,
      homeCity: editForm.homeCity,
      birthday: editForm.birthday,
      email: editForm.email,
      gender: editForm.gender
    });
    setShowEditProfile(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          alert('Canvas not supported');
          return;
        }

        const size = 200;
        canvas.width = size;
        canvas.height = size;
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        ctx.save();
        
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
        ctx.clip();
        
        const scale = Math.min(size / img.width, size / img.height) * 0.9;
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        
        const x = (size - scaledWidth) / 2;
        const y = (size - scaledHeight) / 2;
        
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        ctx.restore();
        
        const processedImage = canvas.toDataURL('image/jpeg', 0.9);
        
        setEditForm({
          ...editForm,
          avatarImage: processedImage
        });
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.readAsDataURL(file);
  };

  const toggleGenre = (genre: string) => {
    if (editForm.selectedGenres.includes(genre)) {
      setEditForm({
        ...editForm,
        selectedGenres: editForm.selectedGenres.filter(g => g !== genre)
      });
    } else if (editForm.selectedGenres.length < 10) {
      setEditForm({
        ...editForm,
        selectedGenres: [...editForm.selectedGenres, genre]
      });
    }
  };

  return (
    <ProfileErrorBoundary username={userProfile.username}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Enhanced Profile Header with White Background */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="p-8 relative">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="absolute top-4 right-4 flex space-x-2">
              {/* Show Analytics button only for own profile */}
              {!viewingProfile && (
                <button
                  onClick={() => setShowAnalytics(true)}
                  className="bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <BarChart3 size={16} className="text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Analytics</span>
                </button>
              )}
              
              {/* Show Message and Follow buttons when viewing other users' profiles */}
              {viewingProfile && (
                <>
                  {onOpenMessage && (
                    <button
                      onClick={() => onOpenMessage(userProfile.username)}
                      className="bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <MessageCircle size={16} className="text-primary-600 dark:text-primary-400" />
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Message</span>
                    </button>
                  )}
                  
                  {onFollowUser && (
                    <button
                      onClick={() => onFollowUser(userProfile.username)}
                      className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                        followedUsers.includes(`@${userProfile.username}`)
                          ? 'bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800'
                          : 'bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800'
                      }`}
                    >
                      {followedUsers.includes(`@${userProfile.username}`) ? (
                        <>
                          <UserMinus size={16} className="text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">Unfollow</span>
                        </>
                      ) : (
                        <>
                          <UserPlus size={16} className="text-purple-600 dark:text-purple-400" />
                          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Follow</span>
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
              
              {/* Show Edit Profile button only for own profile */}
              {!viewingProfile && (
                <button
                  onClick={() => {
                    setEditForm({
                      bio: userProfile.bio,
                      avatar: userProfile.avatar,
                      selectedGenres: userProfile.selectedGenres,
                      avatarImage: userProfile.avatarImage,
                      birthday: userProfile.birthday || '',
                      email: userProfile.email || '',
                      gender: userProfile.gender || '',
                      homeCity: userProfile.homeCity || '',
                      pronouns: userProfile.pronouns || ''
                    });
                    setShowEditProfile(true);
                  }}
                  className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Edit size={16} className="text-gray-600 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Edit Profile</span>
                </button>
              )}
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-4 border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-xl">
                  {userProfile.avatarImage ? (
                    <Image src={userProfile.avatarImage} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">{userProfile.avatar}</span>
                  )}
                </div>
                {userProfile.selectedBadge && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-sm shadow-lg border-2 border-gray-300 dark:border-gray-600">
                    {userProfile.selectedBadge.icon}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                  {userProfile.username}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-3 leading-relaxed">
                  {userProfile.bio}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Joined {new Date(userProfile.joinDate).toLocaleDateString('en-US', { 
                        month: 'long',
                        day: 'numeric', 
                        year: 'numeric'
                      })}</span>
                    </div>
                    {userProfile.isEarlyAdopter && (
                      <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                        🚀 Early Adopter
                      </div>
                    )}
                  </div>

                  {/* Pronouns and Home City */}
                  {(userProfile.pronouns || userProfile.homeCity) && (
                    <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm">
                      {userProfile.pronouns && (
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{userProfile.pronouns}</span>
                        </div>
                      )}
                      {userProfile.homeCity && (
                        <button 
                          onClick={() => setShowMapModal(true)}
                          className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span className="underline hover:no-underline transition-all">{userProfile.homeCity}</span>
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* User's Selected Genres - Collapsible */}
                  {userProfile.selectedGenres && userProfile.selectedGenres.length > 0 && (
                    <div>
                      <button
                        onClick={() => setShowGenres(!showGenres)}
                        className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        <span>Interests ({userProfile.selectedGenres.length})</span>
                        {showGenres ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                      {showGenres && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {userProfile.selectedGenres.map(genre => (
                            <span
                              key={genre}
                              className="px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-xs font-medium"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Badge Selection within Profile Header - Only show on own profile */}
            {!viewingProfile && userProfile.badges && userProfile.badges.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Trophy size={16} className="mr-2 text-yellow-500" />
                  Choose Your Featured Badge
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setUserProfile({ ...userProfile, selectedBadge: null })}
                    className={`px-3 py-2 text-sm border rounded-lg transition-all duration-200 ${
                      !userProfile.selectedBadge 
                        ? 'border-green-400 bg-green-50 dark:bg-green-900/20 text-gray-700 dark:text-gray-300 ring-2 ring-green-200 dark:ring-green-700' 
                        : 'border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    No Badge
                  </button>
                  {userProfile.badges.map((badge) => (
                    <button
                      key={badge.id}
                      onClick={() => setUserProfile({ ...userProfile, selectedBadge: badge })}
                      className={`flex items-center space-x-2 px-3 py-2 text-sm border rounded-lg transition-all duration-200 ${
                        userProfile.selectedBadge?.id === badge.id
                          ? 'border-green-400 ring-2 ring-green-200 dark:ring-green-700'
                          : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{badge.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{badge.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setShowStatsModal('following')}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 p-4 rounded-xl transition-all duration-200 border border-blue-200/50 dark:border-blue-700/50"
            >
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{followedUsers.length}</div>
              <div className="text-xs text-primary-700 dark:text-primary-300 font-medium">Following</div>
            </button>
            <button
              onClick={() => setShowStatsModal('followers')}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-900/30 dark:hover:to-purple-800/30 p-4 rounded-xl transition-all duration-200 border border-purple-200/50 dark:border-purple-700/50"
            >
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{userProfile.followers}</div>
              <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">Followers</div>
            </button>
            <button 
              onClick={() => setShowStatsModal('listsCreated')}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/30 dark:hover:to-green-800/30 p-4 rounded-xl transition-all duration-200 border border-green-200/50 dark:border-green-700/50"
            >
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userProfile.stats.listsCreated}</div>
              <div className="text-xs text-green-700 dark:text-green-300 font-medium">Lists Created</div>
            </button>
            <button 
              onClick={() => setShowStatsModal('highFivesGiven')}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-900/30 dark:hover:to-orange-800/30 p-4 rounded-xl transition-all duration-200 border border-orange-200/50 dark:border-orange-700/50"
            >
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{userProfile.stats.highFivesGiven}</div>
              <div className="text-xs text-orange-700 dark:text-orange-300 font-medium">High Fives Given</div>
            </button>
            <button 
              onClick={() => setShowStatsModal('highFivesReceived')}
              className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 hover:from-pink-100 hover:to-pink-200 dark:hover:from-pink-900/30 dark:hover:to-pink-800/30 p-4 rounded-xl transition-all duration-200 border border-pink-200/50 dark:border-pink-700/50"
            >
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{userProfile.stats.highFivesReceived}</div>
              <div className="text-xs text-pink-700 dark:text-pink-300 font-medium">High Fives Received</div>
            </button>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{highFiveData.weeklyLimit - highFiveData.weeklyUsed}</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">High Fives Remaining</div>
            </div>
          </div>
        </div>

        {/* Personal Analytics - Only visible to profile owner */}
        {!viewingProfile && userProfile.analytics && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-blue-500">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
              <span>Your Analytics</span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">Private</span>
            </h3>

            {/* Taste Profile Section */}
            <div className="mb-8">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4 text-sm">📊 Your Taste Profile</h4>
              
              {/* Category Breakdown */}
              <div className="mb-6">
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">Interest Distribution</h5>
                <div className="space-y-2">
                  {Object.entries(userProfile.analytics?.tasteProfile?.categoryBreakdown || {})
                    .sort(([,a], [,b]) => b - a)
                    .map(([category, percentage]) => (
                      <div key={category} className="flex items-center space-x-3">
                        <div className="w-16 text-xs text-gray-600 dark:text-gray-400">{category}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 w-8">{percentage}%</div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Genre Preferences */}
              <div className="mb-6">
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">Top Genre Preferences</h5>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(userProfile.analytics?.tasteProfile?.genrePreferences || {})
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 6)
                    .map(([genre, count]) => (
                      <div key={genre} className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 py-1 rounded-full">
                        <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">{genre}</span>
                        <span className="text-xs text-indigo-500 dark:text-indigo-400 ml-1">({count})</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Voting Patterns */}
              <div>
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">Your Voting Patterns</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="text-xs text-green-700 dark:text-green-300 font-medium mb-2">👍 Most Upvoted</div>
                    {Object.entries(userProfile.analytics?.tasteProfile?.votingPatterns?.upvotesByCategory || {})
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 3)
                      .map(([category, count]) => (
                        <div key={category} className="flex justify-between text-xs text-green-600 dark:text-green-400">
                          <span>{category}</span>
                          <span>{count}</span>
                        </div>
                      ))}
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <div className="text-xs text-red-700 dark:text-red-300 font-medium mb-2">👎 Most Critical</div>
                    {Object.entries(userProfile.analytics?.tasteProfile?.votingPatterns?.downvotesByCategory || {})
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 3)
                      .map(([category, count]) => (
                        <div key={category} className="flex justify-between text-xs text-red-600 dark:text-red-400">
                          <span>{category}</span>
                          <span>{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Influence Tracking Section */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4 text-sm">📈 Your Impact</h4>
              
              {/* Impact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg text-center relative">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">{userProfile.analytics?.influence?.totalSavesReceived || 0}</div>
                  <div className="text-xs text-green-700 dark:text-green-300 flex items-center justify-center space-x-1">
                    <span>Total Saves</span>
                    <button
                      onMouseEnter={() => setHoveredTooltip('totalSaves')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-0.5 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                    >
                      <HelpCircle size={10} />
                    </button>
                  </div>
                  {hoveredTooltip === 'totalSaves' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 w-48">
                      The total number of times people have saved your lists to their personal collections
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg text-center relative">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{userProfile.analytics?.influence?.totalHighFivesReceived || 0}</div>
                  <div className="text-xs text-purple-700 dark:text-purple-300 flex items-center justify-center space-x-1">
                    <span>High Fives</span>
                    <button
                      onMouseEnter={() => setHoveredTooltip('highFives')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-0.5 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                    >
                      <HelpCircle size={10} />
                    </button>
                  </div>
                  {hoveredTooltip === 'highFives' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 w-48">
                      The total number of high fives (appreciation gestures) you&rsquo;ve received from the community
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-3 rounded-lg text-center relative">
                  <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{userProfile.analytics?.influence?.trendsettingScore || 0}</div>
                  <div className="text-xs text-orange-700 dark:text-orange-300 flex items-center justify-center space-x-1">
                    <span>Trendsetter Score</span>
                    <button
                      onMouseEnter={() => setHoveredTooltip('trendsetterScore')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-0.5 text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-200"
                    >
                      <HelpCircle size={10} />
                    </button>
                  </div>
                  {hoveredTooltip === 'trendsetterScore' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 w-48">
                      A score based on how often your lists inspire trends and get discovered before they become popular
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg text-center relative">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{userProfile.analytics?.influence?.firstDiscoveries || 0}</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 flex items-center justify-center space-x-1">
                    <span>First Discoveries</span>
                    <button
                      onMouseEnter={() => setHoveredTooltip('firstDiscoveries')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-0.5 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      <HelpCircle size={10} />
                    </button>
                  </div>
                  {hoveredTooltip === 'firstDiscoveries' && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 w-48">
                      The number of times you were the first person to add an item that later became popular
                    </div>
                  )}
                </div>
              </div>

              {/* Top Performing Lists */}
              <div>
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">🏆 Your Top Performing Lists</h5>
                <div className="space-y-2">
                  {(userProfile.analytics?.influence?.listImpact || []).map((list, index) => (
                    <div key={list.listId} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white text-sm">{list.title}</div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">💾 {list.saves} saves</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">🙏 {list.highFives} high fives</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">🗳️ {list.votes} votes</span>
                          </div>
                        </div>
                        <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements - Redesigned for Clarity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Trophy className="text-yellow-500" size={20} />
              <span>Achievements</span>
            </h3>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {achievements.filter(a => a.earned).length}<span className="text-gray-400">/{achievements.length}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Unlocked</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {Math.round((achievements.filter(a => a.earned).length / achievements.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${(achievements.filter(a => a.earned).length / achievements.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Recent Achievement Highlight */}
          {achievements.some(a => a.earned) && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🏆</div>
                <div>
                  <div className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm">Latest Achievement</div>
                  <div className="text-yellow-700 dark:text-yellow-300 text-xs">
                    {achievements.filter(a => a.earned)[0]?.name || "First Steps"} - Great job!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Grid - All in One View */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm flex items-center space-x-2">
              <span>🏅 All Achievements</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map(achievement => {
                const isEarned = achievement.earned;
                return (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      isEarned 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 shadow-sm' 
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`text-xl ${isEarned ? '' : 'opacity-30 grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium text-sm ${
                            isEarned 
                              ? 'text-green-800 dark:text-green-200' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {achievement.name}
                          </h5>
                          {isEarned && (
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium">EARNED</span>
                            </div>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${
                          isEarned 
                            ? 'text-green-700 dark:text-green-300' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                        {!isEarned && (
                          <div className="mt-2">
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                              🎯 Keep going to unlock this!
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Early Adopter Rewards */}
        {userProfile.earlyAdopterRewards && userProfile.earlyAdopterRewards.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Trophy size={18} className="mr-2 text-yellow-500" />
              Early Adopter Rewards
            </h3>
            <div className="space-y-3">
              {userProfile.earlyAdopterRewards.map((reward, index) => (
                <div key={index} className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <span className="text-2xl mr-3">🏆</span>
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">{reward}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Goals Progress */}
        {userProfile.goals && userProfile.goals.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target size={18} className="mr-2" />
              Your Goals
            </h3>
            <div className="space-y-4">
              {userProfile.goals.map(goal => {
                const progress = Math.min((goal.currentValue / goal.targetValue) * 100, 100);
                const isCompleted = goal.completed;
                
                return (
                  <div key={goal.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {goal.title}
                        {isCompleted && <span className="ml-2 text-green-500">✓</span>}
                      </h4>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {goal.currentValue}/{goal.targetValue}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      {goal.description}
                    </p>
                    
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{progress.toFixed(1)}% complete</span>
                      {goal.deadline && (
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* User Lists */}
        {showUserLists && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {userProfile.username === 'graz' ? 'My' : `@${userProfile.username}'s`} Lists ({userLists.length})
              </h3>
            {userLists.length > 0 && (
              <button
                onClick={() => setShowAllMyLists(!showAllMyLists)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-1"
              >
                <span>{showAllMyLists ? 'Hide Filters' : 'Show Filters'}</span>
                {showAllMyLists ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>

          {userLists.length > 0 && showAllMyLists && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedMyListsGenre('')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    selectedMyListsGenre === ''
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  All ({userLists.length})
                </button>
                {categories.map(category => {
                  const categoryCount = userLists.filter(list => list.category === category).length;
                  if (categoryCount === 0) return null;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedMyListsGenre(category)}
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedMyListsGenre === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category} ({categoryCount})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {filteredUserLists.length > 0 ? (
            <div className="space-y-4">
              {filteredUserLists.map(list => (
                <ListCard
                  key={list.id}
                  list={list}
                  itemVotes={itemVotes[list.id.toString()] || {}}
                  onListVote={onListVote}
                  onItemVote={onItemVote}
                  onHighFive={onHighFive}
                  onTitleClick={onTitleClick}
                  onSaveList={handleSaveList}
                  isSaved={savedLists.includes(list.id)}
                  antiSocialMode={antiSocialMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Bookmark size={32} className="mx-auto mb-4 opacity-50" />
              {userLists.length === 0 ? (
                <p className="text-sm">You haven&rsquo;t created any lists yet</p>
              ) : (
                <>
                  <p className="text-sm">No lists in {selectedMyListsGenre}</p>
                  <button 
                    onClick={() => setSelectedMyListsGenre('')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1"
                  >
                    Show all your lists
                  </button>
                </>
              )}
            </div>
          )}
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowEditProfile(false);
              }
            }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              <div className="max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit Profile
                  </h3>
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Avatar Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          {editForm.avatarImage ? (
                            <Image src={editForm.avatarImage} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-lg">{editForm.avatar}</span>
                          )}
                        </div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute -bottom-1 -right-1 p-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                        >
                          <Camera size={10} />
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-base font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                        >
                          Upload Photo
                        </button>
                        {editForm.avatarImage && (
                          <button
                            onClick={() => setEditForm({ ...editForm, avatarImage: null })}
                            className="ml-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Avatar Emoji Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Or Choose an Emoji
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {avatarOptions.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => setEditForm({ ...editForm, avatar: emoji })}
                          className={`p-2 rounded-lg text-lg ${
                            editForm.avatar === emoji
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {editForm.bio.length}/160 characters
                    </p>
                  </div>

                  {/* Pronouns */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pronouns (Optional)
                    </label>
                    <select
                      value={editForm.pronouns}
                      onChange={(e) => setEditForm({ ...editForm, pronouns: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select pronouns (optional)</option>
                      <option value="he/him">he/him</option>
                      <option value="she/her">she/her</option>
                      <option value="they/them">they/them</option>
                      <option value="he/they">he/they</option>
                      <option value="she/they">she/they</option>
                      <option value="any">any pronouns</option>
                      <option value="ask">ask me</option>
                    </select>
                  </div>

                  {/* Home City */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Home City (Optional)
                      </label>
                      <button
                        type="button"
                        onClick={detectLocation}
                        disabled={isDetectingLocation}
                        className="flex items-center space-x-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <MapPin size={12} />
                        <span>{isDetectingLocation ? 'Detecting...' : 'Detect Location'}</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editForm.homeCity}
                      onChange={(e) => setEditForm({ ...editForm, homeCity: e.target.value })}
                      placeholder="e.g. New York, NY or London, UK"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength={50}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {(editForm.homeCity || '').length}/50 characters
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Click &ldquo;Detect Location&rdquo; to automatically fill your current city
                    </p>
                  </div>

                  {/* Birthday */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Birthday (Optional)
                    </label>
                    <input
                      type="date"
                      value={editForm.birthday}
                      onChange={(e) => setEditForm({ ...editForm, birthday: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Used for age-appropriate content recommendations
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      For account notifications and updates
                    </p>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender (Optional)
                    </label>
                    <select
                      value={editForm.gender}
                      onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Genre Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Interests
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {editForm.selectedGenres.length}/10
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map(genre => {
                        const isSelected = editForm.selectedGenres.includes(genre);
                        const isDisabled = !isSelected && editForm.selectedGenres.length >= 10;
                        
                        return (
                          <button
                            key={genre}
                            onClick={() => toggleGenre(genre)}
                            disabled={isDisabled}
                            className={`p-2 rounded-lg text-xs font-medium ${
                              isSelected
                                ? 'bg-green-600 text-white'
                                : isDisabled
                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {genre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => setShowEditProfile(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Modal */}
        {showStatsModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowStatsModal(null);
              }
            }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {showStatsModal === 'following' ? 'Following' :
                   showStatsModal === 'followers' ? 'Followers' :
                   showStatsModal === 'listsCreated' ? 'Lists Created' :
                   showStatsModal === 'highFivesGiven' ? 'High Fives Given' :
                   showStatsModal === 'highFivesReceived' ? 'High Fives Received' : 'Stats'}
                </h3>
                <button
                  onClick={() => setShowStatsModal(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={16} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                {showStatsModal === 'following' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                      Following {followedUsers.length} users
                    </h4>
                    {followedUsers.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {followedUsers.map((username) => (
                          <div 
                            key={username}
                            className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                          >
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {username.substring(1, 2).toUpperCase()}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                onAuthorClick?.(username);
                                setShowStatsModal(null);
                              }}
                              className="flex-1 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                            >
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{username}</div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          You&rsquo;re not following anyone yet
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {showStatsModal === 'followers' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                      {userProfile.followers} followers
                    </h4>
                    {userProfile.followers > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {Array.from({length: Math.min(userProfile.followers, 50)}, (_, index) => {
                          const usernames = ['@musiclover', '@bookworm', '@cinephile', '@artlover', '@techguru', '@foodie', '@traveler', '@gamer', '@reader', '@writer', '@designer', '@coder', '@photographer', '@musician', '@athlete', '@chef', '@artist', '@dancer', '@teacher', '@student', '@blogger', '@vlogger', '@podcaster', '@streamer', '@creator', '@influencer', '@curator', '@collector', '@hobbyist', '@enthusiast'];
                          const username = usernames[index % usernames.length];
                          return username;
                        }).map((username, index) => (
                          <div 
                            key={username}
                            className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                {username.replace('@', '').charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                onAuthorClick?.(username);
                                setShowStatsModal(null);
                              }}
                              className="flex-1 text-left hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer"
                            >
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{username}</div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No followers yet
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {showStatsModal === 'highFivesGiven' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                      {userProfile.stats.highFivesGiven} high fives given
                    </h4>
                    {userProfile.stats.highFivesGiven > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {Array.from({length: Math.min(userProfile.stats.highFivesGiven, 20)}, (_, index) => {
                          const usernames = ['@musiclover', '@bookworm', '@cinephile', '@artlover', '@techguru', '@foodie', '@traveler', '@gamer', '@reader', '@writer', '@designer', '@coder', '@photographer', '@musician', '@athlete', '@chef', '@artist', '@dancer', '@teacher', '@student'];
                          const username = usernames[index % usernames.length];
                          return username;
                        }).map((username, index) => (
                          <div 
                            key={username + index}
                            className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {username.slice(1, 3).toUpperCase()}
                            </div>
                            <button
                              onClick={() => {
                                onAuthorClick?.(username);
                                setShowStatsModal(null);
                              }}
                              className="flex-1 text-left hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
                            >
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{username}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Received high five</div>
                            </button>
                            <div className="text-orange-500">🙏</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">🙏</div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No high fives given yet
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {showStatsModal === 'highFivesReceived' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                      {userProfile.stats.highFivesReceived} high fives received
                    </h4>
                    {userProfile.stats.highFivesReceived > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {Array.from({length: Math.min(userProfile.stats.highFivesReceived, 20)}, (_, index) => {
                          const usernames = ['@listmaster', '@curator', '@trendsetter', '@influencer', '@creator', '@supporter', '@fan', '@admirer', '@reviewer', '@critic', '@expert', '@authority', '@specialist', '@enthusiast', '@connoisseur', '@aficionado', '@devotee', '@follower', '@subscriber', '@member'];
                          const username = usernames[index % usernames.length];
                          return username;
                        }).map((username, index) => (
                          <div 
                            key={username + index}
                            className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {username.slice(1, 3).toUpperCase()}
                            </div>
                            <button
                              onClick={() => {
                                onAuthorClick?.(username);
                                setShowStatsModal(null);
                              }}
                              className="flex-1 text-left hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-pointer"
                            >
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{username}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Gave high five</div>
                            </button>
                            <div className="text-pink-500">🙏</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">🙏</div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No high fives received yet
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {showStatsModal === 'listsCreated' && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 text-center">
                      {userLists.length} lists created by {userProfile.username}
                    </h4>
                    {userLists.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {userLists.map((list) => (
                          <div 
                            key={list.id}
                            className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <button
                              onClick={() => {
                                // Navigate to discover view and search for the list content
                                const titleContent = list.title.match(/\"([^"]+)\"/)?.[1] || list.title;
                                onTitleClick?.(titleContent);
                                onNavigateToDiscover?.();
                                setShowStatsModal(null);
                              }}
                              className="w-full text-left hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer"
                            >
                              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{list.title}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{list.description}</div>
                              <div className="flex items-center space-x-3 text-xs text-gray-400">
                                <span>📅 {list.date}</span>
                                <span>👍 {list.upvotes}</span>
                                <span>👎 {list.downvotes}</span>
                                <span>🙏 {list.highFives || 0}</span>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">📝</div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No lists created yet
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Map Modal */}
        {showMapModal && userProfile.homeCity && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowMapModal(false);
              }
            }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-blue-500">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{userProfile.homeCity}</span>
                </h3>
                <button
                  onClick={() => setShowMapModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={16} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              {/* Simple Map Visualization */}
              <div className="relative bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg h-64 overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" viewBox="0 0 400 300">
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                {/* Location Pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    {/* Location Label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 px-2 py-1 rounded shadow-md text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {userProfile.homeCity}
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-70"></div>
                <div className="absolute top-6 right-8 w-6 h-6 bg-white rounded-full opacity-60"></div>
                <div className="absolute bottom-8 left-8 w-4 h-4 bg-green-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-12 right-6 w-10 h-10 bg-blue-300 rounded-full opacity-40"></div>
              </div>
              
              {/* Location Info */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <UserIcon size={16} />
                  <span>{userProfile.username} is located in {userProfile.homeCity}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  This is their approximate location based on their profile information.
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setShowMapModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Open in external map service
                    const query = encodeURIComponent(userProfile.homeCity || '');
                    window.open(`https://www.openstreetmap.org/search?query=${query}`, '_blank');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  View on Map
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Modal */}
        {showAnalytics && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowAnalytics(false);
              }
            }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BarChart3 size={24} className="text-primary-600 dark:text-primary-400" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Creator Analytics
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowAnalytics(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <CreatorAnalytics onAuthorClick={onAuthorClick} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </ProfileErrorBoundary>
  );
}