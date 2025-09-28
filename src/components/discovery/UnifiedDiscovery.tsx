'use client';

import { useState } from 'react';
import { Search, Grid, MapPin, TrendingUp, ArrowLeft } from 'lucide-react';
import { List as ListType, ItemVotes, User, SocialEvent } from '@/types';
import SearchPage from '@/components/search/SearchPage';
import BrowseGenre from '@/components/browse/BrowseGenre';
import TrendingLists from '@/components/trending/TrendingLists';
import { TrendingTab } from '@/types';

type SortOption = 'recent' | 'mostLikes' | 'bestOverall' | 'mostHighFives' | 'mostComments';
type ViewMode = 'grid' | 'list';

interface SearchSettings {
  category: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  showRecommended?: boolean;
  showPopular?: boolean;
  minVotes?: number;
  dateRange?: 'all' | 'week' | 'month' | 'year';
}

interface UnifiedDiscoveryProps {
  // Common props
  userProfile: User;
  setUserProfile?: (profile: User | ((prev: User) => User)) => void;
  allLists: ListType[];
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
  
  // Search specific
  initialCategory?: string;
  initialQuery?: string;
  onRejectListsClick?: () => void;
  onClearSearch?: () => void;
  onAddComment?: (listId: number, comment: string) => void;
  searchSettings?: SearchSettings;
  randomTrigger?: number;
  
  // Browse specific
  onCategorySelect?: (category: string) => void;
  
  // Trending specific
  selectedTrendingTab?: TrendingTab;
  setSelectedTrendingTab?: (tab: TrendingTab) => void;
  onCategoryClick?: (category: string) => void;
  
  // Events specific
  events?: SocialEvent[];
  onJoinEvent?: (eventId: string, status: 'going' | 'maybe' | 'not_going') => void;
  
  // Navigation
  onBack?: () => void;

  // Anti-social mode
  antiSocialMode?: boolean;
}

type DiscoveryTab = 'search' | 'trending';

export default function UnifiedDiscovery({
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
  initialCategory = '',
  initialQuery = '',
  onRejectListsClick,
  onClearSearch,
  onAddComment,
  searchSettings,
  randomTrigger,
  onCategorySelect,
  selectedTrendingTab = 'votes',
  setSelectedTrendingTab,
  onCategoryClick,
  events = [],
  onJoinEvent,
  onBack,
  antiSocialMode = false
}: UnifiedDiscoveryProps) {
  const [selectedTab, setSelectedTab] = useState<DiscoveryTab>('search');

  // Auto-switch to search tab when a category is selected
  const handleCategorySelect = (category: string) => {
    setSelectedTab('search');
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'search':
        return (
          <SearchPage
            key={`search-${initialCategory}`}
            allLists={allLists}
            itemVotes={itemVotes}
            onListVote={onListVote}
            onItemVote={onItemVote}
            onHighFive={onHighFive}
            onTitleClick={onTitleClick}
            onAddComment={onAddComment}
            onAuthorClick={onAuthorClick}
            onMessage={onMessage}
            onItemBookmark={onItemBookmark}
            bookmarkState={bookmarkState}
            savedLists={savedLists}
            setSavedLists={setSavedLists}
            initialCategory={initialCategory}
            initialQuery={initialQuery}
            onRejectListsClick={onRejectListsClick}
            onClearSearch={onClearSearch}
            antiSocialMode={antiSocialMode}
            searchSettings={searchSettings}
            randomTrigger={randomTrigger}
          />
        );


      case 'trending':
        return (
          <TrendingLists
            selectedTrendingTab={selectedTrendingTab}
            setSelectedTrendingTab={setSelectedTrendingTab || (() => {})}
            allLists={allLists}
            itemVotes={itemVotes}
            onListVote={onListVote}
            onItemVote={onItemVote}
            onHighFive={onHighFive}
            onCategoryClick={onCategoryClick || onTitleClick || (() => {})}
            onTitleClick={onTitleClick}
            onAuthorClick={onAuthorClick}
            onMessage={onMessage}
            onItemBookmark={onItemBookmark}
            bookmarkState={bookmarkState}
            savedLists={savedLists}
            setSavedLists={setSavedLists}
            antiSocialMode={antiSocialMode}
          />
        );

      default:
        return null;
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
              <Search className="text-green-500" />
              <span>Discover</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Search, browse, and discover amazing lists from around the world
            </p>
          </div>
        </div>
      </div>

      {/* Discovery Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {[
          { id: 'search', label: 'Search', icon: Search },
          { id: 'trending', label: 'Trending', icon: TrendingUp }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedTab(id as DiscoveryTab)}
            className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-base font-medium transition-colors flex-1 justify-center ${
              selectedTab === id
                ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon size={20} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  );
}