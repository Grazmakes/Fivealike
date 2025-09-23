'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Home, ArrowLeft } from 'lucide-react';
import { FeedTab, List, ItemVotes, User } from '@/types';
import ListCard from '@/components/lists/ListCard';
import HotListsCarousel from '@/components/lists/HotListsCarousel';
import { FeedErrorBoundary, ListErrorBoundary } from '@/components/ui/ErrorBoundaries';

interface HomeFeedProps {
  selectedFeedTab: FeedTab;
  setSelectedFeedTab: (tab: FeedTab) => void;
  allLists: List[];
  followedUsers: string[];
  itemVotes: ItemVotes;
  onListVote: (listId: number, voteType: 'up' | 'down') => void;
  onItemVote: (listId: number, itemIndex: number, voteType: 'up' | 'down') => void;
  onHighFive: (listId: number) => void;
  onCategoryClick?: (category: string) => void;
  onTitleClick?: (title: string) => void;
  onAddComment?: (listId: number, comment: string) => void;
  onAuthorClick?: (author: string) => void;
  onMessage?: (username: string) => void;
  onItemBookmark?: (listId: number, itemIndex: number) => void;
  bookmarkState?: { [key: string]: boolean };
  savedLists: number[];
  setSavedLists: (lists: number[]) => void;
  userProfile: User;
  highlightedItem?: {type: 'list' | 'message' | 'comment', id: string} | null;
  onClearHighlight?: () => void;
}

const feedTabs = [
  { id: 'yourfeed' as FeedTab, label: 'Your Feed' },
  { id: 'all' as FeedTab, label: 'All Lists' },
  { id: 'new' as FeedTab, label: 'Find New Lists' },
  { id: 'best' as FeedTab, label: 'Best Overall' },
  { id: 'likes' as FeedTab, label: 'Most Likes' },
  { id: 'comments' as FeedTab, label: 'Most Comments' },
];

export default function HomeFeed({
  selectedFeedTab,
  setSelectedFeedTab,
  allLists,
  followedUsers,
  itemVotes,
  onListVote,
  onItemVote,
  onHighFive,
  onCategoryClick,
  onTitleClick,
  onAddComment,
  onAuthorClick,
  onMessage,
  onItemBookmark,
  bookmarkState = {},
  savedLists,
  setSavedLists,
  userProfile,
  highlightedItem,
  onClearHighlight
}: HomeFeedProps) {
  const [showFeedDropdown, setShowFeedDropdown] = useState(false);
  const feedDropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (feedDropdownRef.current && !feedDropdownRef.current.contains(event.target as Node)) {
        setShowFeedDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFilteredLists = () => {
    // Filter out rejected lists (70%+ downvotes)
    const nonRejectedLists = allLists.filter(list => !list.isRejected);
    
    switch (selectedFeedTab) {
      case 'yourfeed':
        return nonRejectedLists.filter(list => followedUsers.includes(list.author));
      case 'new':
        return [...nonRejectedLists].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'best':
        return [...nonRejectedLists].sort((a, b) => b.votes - a.votes);
      case 'likes':
        return [...nonRejectedLists].sort((a, b) => b.votes - a.votes);
      case 'comments':
        return [...nonRejectedLists].sort((a, b) => b.comments.length - a.comments.length);
      default:
        return nonRejectedLists;
    }
  };

  const filteredLists = getFilteredLists();

  const handleSaveList = (listId: number) => {
    console.log('💾 Save/Unsave clicked:', { listId, currentlySaved: savedLists.includes(listId) });
    setSavedLists(
      savedLists.includes(listId) 
        ? savedLists.filter(id => id !== listId)
        : [...savedLists, listId]
    );
  };

  return (
    <div className="space-y-6 bg-transparent">
      <div className="bg-transparent">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Home className="text-green-500 mr-2" size={28} />
          Your Home Feed
        </h1>
        
        {/* Feed Dropdown */}
        <div className="mb-6">
          <div className="relative" ref={feedDropdownRef}>
            <button
              onClick={() => setShowFeedDropdown(!showFeedDropdown)}
              className="group flex items-center justify-between w-auto px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-green-400 transition-colors"></div>
                <span className="text-base">{feedTabs.find(tab => tab.id === selectedFeedTab)?.label}</span>
              </div>
              <ChevronDown size={16} className={`ml-2 transition-transform duration-200 text-gray-600 dark:text-gray-400 ${showFeedDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showFeedDropdown && (
              <div className="absolute top-full left-0 mt-3 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 py-2 z-50 backdrop-blur-sm">
                {feedTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedFeedTab(tab.id);
                      setShowFeedDropdown(false);
                    }}
                    className={`w-full text-left px-6 py-3 text-base font-medium transition-all duration-150 flex items-center space-x-3 ${
                      selectedFeedTab === tab.id
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-l-4 border-green-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:translate-x-1'
                    } ${index === 0 ? 'rounded-t-2xl' : ''} ${index === feedTabs.length - 1 ? 'rounded-b-2xl' : ''}`}
                  >
                    <div className={`w-2 h-2 rounded-full transition-colors ${
                      selectedFeedTab === tab.id ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A personalized mix from people you follow plus recommendations we think you&apos;ll love
        </p>
      </div>

      {/* Hot Lists Carousel */}
      <FeedErrorBoundary>
        <HotListsCarousel allLists={allLists} onTitleClick={onTitleClick} />
      </FeedErrorBoundary>

      {/* Lists */}
      <div className="space-y-6">
        {filteredLists.length > 0 ? (
          filteredLists.map(list => (
            <ListErrorBoundary key={list.id} listTitle={list.title}>
              <ListCard
                list={list}
                itemVotes={itemVotes[list.id.toString()] || {}}
                onListVote={onListVote}
                onItemVote={onItemVote}
                onHighFive={onHighFive}
                onCategoryClick={onCategoryClick}
                onTitleClick={onTitleClick}
                onAddComment={onAddComment}
                onAuthorClick={onAuthorClick}
                onMessage={onMessage}
                onItemBookmark={onItemBookmark}
                bookmarkState={bookmarkState}
                onSaveList={handleSaveList}
                isSaved={savedLists.includes(list.id)}
              />
            </ListErrorBoundary>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {selectedFeedTab === 'yourfeed' 
                ? "No lists from people you follow yet. Try following some users or check out 'All Lists'!"
                : "No lists found."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}