'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, ChevronDown, User, Bookmark, Settings, LogOut, Shield, Search, Filter } from 'lucide-react';
import { NavigationErrorBoundary } from '@/components/ui/ErrorBoundaries';
import SleekNotificationsDropdown from '@/components/notifications/SleekNotificationsDropdown';
import SearchSettingsDropdown from '@/components/search/SearchSettingsDropdown';
import { Notification, User as UserType } from '@/types';

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

interface TopHeaderProps {
  onNavigateToHome?: () => void;
  darkMode?: boolean;
  setDarkMode?: (darkMode: boolean) => void;
  showNotifications?: boolean;
  setShowNotifications?: (show: boolean) => void;
  notifications?: Notification[];
  setNotifications?: (notifications: Notification[]) => void;
  onClearAllNotifications?: (notifications?: Notification[]) => void;
  onMarkAllNotificationsAsRead?: (notifications: Notification[]) => void;
  onNotificationClick?: (notification: Notification) => void;
  onForceClearAll?: () => void;
  userProfile?: UserType;
  onNavigateToProfile?: () => void;
  onNavigateToSaved?: () => void;
  onShowAccountSettings?: () => void;
  onShowCommunityGuidelines?: () => void;
  onLogout?: () => void;
  onToggleAntiSocialMode?: (enabled: boolean) => void;
  onSearch?: (query: string) => void;
  searchSettings?: SearchSettings;
  onSearchSettingsChange?: (settings: SearchSettings) => void;
  onRandomList?: () => void;
  onClearSearch?: () => void;
}

export default function TopHeader({
  onNavigateToHome,
  darkMode = false,
  setDarkMode,
  showNotifications = false,
  setShowNotifications,
  notifications = [],
  setNotifications,
  onClearAllNotifications,
  onMarkAllNotificationsAsRead,
  onNotificationClick,
  onForceClearAll,
  userProfile,
  onNavigateToProfile,
  onNavigateToSaved,
  onShowAccountSettings,
  onShowCommunityGuidelines,
  onLogout,
  onToggleAntiSocialMode,
  onSearch,
  searchSettings = {
    category: '',
    sortBy: 'recent',
    viewMode: 'grid',
    showRecommended: false,
    showPopular: false,
    minVotes: 0,
    dateRange: 'all'
  },
  onSearchSettingsChange,
  onRandomList,
  onClearSearch
}: TopHeaderProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAntiSocialTooltip, setShowAntiSocialTooltip] = useState(false);
  const [showSearchSettings, setShowSearchSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchSettingsRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => n.unread).length;

  // Keep mobile search open when there's a search query
  useEffect(() => {
    if (searchQuery && !showMobileSearch) {
      setShowMobileSearch(true);
    }
  }, [searchQuery, showMobileSearch]);

  // Handle click outside to close dropdowns (including mobile touch)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications?.(false);
      }
      if (searchSettingsRef.current && !searchSettingsRef.current.contains(event.target as Node)) {
        setShowSearchSettings(false);
      }
    }

    // Add both mouse and touch event listeners for desktop and mobile
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [setShowNotifications]);

  return (
    <NavigationErrorBoundary>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center justify-between px-6 py-3 lg:py-0 lg:h-20">
          {/* Logo - left aligned (hidden on mobile when search is active) */}
          <div className={`flex-shrink-0 ${showMobileSearch ? 'hidden lg:flex' : 'flex'}`}>
            <button
              onClick={() => onNavigateToHome?.()}
              className="flex flex-col items-start hover:opacity-80 transition-opacity"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-left">
                Five Alike
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 -mt-1 text-left">
                find a list for just about anything
              </p>
            </button>
          </div>

          {/* Search Bar - center aligned on desktop, full width on mobile when active */}
          <div className={`${showMobileSearch ? 'flex flex-1' : 'hidden'} lg:flex lg:flex-1 lg:max-w-2xl lg:mx-8`}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search lists..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                className="w-full px-4 py-2 pl-10 pr-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    onClearSearch?.();
                    setShowMobileSearch(false);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                >
                  <span className="text-gray-400 text-xl leading-none">×</span>
                </button>
              )}
            </div>
            {onSearchSettingsChange && (
              <div className="relative ml-2" ref={searchSettingsRef}>
                <button
                  onClick={() => setShowSearchSettings(!showSearchSettings)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Search settings"
                >
                  <Filter size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
                {showSearchSettings && (
                  <SearchSettingsDropdown
                    settings={searchSettings}
                    onSettingsChange={onSearchSettingsChange}
                    onClose={() => setShowSearchSettings(false)}
                    onRandomList={onRandomList}
                  />
                )}
              </div>
            )}
          </div>

          {/* Right side Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications?.(!showNotifications)}
                className={`relative hidden sm:inline-flex p-2 rounded-md transition-colors ${
                  showNotifications
                    ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : unreadCount > 0
                    ? 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full min-w-[24px] h-[24px] flex items-center justify-center px-1.5 font-medium shadow-lg">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && setNotifications && setShowNotifications && (
                <SleekNotificationsDropdown
                  notifications={notifications}
                  setNotifications={setNotifications}
                  onClearAllNotifications={onClearAllNotifications}
                  onMarkAllNotificationsAsRead={onMarkAllNotificationsAsRead}
                  setShowNotifications={setShowNotifications}
                  onNotificationClick={onNotificationClick}
                  onForceClearAll={onForceClearAll}
                />
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="User menu"
              >
                <span className="text-base font-medium">
                  @{userProfile?.username || 'guest'}
                </span>
                <ChevronDown size={16} className={`transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 py-2 z-[100] animate-slideDown">
                  <button
                    onClick={() => {
                      onNavigateToProfile?.();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User size={20} />
                    <span>My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigateToSaved?.();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Bookmark size={20} />
                    <span>Saved Lists</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onShowCommunityGuidelines?.();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Shield size={20} className="flex-shrink-0" />
                    <span className="whitespace-nowrap ml-2">Community Guidelines</span>
                  </button>
                  
                  {setDarkMode && (
                    <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center space-x-2">
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={darkMode}
                          onChange={(e) => setDarkMode(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  )}
                  
                  {onToggleAntiSocialMode && (
                    <div
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleAntiSocialMode(!userProfile?.antiSocialMode);
                      }}
                    >
                      <div className="flex items-center space-x-2 relative">
                        <User size={20} />
                        <span
                          className="cursor-help"
                          onMouseEnter={() => setShowAntiSocialTooltip(true)}
                          onMouseLeave={() => setShowAntiSocialTooltip(false)}
                        >
                          Anti-Social Mode
                        </span>

                        {/* Anti-Social Mode Tooltip */}
                        {showAntiSocialTooltip && (
                          <div className="absolute left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-xs rounded-lg py-2 px-3 shadow-lg w-64">
                            <div className="font-semibold mb-1">Focus Mode</div>
                            <div className="text-gray-600 dark:text-gray-400">
                              Hides all social features (comments, voting, messaging, notifications) while keeping author names, vote counts, and bookmarking for a distraction-free experience.
                            </div>
                            <div className="absolute bottom-full left-4 w-2 h-2 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-600 rotate-45"></div>
                          </div>
                        )}
                      </div>
                      <div className={`w-11 h-6 rounded-full relative transition-all duration-200 cursor-pointer ${
                        userProfile?.antiSocialMode
                          ? 'bg-primary-600 shadow-sm'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}>
                        <div className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 dark:border-gray-600 rounded-full h-5 w-5 transition-all duration-200 shadow-sm ${
                          userProfile?.antiSocialMode
                            ? 'translate-x-full border-white'
                            : ''
                        }`}></div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                      onShowAccountSettings?.();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Settings size={20} />
                    <span>Account Settings</span>
                  </button>
                  
                  <hr className="my-1 border-gray-200 dark:border-gray-600" />
                  
                  <button
                    onClick={() => {
                      onLogout?.();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </NavigationErrorBoundary>
  );
}
