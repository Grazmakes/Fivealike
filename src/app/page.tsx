'use client';

import { useState, useEffect, useMemo } from 'react';
import { MessageCircle, ChevronUp, Home as HomeIcon, Search, Plus, Bookmark, Menu, Trophy, Users, Layers, Calendar, Headphones, MapPin, TrendingUp, Music, Film, BookOpen, Tv, Gamepad2, Mic, Laptop, Utensils, Plane, Palette, Dumbbell, Microscope, ScrollText, Landmark, Smile, Ghost, Heart, Map, Dice5, Camera, Shirt, Bell } from 'lucide-react';
import { User, ViewType, FeedTab, TrendingTab, List, Notification, ItemVotes, SocialEvent, BookmarkedItem, BookmarkState, HistoryItem } from '@/types';
import { comprehensiveTestLists as mockLists, testNotifications as mockNotifications } from '@/data/comprehensiveTestData';
import { categories, categoryEmojis } from '@/data/mockData';

import TopHeader from '@/components/TopHeader';
import Navigation from '@/components/Navigation';
import HomeFeed from '@/components/feed/HomeFeed';
import Community from '@/components/community/Community';
import Groups from '@/components/groups/Groups';
import Podcast from '@/components/podcast/Podcast';
import Profile from '@/components/profile/Profile';
import RejectLists from '@/components/rejected/RejectLists';
import SocialEvents from '@/components/events/SocialEvents';
import Favorites from '@/components/favorites/Favorites';
import UnifiedDiscovery from '@/components/discovery/UnifiedDiscovery';
import LocalDiscovery from '@/components/discovery/LocalDiscovery';
import TrendingLists from '@/components/trending/TrendingLists';
import CreateListModal from '@/components/modals/CreateListModal';
import EditListModal from '@/components/modals/EditListModal';
import TutorialPopup from '@/components/tutorial/TutorialPopup';
import AccountSettings from '@/components/settings/AccountSettings';
import CommunityGuidelines from '@/components/community/CommunityGuidelines';
import { useMentionNotifications } from '@/components/notifications/MentionNotifications';
import RedditChat from '@/components/chat/RedditChat';
import LeaderboardPage from '@/components/leaderboards/LeaderboardPage';
import CommunitiesSidebar from '@/components/sidebar/CommunitiesSidebar';
import { RealTimeVotesProvider, useRealTimeVotesContext } from '@/context/RealTimeVotesContext';
import SimpleAuth from '@/components/auth/SimpleAuth';
import { db } from '@/lib/supabase';
import { ProfileErrorBoundary } from '@/components/ui/ErrorBoundaries';
import History from '@/components/history/History';

const debugLog = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

// Category icon mapping
const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'Music': Music,
  'Movies': Film,
  'Books': BookOpen,
  'TV Shows': Tv,
  'Games': Gamepad2,
  'Podcasts': Mic,
  'Technology': Laptop,
  'Food': Utensils,
  'Travel': Plane,
  'Art': Palette,
  'Fitness': Dumbbell,
  'Science': Microscope,
  'History': ScrollText,
  'Politics': Landmark,
  'Comedy': Smile,
  'Horror': Ghost,
  'Romance': Heart,
  'Adventure': Map,
  'Board Games': Dice5,
  'Photography': Camera,
  'Fashion': Shirt,
  'Sports': Trophy,
};

function HomeContent() {
  // Real-time votes context
  const { broadcastVote, getVoteUpdate } = useRealTimeVotesContext();
  
  // Auth State - TEMPORARILY BYPASSED FOR DEMO
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // UI State
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingList, setEditingList] = useState<List | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showCommunityGuidelines, setShowCommunityGuidelines] = useState(false);
  const [showRedditChat, setShowRedditChat] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileGenres, setShowMobileGenres] = useState(false);
  const [genresSidebarOffset, setGenresSidebarOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isClosingGenres, setIsClosingGenres] = useState(false);

  // State to track which item to highlight when navigating from mention notifications
  const [highlightedItem, setHighlightedItem] = useState<{type: 'list' | 'message' | 'comment', id: string} | null>(null);

  // Feed State
  const [selectedFeedTab, setSelectedFeedTab] = useState<FeedTab>('yourfeed');
  const [selectedTrendingTab, setSelectedTrendingTab] = useState<TrendingTab>('votes');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSettings, setSearchSettings] = useState({
    category: '',
    sortBy: 'recent' as const,
    viewMode: 'grid' as const,
    showRecommended: false,
    showPopular: false,
    minVotes: 0,
    dateRange: 'all' as const
  });
  const [randomTrigger, setRandomTrigger] = useState(0);
  const [viewingProfile, setViewingProfile] = useState<string>(''); // Track which user's profile we're viewing
  const [chatTargetUser, setChatTargetUser] = useState<string>(''); // Track which user to open chat with

  // User State
  const [userProfile, setUserProfile] = useState<User>({
    id: 'user_graz_' + Date.now().toString(36),
    username: 'graz',
    bio: 'Exploring life through recommendations and discoveries!',
    avatar: '⭐',
    avatarImage: null,
    favoriteTopics: ['music', 'games'],
    selectedGenres: ['Music', 'Games'],
    achievements: ['first_steps', 'socialite'],
    antiSocialMode: false,
    badges: [
      {
        id: 'verified',
        type: 'verified',
        name: 'Verified User',
        description: 'Account has been verified by Five Alike',
        icon: '✓',
        color: 'bg-blue-500',
        earnedDate: '2024-01-15'
      },
      {
        id: 'early_adopter',
        type: 'early_adopter',
        name: 'Early Adopter',
        description: 'Joined Five Alike during beta',
        icon: '🚀',
        color: 'bg-purple-500',
        earnedDate: '2024-01-01'
      },
      {
        id: 'great_minds',
        type: 'great_minds',
        name: 'Multiple Creators',
        description: 'Created a list that others also made',
        icon: '2',
        color: 'bg-gray-500',
        earnedDate: '2024-08-18'
      }
    ],
    selectedBadge: {
      id: 'early_adopter',
      type: 'early_adopter',
      name: 'Early Adopter',
      description: 'Joined Five Alike during beta',
      icon: '🚀',
      color: 'bg-purple-500',
      earnedDate: '2024-01-01'
    },
    goals: [
      {
        id: 'goal_1',
        title: 'Create 10 Lists',
        description: 'Share your favorite recommendations with the community',
        targetValue: 10,
        currentValue: 3,
        category: 'lists_created',
        deadline: '2024-12-31',
        completed: false
      },
      {
        id: 'goal_2',
        title: 'Give 100 Certi-fives',
        description: 'Show appreciation for great lists',
        targetValue: 100,
        currentValue: 12,
        category: 'high_fives_given',
        completed: false
      }
    ],
    seasonalReminders: [
      {
        id: 'summer_reminder',
        title: 'Summer Movie Marathon',
        description: 'Time to create your summer blockbuster list!',
        season: 'summer',
        category: 'Movies',
        isActive: true
      },
      {
        id: 'winter_reminder',
        title: 'Cozy Winter Reads',
        description: 'Perfect time for book recommendations',
        season: 'winter',
        category: 'Books',
        isActive: true
      }
    ],
    followers: 12,
    following: 8,
    joinDate: '2024-01-01',
    isEarlyAdopter: true,
    hasSeenTutorial: false,
    claimedRewards: ['pioneer_badge', 'priority_support', 'beta_tester'],
    homeCity: 'San Francisco, CA',
    birthday: '1990-06-15',
    email: 'graz@fivealike.com',
    gender: 'male',
    stats: {
      listsCreated: 3,
      totalVotes: 25,
      followers: 12,
      listsSaved: 8,
      commentsPosted: 15,
      highFivesGiven: 12,
      highFivesReceived: 24,
      trendsStarted: 2,
      firstToSave: 5
    },
    analytics: {
      tasteProfile: {
        categoryBreakdown: {
          'Movies': 45,
          'Books': 30,
          'Music': 15,
          'Games': 10
        },
        genrePreferences: {
          'Sci-Fi': 25,
          'Drama': 20,
          'Comedy': 18,
          'Thriller': 12,
          'Documentary': 10,
          'Horror': 8,
          'Romance': 7
        },
        votingPatterns: {
          upvotesByCategory: {
            'Movies': 18,
            'Books': 12,
            'Music': 8,
            'Games': 5
          },
          downvotesByCategory: {
            'Movies': 3,
            'Books': 1,
            'Music': 2,
            'Games': 1
          }
        },
        discoveryHistory: [
          { date: '2024-01-15', category: 'Movies', action: 'saved' },
          { date: '2024-01-14', category: 'Books', action: 'voted' },
          { date: '2024-01-13', category: 'Movies', action: 'created' },
          { date: '2024-01-12', category: 'Music', action: 'saved' },
          { date: '2024-01-11', category: 'Movies', action: 'voted' }
        ]
      },
      influence: {
        totalSavesReceived: 47,
        totalHighFivesReceived: 24,
        listImpact: [
          { listId: 1, title: 'Best Sci-Fi Movies of 2023', saves: 18, highFives: 12, votes: 45 },
          { listId: 2, title: 'Underrated Indie Books', saves: 15, highFives: 8, votes: 32 },
          { listId: 3, title: 'Perfect Coding Playlist', saves: 14, highFives: 4, votes: 28 }
        ],
        trendsettingScore: 85,
        firstDiscoveries: 5
      }
    }
  });

  // Data State
  const [allLists, setAllLists] = useState<List[]>(mockLists);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [followedUsers, setFollowedUsers] = useState(['@musiclover', '@bookworm', '@readingcorner', '@indievibes', '@artlover', '@comedy_central', '@swiftie_forever', '@puzzle_master', '@sci_fi_sage', '@prestige_tv', '@noodle_ninja', '@anime_dreams', '@podcast_addict', '@tvjunkie']);
  
  // Mention Notifications
  const {
    notifications: mentionNotifications,
    markAsRead: markMentionAsRead,
    markAllAsRead: markAllMentionsAsRead,
    dismiss: dismissMention,
    addNotification: addMentionNotification
  } = useMentionNotifications(userProfile.username);
  const unreadNotificationsCount = useMemo(() => {
    const regularUnread = notifications.filter((n) => n.unread).length;
    const mentionUnread = mentionNotifications.filter((n) => !n.isRead).length;
    return regularUnread + mentionUnread;
  }, [notifications, mentionNotifications]);
  const [savedLists, setSavedLists] = useState<number[]>([]);
  const [itemVotes, setItemVotes] = useState<ItemVotes>({});
  const [bookmarkedItems, setBookmarkedItems] = useState<BookmarkedItem[]>([]);
  const [bookmarkState, setBookmarkState] = useState<BookmarkState>({});
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(3); // Mock unread messages
  const [events, setEvents] = useState<SocialEvent[]>([
    {
      id: 'event_1',
      title: 'Sci-Fi Movie Marathon Night',
      description: 'Join us for a night of classic sci-fi films! We\'ll be watching Blade Runner, The Matrix, and 2001: A Space Odyssey. Popcorn and discussions included!',
      type: 'movie_night',
      category: 'Movies & TV',
      relatedListId: 1,
      relatedItems: ['Blade Runner', 'The Matrix', '2001: A Space Odyssey'],
      host: {
        username: 'movie_mike',
        avatar: '🎬',
        avatarImage: undefined,
        badges: [
          {
            id: 'expert',
            type: 'expert',
            name: 'Movie Expert',
            description: 'Recognized expert in cinema',
            icon: '🎭',
            color: 'purple'
          }
        ]
      },
      dateTime: '2024-02-15T19:00:00Z',
      endDateTime: '2024-02-16T01:00:00Z',
      location: {
        type: 'online',
        platform: 'Discord',
        meetingLink: 'https://discord.gg/scifi-marathon'
      },
      capacity: {
        min: 3,
        max: 15,
        current: 8
      },
      rsvp: {
        going: ['movie_mike', 'alice_reads', 'book_lover', 'cinema_sage'],
        maybe: ['list_lord', 'trend_setter'],
        notGoing: ['music_maven']
      },
      requirements: ['Discord account', 'Good internet connection'],
      tags: ['sci-fi', 'classics', 'discussion'],
      isPrivate: false,
      requiresApproval: false,
      status: 'upcoming',
      createdAt: '2024-02-01T10:00:00Z',
      updatedAt: '2024-02-10T15:30:00Z',
      photos: [],
      chat: [
        {
          id: '1',
          username: 'movie_mike',
          content: 'Looking forward to this! Who else is excited for The Matrix?',
          timestamp: '2024-02-10T16:00:00Z',
          avatar: '🎬'
        },
        {
          id: '2',
          username: 'alice_reads',
          content: 'Can\'t wait! I\'ve never seen Blade Runner before.',
          timestamp: '2024-02-10T16:15:00Z',
          avatar: '📚'
        }
      ]
    },
    {
      id: 'event_2',
      title: 'Board Game Café Meetup',
      description: 'Let\'s meet up at the local board game café for an afternoon of strategy games and coffee! Perfect for both beginners and experienced players.',
      type: 'game_night',
      category: 'Games',
      relatedItems: ['Settlers of Catan', 'Ticket to Ride', 'Azul'],
      host: {
        username: 'graz',
        avatar: '⭐',
        avatarImage: undefined,
        badges: [
          {
            id: 'early_adopter',
            type: 'early_adopter',
            name: 'Early Adopter',
            description: 'One of the first users',
            icon: '🌟',
            color: 'gold'
          }
        ]
      },
      dateTime: '2024-02-18T14:00:00Z',
      endDateTime: '2024-02-18T18:00:00Z',
      location: {
        type: 'in_person',
        city: 'Downtown',
        address: '123 Board Game Café, Main St'
      },
      capacity: {
        min: 4,
        max: 8,
        current: 5
      },
      rsvp: {
        going: ['graz', 'game_master', 'strategy_steve'],
        maybe: ['board_enthusiast'],
        notGoing: []
      },
      requirements: [],
      tags: ['board-games', 'social', 'coffee'],
      isPrivate: false,
      requiresApproval: false,
      status: 'upcoming',
      createdAt: '2024-02-05T12:00:00Z',
      updatedAt: '2024-02-12T09:15:00Z',
      photos: [],
      chat: [
        {
          id: '3',
          username: 'graz',
          content: 'I\'ll bring Wingspan if anyone wants to try it!',
          timestamp: '2024-02-12T10:00:00Z',
          avatar: '⭐'
        },
        {
          id: '4',
          username: 'strategy_steve',
          content: 'Perfect! I love that game. See you all there!',
          timestamp: '2024-02-12T11:30:00Z',
          avatar: '🎯'
        }
      ]
    },
    
    // Boston Events
    {
      id: 'boston_event_1',
      title: 'Boston Harbor Walk & Local Food Tour',
      description: 'Join us for a scenic walk along Boston Harbor followed by tastings at local North End restaurants. Perfect way to explore Boston\'s waterfront and culinary scene!',
      type: 'meetup',
      category: 'Food & Travel',
      relatedListId: 104,
      relatedItems: ['Boston Harbor', 'North End', 'Clam Chowder', 'Italian Sub', 'Lobster Roll'],
      host: {
        username: '@bostonfoodie',
        avatar: '🦞',
        avatarImage: undefined,
        badges: [
          {
            id: 'local_expert',
            type: 'expert',
            name: 'Local Expert',
            description: 'Boston food scene expert',
            icon: '🍽️',
            color: 'green'
          }
        ]
      },
      dateTime: '2024-02-20T14:00:00Z',
      endDateTime: '2024-02-20T18:00:00Z',
      location: {
        type: 'in_person',
        address: 'Boston Harbor Walk',
        city: 'Boston',
        state: 'MA',
        country: 'US'
      },
      capacity: {
        min: 4,
        max: 12,
        current: 7
      },
      rsvp: {
        going: ['@bostonfoodie', '@bostonexplorer', '@redsoxfan'],
        maybe: ['@cambridgestudent', '@bostonrunner'],
        notGoing: []
      },
      requirements: ['Comfortable walking shoes', 'Appetite for great food!'],
      tags: ['food', 'walking', 'local', 'harbor'],
      isPrivate: false,
      requiresApproval: false,
      status: 'upcoming',
      createdAt: '2024-02-10T12:00:00Z',
      updatedAt: '2024-02-12T15:30:00Z',
      photos: [],
      chat: []
    },
    {
      id: 'boston_event_2',
      title: 'Red Sox Game Watch Party at Fenway',
      description: 'Let\'s watch the Sox take on the Yankees! Great atmosphere, classic ballpark food, and plenty of baseball talk. Red Sox fans unite!',
      type: 'meetup',
      category: 'Sports',
      relatedListId: 103,
      relatedItems: ['Fenway Park', 'Boston Red Sox', 'Baseball', 'Sports Bar'],
      host: {
        username: '@redsoxfan',
        avatar: '⚾',
        avatarImage: undefined,
        badges: [
          {
            id: 'sports_fan',
            type: 'top_contributor',
            name: 'Sports Enthusiast',
            description: 'Major league sports fan',
            icon: '🏆',
            color: 'red'
          }
        ]
      },
      dateTime: '2024-02-25T19:00:00Z',
      endDateTime: '2024-02-25T22:30:00Z',
      location: {
        type: 'in_person',
        address: '4 Yawkey Way',
        city: 'Boston',
        state: 'MA',
        country: 'US'
      },
      capacity: {
        min: 3,
        max: 20,
        current: 12
      },
      rsvp: {
        going: ['@redsoxfan', '@bostonexplorer', '@bostonfoodie', '@collegeboston'],
        maybe: ['@bostonrunner', '@bostontechie'],
        notGoing: []
      },
      requirements: ['Game ticket (we can help arrange group discounts)'],
      tags: ['baseball', 'fenway', 'sports', 'redsox'],
      isPrivate: false,
      requiresApproval: false,
      status: 'upcoming',
      createdAt: '2024-02-08T10:00:00Z',
      updatedAt: '2024-02-12T14:15:00Z',
      photos: [],
      chat: []
    },
    {
      id: 'boston_event_3',
      title: 'Boston Marathon Training Run Group',
      description: 'Training for Boston Marathon or just love running? Join our weekly group runs along the Charles River. All paces welcome!',
      type: 'activity',
      category: 'Fitness',
      relatedListId: 112,
      relatedItems: ['Charles River Esplanade', 'Boston Marathon', 'Running', 'Training'],
      host: {
        username: '@bostonrunner',
        avatar: '🏃‍♂️',
        avatarImage: undefined,
        badges: [
          {
            id: 'fitness_guru',
            type: 'expert',
            name: 'Fitness Expert',
            description: 'Marathon training specialist',
            icon: '🏃',
            color: 'green'
          }
        ]
      },
      dateTime: '2024-02-18T08:00:00Z',
      endDateTime: '2024-02-18T10:00:00Z',
      location: {
        type: 'in_person',
        address: 'Charles River Esplanade - Hatch Shell',
        city: 'Boston',
        state: 'MA',
        country: 'US'
      },
      capacity: {
        min: 2,
        max: 25,
        current: 15
      },
      rsvp: {
        going: ['@bostonrunner', '@bostonexplorer', '@bostontechie', '@collegeboston'],
        maybe: ['@cambridgestudent'],
        notGoing: []
      },
      requirements: ['Running shoes', 'Water bottle', 'Positive attitude'],
      tags: ['running', 'marathon', 'training', 'charles-river'],
      isPrivate: false,
      requiresApproval: false,
      status: 'upcoming',
      createdAt: '2024-02-05T09:00:00Z',
      updatedAt: '2024-02-12T08:30:00Z',
      photos: [],
      chat: []
    },
    {
      id: 'boston_event_4',
      title: 'Cambridge Tech Meetup & Coffee',
      description: 'Monthly meetup for Boston tech professionals. Network, share ideas, and discuss the latest in tech over great coffee near MIT.',
      type: 'meetup',
      category: 'Technology',
      relatedListId: 111,
      relatedItems: ['MIT', 'HubSpot', 'Wayfair', 'Tech Startup', 'Networking'],
      host: {
        username: '@bostontechie',
        avatar: '💻',
        avatarImage: undefined,
        badges: [
          {
            id: 'tech_leader',
            type: 'expert',
            name: 'Tech Leader',
            description: 'Technology industry expert',
            icon: '⚡',
            color: 'blue'
          }
        ]
      },
      dateTime: '2024-02-22T18:30:00Z',
      endDateTime: '2024-02-22T20:30:00Z',
      location: {
        type: 'in_person',
        address: 'Thinking Cup - 85 Newbury St',
        city: 'Boston',
        state: 'MA',
        country: 'US'
      },
      capacity: {
        min: 5,
        max: 30,
        current: 18
      },
      rsvp: {
        going: ['@bostontechie', '@cambridgestudent', '@collegeboston', '@bostoncoffee'],
        maybe: ['@bostonrunner', '@bostonart'],
        notGoing: []
      },
      requirements: ['Interest in technology', 'Bring business cards if you have them'],
      tags: ['tech', 'networking', 'startup', 'cambridge'],
      isPrivate: false,
      requiresApproval: false,
      status: 'upcoming',
      createdAt: '2024-02-01T16:00:00Z',
      updatedAt: '2024-02-12T17:45:00Z',
      photos: [],
      chat: []
    }
  ]);
  
  // High Five tracking
  const [highFiveData, setHighFiveData] = useState({
    totalHighFives: 12,
    weeklyUsed: 0,
    weeklyLimit: 1,
    lastResetDate: new Date().toISOString().split('T')[0]
  });

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Weekly high five reset effect
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastReset = new Date(highFiveData.lastResetDate);
    const todayDate = new Date(today);
    const daysSinceReset = Math.floor((todayDate.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceReset >= 7) {
      setHighFiveData(prev => ({
        ...prev,
        weeklyUsed: 0,
        lastResetDate: today
      }));
    }
  }, [highFiveData.lastResetDate]);

  useEffect(() => {
    if (currentView === 'messages') {
      setCurrentView('home');
      setShowRedditChat(true);
      setUnreadMessagesCount(0);
    }
  }, [currentView]);

  // Handle create event from list
  useEffect(() => {
    const handleCreateEventFromList = (event: any) => {
      const { listId, category, items } = event.detail;
      setCurrentView('events');
      // We'll need to pass this data to the events page to pre-fill the modal
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openCreateEventModal', { 
          detail: { listId, category, items } 
        }));
      }, 100);
    };

    window.addEventListener('createEventFromList', handleCreateEventFromList);
    
    // Manual tutorial trigger for testing
    const handleShowTutorial = () => setShowTutorial(true);
    window.addEventListener('showTutorial', handleShowTutorial);
    
    return () => {
      window.removeEventListener('createEventFromList', handleCreateEventFromList);
      window.removeEventListener('showTutorial', handleShowTutorial);
    };
  }, []);

  // Tutorial auto-show for new signups (disabled on mobile)
  useEffect(() => {
    // Check if we're on mobile (screen width < 1024px which is the lg breakpoint)
    const isMobile = window.innerWidth < 1024;

    if (!isMobile && isLoggedIn && !userProfile.hasSeenTutorial && !showTutorial) {
      // Check if tutorial was shown for THIS specific user (not just any user)
      const userSpecificKey = `tutorial-shown-${userProfile.id || userProfile.username}`;
      const hasShownTutorialForThisUser = sessionStorage.getItem(userSpecificKey);

      if (!hasShownTutorialForThisUser) {
        const timer = setTimeout(() => {
          debugLog('🎓 Auto-opening tutorial for new user:', userProfile.username);
          setShowTutorial(true);
          sessionStorage.setItem(userSpecificKey, 'true');
        }, 1500); // Show tutorial 1.5 seconds after signup

        return () => clearTimeout(timer);
      }
    }
  }, [isLoggedIn, userProfile.hasSeenTutorial, showTutorial, userProfile.id, userProfile.username]);

  // Scroll to top when view changes or user logs in
  useEffect(() => {
    const mainContent = document.querySelector('[data-main-content]');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [currentView, viewingProfile, isLoggedIn]);

  // Back to top button scroll detection - show when first list passes out of view
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Button appears when first list is NOT intersecting (out of view)
        setShowBackToTop(!entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: document.querySelector('[data-main-content]'),
      rootMargin: '0px',
      threshold: 0
    });

    // Wait a bit for the content to render, then find the first list
    const timeoutId = setTimeout(() => {
      const firstList = document.querySelector('[data-list-card]');
      if (firstList) {
        observer.observe(firstList);
        console.log('Observing first list element for back to top button');
      } else {
        console.log('First list element not found');
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [currentView, isLoggedIn]);

  // Swipe gesture detection for mobile genres sidebar with animation
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchCurrentX = 0;
    let isSwipingLocal = false;
    const sidebarWidth = typeof window !== 'undefined' ? window.innerWidth * 0.65 : 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;

      // Check if starting from left edge
      const startedFromLeftEdge = touchStartX < 50;

      if (startedFromLeftEdge) {
        isSwipingLocal = true;
        setIsSwiping(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwipingLocal) return;

      touchCurrentX = e.touches[0].clientX;
      const deltaX = touchCurrentX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;

      // Check if it's a horizontal swipe
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

      if (isHorizontalSwipe && deltaX > 0) {
        // Swiping right from edge to open
        const offset = Math.min(deltaX, sidebarWidth) - sidebarWidth;
        setGenresSidebarOffset(offset);

        if (deltaX > 20) {
          setShowMobileGenres(true);
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isSwipingLocal) return;

      isSwipingLocal = false;
      setIsSwiping(false);

      const deltaX = touchCurrentX - touchStartX;
      const deltaY = touchCurrentX - touchStartY;

      // Check if it's a horizontal swipe
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

      // Check if should open
      const startedFromLeftEdge = touchStartX < 50;
      const swipedRight = deltaX > 100;

      if (isHorizontalSwipe && startedFromLeftEdge && swipedRight) {
        setShowMobileGenres(true);
      }

      // Reset offset with animation
      setGenresSidebarOffset(0);
    };

    // Only add listeners on mobile (screen width < 1024px)
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isMobileDevice) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (isMobileDevice) {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  // Handle closing genres sidebar with animation
  const handleCloseGenres = () => {
    setIsClosingGenres(true);
    setTimeout(() => {
      setShowMobileGenres(false);
      setIsClosingGenres(false);
    }, 250); // Match animation duration
  };

  // Handle scroll to top
  const scrollToTop = () => {
    const mainContent = document.querySelector('[data-main-content]');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle list voting - NOW SAVES TO DATABASE! 🎉
  const handleListVote = async (listId: number, voteType: 'up' | 'down') => {
    debugLog('🗳️ Vote clicked:', { listId, voteType });
    
    // Save vote to database if user is logged in
    if (isLoggedIn && userProfile?.id) {
      debugLog('💾 Saving vote to database...', { listId, userId: userProfile.id, voteType });
      const result = await db.saveVote(listId, userProfile.id, voteType);
      if (result) {
        debugLog('✅ Vote saved to database!');
      } else {
        debugLog('❌ Failed to save vote to database');
      }
    }
    
    let upDelta = 0;
    let downDelta = 0;

    setAllLists(prevLists => 
      prevLists.map(list => {
        if (list.id === listId) {
          const currentVote = list.userVote;
          let newUpvotes = list.upvotes;
          let newDownvotes = list.downvotes;
          let newUserVote: 'up' | 'down' | null = voteType;

          if (currentVote === voteType) {
            // Remove vote if clicking same button
            newUserVote = null;
            if (voteType === 'up') {
              newUpvotes--;
              upDelta = -1;
            } else {
              newDownvotes--;
              downDelta = -1;
            }
          } else if (currentVote === null) {
            // Add new vote
            if (voteType === 'up') {
              newUpvotes++;
              upDelta = 1;
            } else {
              newDownvotes++;
              downDelta = 1;
            }
          } else {
            // Change vote
            if (voteType === 'up') {
              newUpvotes++;
              newDownvotes--;
              upDelta = 1;
              downDelta = -1;
            } else {
              newDownvotes++;
              newUpvotes--;
              upDelta = -1;
              downDelta = 1;
            }
          }

          const newVotes = newUpvotes - newDownvotes;
          const totalVotes = newUpvotes + newDownvotes;
          const downvoteRatio = totalVotes > 0 ? (newDownvotes / totalVotes) : 0;
          
          // Mark as rejected if downvote ratio >= 70% and has at least 10 total votes
          const isRejected = totalVotes >= 10 && downvoteRatio >= 0.7;

          return { 
            ...list, 
            votes: newVotes, 
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote,
            isRejected 
          };
        }
        return list;
      })
    );
    
    // Broadcast the vote to the real-time system
    if (upDelta !== 0 || downDelta !== 0) {
      broadcastVote(listId, {
        voteType,
        upDelta,
        downDelta
      });
    }
  };

  // Handle item voting
  const handleItemVote = (listId: number, itemIndex: number, voteType: 'up' | 'down') => {
    const key = `${listId}`;
    setItemVotes(prev => {
      const listVotes = prev[key] || {};
      const itemVoteData = listVotes[itemIndex] || { upvotes: 0, downvotes: 0, userVote: null };
      
      let newUpvotes = itemVoteData.upvotes;
      let newDownvotes = itemVoteData.downvotes;
      let newUserVote: 'up' | 'down' | null = voteType;

      if (itemVoteData.userVote === voteType) {
        // Remove vote
        newUserVote = null;
        if (voteType === 'up') newUpvotes--;
        else newDownvotes--;
      } else if (itemVoteData.userVote === null) {
        // Add vote
        if (voteType === 'up') newUpvotes++;
        else newDownvotes++;
      } else {
        // Change vote
        if (voteType === 'up') {
          newUpvotes++;
          newDownvotes--;
        } else {
          newDownvotes++;
          newUpvotes--;
        }
      }

      return {
        ...prev,
        [key]: {
          ...listVotes,
          [itemIndex]: {
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote
          }
        }
      };
    });
  };


  // Handle high five - ENHANCED SAFE VERSION WITH DATABASE
  const handleHighFive = async (listId: number) => {
    // Wrap EVERYTHING in try-catch to prevent app crashes
    try {
      debugLog('🙌 High five clicked!', { listId, isLoggedIn, userProfile });
      
      const targetList = allLists.find(list => list.id === listId);
      if (!targetList) {
        console.error('❌ Target list not found:', listId);
        return;
      }
      
      // Check weekly limit before proceeding (re-enabled)
      if (!targetList.userHighFived && highFiveData.weeklyUsed >= highFiveData.weeklyLimit) {
        alert(`You've used all ${highFiveData.weeklyLimit} Certi-fives this week! Certi-fives reset weekly to keep them special. Come back next week!`);
        return;
      }
      debugLog('✅ Weekly limit check passed');

      // Re-enable database operations (these were not causing the crash)
      if (isLoggedIn && userProfile?.id) {
        debugLog('💾 Saving high five to database...', { listId, userId: userProfile.id });
        try {
          const result = await db.saveHighFive(listId, userProfile.id);
          if (result) {
            debugLog('✅ High five saved to database!', result);
          } else {
            debugLog('⚠️ Database save returned null - continuing with local update');
          }
        } catch (dbError) {
          console.error('💥 Database error (continuing anyway):', dbError);
        }
      } else if (isLoggedIn && userProfile && !userProfile.id) {
        debugLog('🔄 Generating missing user ID...');
        const generateUserId = () => {
          if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
          }
          return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
        };
        
        const newId = generateUserId();
        setUserProfile(prev => ({ ...prev, id: newId }));
        debugLog('✅ Generated user ID:', newId);
        
        try {
          const result = await db.saveHighFive(listId, newId);
          if (result) {
            debugLog('✅ High five saved to database with new ID!', result);
          }
        } catch (dbError) {
          console.error('💥 Database error with new ID (continuing anyway):', dbError);
        }
      } else {
        debugLog('ℹ️ No database save - user not logged in or no profile');
      }
      
    } catch (error) {
      console.error('💥 Error in handleHighFive main block:', error);
      // Continue with local state update even if there are errors above
    }

    // Wrap all state updates in try-catch blocks
    try {
      debugLog('📝 Starting comprehensive state updates...');
      
      setAllLists(prevLists => 
        prevLists.map(list => {
          if (list.id === listId) {
            debugLog('🔄 Found target list, updating...', list.title);
            const newHighFived = !list.userHighFived;
            const newHighFives = newHighFived ? list.highFives + 1 : list.highFives - 1;
            
            debugLog('✅ List state update completed');
            return { ...list, highFives: newHighFives, userHighFived: newHighFived };
          }
          return list;
        })
      );
      
      // Add back high five tracking data (testing one feature at a time)
      try {
        debugLog('📊 Updating high five tracking data...');
        const currentList = allLists.find(list => list.id === listId);
        if (currentList) {
          const isGivingHighFive = !currentList.userHighFived;
          
          setHighFiveData(prev => {
            if (isGivingHighFive) {
              debugLog('📈 Incrementing counters');
              return {
                ...prev,
                totalHighFives: prev.totalHighFives + 1,
                weeklyUsed: prev.weeklyUsed + 1
              };
            } else {
              debugLog('📉 Decrementing counters');
              return {
                ...prev,
                totalHighFives: Math.max(0, prev.totalHighFives - 1),
                weeklyUsed: Math.max(0, prev.weeklyUsed - 1)
              };
            }
          });
          debugLog('✅ High five tracking updated');
        }
      } catch (trackingError) {
        console.error('💥 Error in high five tracking:', trackingError);
      }
      
      // User profile updates temporarily disabled - this was causing the crash
      debugLog('👤 User profile stats updates temporarily disabled (causing crashes)');
      
      debugLog('🎉 All state updates completed successfully!');
      
    } catch (stateError) {
      console.error('💥 Error in state updates:', stateError);
      // Even state updates are wrapped to prevent crashes
    }
  };

  // Handle edit list - open edit modal
  const handleEditList = (listId: number) => {
    const listToEdit = allLists.find(list => list.id === listId);
    if (listToEdit) {
      setEditingList(listToEdit);
      setShowEditModal(true);
    }
  };

  // Handle save edited list
  const handleSaveEditedList = async (updates: Partial<List>) => {
    if (!editingList) return;

    try {
      // Update the list in the state
      setAllLists(prevLists =>
        prevLists.map(list =>
          list.id === editingList.id
            ? { ...list, ...updates }
            : list
        )
      );

      // Close the modal
      setShowEditModal(false);
      setEditingList(null);

      // In a real app, you would also save to the backend here
      console.log('List updated:', { listId: editingList.id, updates });
    } catch (error) {
      console.error('Error saving list:', error);
      throw error;
    }
  };

  // Handle category click - navigate to search with category filter
  const handleCategoryClick = (category: string) => {
    console.log(`[page.tsx] handleCategoryClick called with: "${category}"`);
    setSelectedCategory(category);
    setCurrentView('discover');
  };

  // Handle category selection from sidebar - update filter and switch to discover view
  const handleCategorySelect = (category: string) => {
    console.log(`[page.tsx] handleCategorySelect called with: "${category}"`);
    setSelectedCategory(category);
    setCurrentView('discover');
  };

  // Handle title click - navigate to search with title filter
  const handleTitleClick = (title: string) => {
    setSearchQuery(title);
    setSelectedCategory('');
    setCurrentView('discover');
  };

  // Handle item click - navigate to search with item filter
  const handleItemClick = (itemName: string) => {
    setSearchQuery(itemName);
    setSelectedCategory('');
    setCurrentView('discover');
  };

  // Handle clear search from SearchPage
  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  // Handle clear search from dropdown
  const handleClearSearchDropdown = () => {
    setSearchQuery('');
    setSelectedCategory('');
    // Reset search settings to defaults
    setSearchSettings({
      category: '',
      sortBy: 'recent',
      viewMode: 'grid',
      showRecommended: false,
      showPopular: false,
      minVotes: 0,
      dateRange: 'all'
    });
  };

  // Handle search settings change
  const handleSearchSettingsChange = (newSettings: typeof searchSettings) => {
    setSearchSettings(newSettings);
    // Sync category with the global category state
    setSelectedCategory(newSettings.category);
    // Trigger search/discover view
    if (newSettings.category || searchQuery) {
      setCurrentView('discover');
    }
  };

  // Handle random list from search settings
  const handleRandomList = () => {
    // Clear search to show random list
    setSearchQuery('');
    setSelectedCategory('');
    setSearchSettings(prev => ({
      ...prev,
      category: '',
    }));
    setCurrentView('discover');
    // Trigger random list in SearchPage
    setRandomTrigger(prev => prev + 1);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('discover');
  };

  // Handle reject lists click - navigate to rejected lists view
  const handleRejectListsClick = () => {
    setCurrentView('rejected');
  };

  // Handle back from rejected lists
  const handleBackFromRejected = () => {
    setCurrentView('discover');
  };

  // Handle anti-social mode toggle
  const handleToggleAntiSocialMode = (enabled: boolean) => {
    setUserProfile(prev => ({ ...prev, antiSocialMode: enabled }));

    // If enabling anti-social mode and currently on a social view, redirect to home
    if (enabled && ['community', 'messages', 'groups', 'events'].includes(currentView)) {
      setCurrentView('home');
    }
  };

  // Handle follow/unfollow user
  const handleFollowUser = (username: string) => {
    const fullUsername = username.startsWith('@') ? username : `@${username}`;
    const isFollowing = followedUsers.includes(fullUsername);
    
    if (isFollowing) {
      // Unfollow user
      setFollowedUsers(followedUsers.filter(user => user !== fullUsername));
    } else {
      // Follow user
      setFollowedUsers([...followedUsers, fullUsername]);
    }
  };

  // Handle clearing all notifications (including mentions)  
  const handleClearAllNotifications = (notificationsToRemove?: Notification[]) => {
    // If no specific notifications provided, clear everything
    if (!notificationsToRemove) {
      debugLog('🗑️ Clear All - clearing everything (no params)');
      setNotifications([]);
      mentionNotifications.forEach(mention => {
        dismissMention(String(mention.id));
      });
      debugLog('✅ All notifications cleared');
      return;
    }
    
    debugLog('🗑️ Clear All called with:', notificationsToRemove.length, 'notifications');
    debugLog('📊 Stats - Regular:', notifications.length, '| Mentions:', mentionNotifications.length, '| Total:', allNotifications.length);
    
    // If being called with the full notifications array from dropdown, clear everything
    if (notificationsToRemove.length === allNotifications.length) {
      debugLog('🔄 Full clear detected - clearing everything');
      setNotifications([]);
      mentionNotifications.forEach(mention => {
        dismissMention(String(mention.id));
      });
      debugLog('✅ Full clear completed');
      return;
    }
    
    // Otherwise, handle partial clearing by ID
    debugLog('⚡ Partial clear by ID');
    const idsToRemove = new Set(notificationsToRemove.map(n => String(n.id)));
    
    // Clear matching regular notifications
    setNotifications(prev => prev.filter(n => !idsToRemove.has(String(n.id))));
    
    // Clear matching mention notifications
    mentionNotifications.forEach(mention => {
      if (idsToRemove.has(String(mention.id))) {
        dismissMention(String(mention.id));
      }
    });
    debugLog('✅ Partial clear completed');
  };

  // Handle marking all notifications as read (including mentions)
  const handleMarkAllNotificationsAsRead = (notificationsToMark: Notification[]) => {
    // Convert IDs to strings for consistent comparison
    const regularNotificationIds = notifications.map(n => String(n.id));
    const mentionNotificationIds = mentionNotifications.map(n => String(n.id));
    
    const regularToMark = notificationsToMark.filter(n => regularNotificationIds.includes(String(n.id)));
    const mentionToMark = notificationsToMark.filter(n => mentionNotificationIds.includes(String(n.id)));
    
    // Mark regular notifications as read
    if (regularToMark.length > 0) {
      setNotifications(notifications.map(n => 
        regularToMark.some(r => String(r.id) === String(n.id)) ? { ...n, unread: false } : n
      ));
    }
    
    // Mark mention notifications as read
    if (mentionToMark.length > 0) {
      mentionToMark.forEach(mention => {
        markMentionAsRead(String(mention.id));
      });
    }
  };

  // Handle notification click navigation
  // Combine regular notifications with mention notifications for display
  const allNotifications = userProfile.antiSocialMode ? [] : [
    ...notifications,
    ...mentionNotifications.map(mention => ({
      id: mention.id,
      type: 'mention' as const,
      user: `@${mention.user}`,
      content: mention.content,
      time: new Date(mention.timestamp).toLocaleString(),
      unread: !mention.isRead,
      mentionData: {
        context: mention.context,
        contextId: mention.contextId,
        listId: mention.listId,
        listTitle: mention.listTitle
      }
    }))
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const handleNotificationClick = (notification: Notification) => {
    debugLog('Notification clicked:', notification);
    switch (notification.type) {
      case 'like':
      case 'high_five':
        // Navigate to home feed to show the liked/high-fived list
        debugLog('Setting current view to home for like/high_five');
        setCurrentView('home');
        if (notification.listId) {
          debugLog('Setting highlighted item for listId:', notification.listId);
          setHighlightedItem({ type: 'list', id: notification.listId.toString() });
          setTimeout(() => {
            debugLog('Looking for like/high_five element:', `list-${notification.listId}`);
            const listElement = document.getElementById(`list-${notification.listId}`);
            debugLog('Found like/high_five element:', listElement);
            if (listElement) {
              listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              listElement.style.border = '2px solid #10B981';
              setTimeout(() => {
                listElement.style.border = '';
              }, 3000);
            }
          }, 100);
        }
        break;
      case 'comment':
        // Navigate to home feed to show the commented list
        setCurrentView('home');
        if (notification.listId) {
          setHighlightedItem({ type: 'list', id: notification.listId.toString() });
          setTimeout(() => {
            const listElement = document.getElementById(`list-${notification.listId}`);
            if (listElement) {
              listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              listElement.style.border = '2px solid #10B981';
              setTimeout(() => {
                listElement.style.border = '';
              }, 3000);
            }
          }, 100);
        }
        break;
      case 'mention':
        // Handle deep linking to specific mention locations
        if (notification.mentionData) {
          const { context, contextId, listId, listTitle } = notification.mentionData;
          
          switch (context) {
            case 'comment':
              // Navigate to home and highlight the specific list with the comment
              setCurrentView('home');
              setHighlightedItem({ type: 'comment', id: contextId });
              // Scroll to list if needed
              if (listId) {
                setTimeout(() => {
                  const listElement = document.getElementById(`list-${listId}`);
                  if (listElement) {
                    listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Flash the list to draw attention
                    listElement.style.border = '2px solid #10B981';
                    setTimeout(() => {
                      listElement.style.border = '';
                    }, 3000);
                  }
                }, 100);
              }
              break;
              
            case 'message':
              // Navigate to messages and open the conversation
              setCurrentView('messages');
              setChatTargetUser(notification.user.replace('@', ''));
              setShowRedditChat(true);
              setTimeout(() => setChatTargetUser(''), 100);
              setHighlightedItem({ type: 'message', id: contextId });
              break;
              
            case 'list':
              // Navigate to home and highlight the specific list
              setCurrentView('home');
              if (listId) {
                setHighlightedItem({ type: 'list', id: listId.toString() });
                setTimeout(() => {
                  const listElement = document.getElementById(`list-${listId}`);
                  if (listElement) {
                    listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    listElement.style.border = '2px solid #10B981';
                    setTimeout(() => {
                      listElement.style.border = '';
                    }, 3000);
                  }
                }, 100);
              }
              break;
              
            default:
              setCurrentView('discover');
          }
        } else if (notification.listId) {
          // Handle mention notifications with listId but no detailed mentionData
          setCurrentView('home');
          setHighlightedItem({ type: 'list', id: notification.listId.toString() });
          setTimeout(() => {
            const listElement = document.getElementById(`list-${notification.listId}`);
            if (listElement) {
              listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              listElement.style.border = '2px solid #10B981';
              setTimeout(() => {
                listElement.style.border = '';
              }, 3000);
            }
          }, 100);
        } else {
          // Fallback to discover view
          setCurrentView('discover');
        }
        break;
      case 'follow':
        // Navigate to community to see followers
        setCurrentView('community');
        break;
      default:
        setCurrentView('home');
        break;
    }
  };

  // Handle adding comments
  const handleAddComment = (listId: number, commentText: string, mentions?: string[], hashtags?: string[]) => {
    const newComment = {
      id: Date.now(),
      user: '@graz',
      content: commentText,
      time: 'just now',
      avatar: userProfile.avatarImage || userProfile.avatar,
      replies: []
    };

    // Add a small notification for the comment
    const list = allLists.find(l => l.id === listId);
    if (list) {
      setNotifications(prev => [{
        id: Date.now(),
        type: 'comment' as const,
        user: '@graz',
        content: `You commented on "${list.title}"`,
        time: new Date().toLocaleTimeString(),
        unread: false // Mark as read since it's user's own comment
      }, ...prev.slice(0, 19)]); // Keep only 20 notifications
    }

    // Handle mentions - trigger notifications
    if (mentions && mentions.length > 0) {
      const list = allLists.find(l => l.id === listId);
      handleUserMention(
        mentions,
        commentText,
        'comment',
        `comment-${Date.now()}`,
        listId,
        list?.title
      );
    }

    setAllLists(prevLists => 
      prevLists.map(list => 
        list.id === listId 
          ? { ...list, comments: [...list.comments, newComment] }
          : list
      )
    );

    // Update user stats and goals
    setUserProfile(prevProfile => {
      const updatedStats = {
        ...prevProfile.stats,
        commentsPosted: prevProfile.stats.commentsPosted + 1
      };

      // Update goals related to comments
      const updatedGoals = prevProfile.goals.map(goal => {
        if (goal.category === 'comments_made') {
          const newValue = updatedStats.commentsPosted;
          return {
            ...goal,
            currentValue: newValue,
            completed: newValue >= goal.targetValue,
            completedDate: newValue >= goal.targetValue && !goal.completed ? new Date().toISOString() : goal.completedDate
          };
        }
        return goal;
      });

      return {
        ...prevProfile,
        stats: updatedStats,
        goals: updatedGoals
      };
    });
  };

  // Mock user profiles for other users
  const getMockUserProfile = (username: string): User => {
    const mockProfiles: { [key: string]: Partial<User> } = {
      '@moviebuff': {
        username: 'moviebuff',
        bio: 'Film enthusiast with extensive knowledge of cinema classics and modern hits. Always discovering hidden gems!',
        avatar: '🎬',
        selectedGenres: ['Movies & TV', 'Documentaries'],
        followers: 234,
        following: 89,
        badges: [
          {
            id: 'expert',
            type: 'expert',
            name: 'Movie Expert',
            description: 'Cinema expertise',
            icon: '🎬',
            color: 'bg-amber-500',
            earnedDate: '2024-01-10'
          }
        ],
        stats: {
          listsCreated: 67,
          totalVotes: 1234,
          followers: 234,
          listsSaved: 45,
          commentsPosted: 89,
          highFivesGiven: 156,
          highFivesReceived: 89,
          trendsStarted: 12,
          firstToSave: 23
        }
      },
      '@musiclover': {
        username: 'musiclover',
        bio: 'Music curator specializing in indie and alternative genres. Always finding new artists to share!',
        avatar: '🎵',
        selectedGenres: ['Music', 'Indie'],
        followers: 189,
        following: 145,
        pronouns: 'she/her',
        homeCity: 'Austin, TX',
        badges: [
          {
            id: 'verified',
            type: 'verified',
            name: 'Verified',
            description: 'Verified user',
            icon: '✓',
            color: 'bg-blue-500',
            earnedDate: '2024-01-15'
          }
        ],
        stats: {
          listsCreated: 23,
          totalVotes: 567,
          followers: 189,
          listsSaved: 34,
          commentsPosted: 67,
          highFivesGiven: 89,
          highFivesReceived: 123,
          trendsStarted: 8,
          firstToSave: 15
        }
      },
      '@bookworm': {
        username: 'bookworm',
        bio: 'Literature expert and community moderator with passion for fiction and non-fiction alike.',
        avatar: '📚',
        selectedGenres: ['Books', 'Literature'],
        followers: 167,
        following: 92,
        pronouns: 'they/them',
        homeCity: 'Portland, OR',
        badges: [
          {
            id: 'expert',
            type: 'expert',
            name: 'Book Expert',
            description: 'Literature expertise',
            icon: '📚',
            color: 'bg-green-500',
            earnedDate: '2024-01-05'
          },
          {
            id: 'moderator',
            type: 'moderator',
            name: 'Moderator',
            description: 'Community moderator',
            icon: '🛡️',
            color: 'bg-red-500',
            earnedDate: '2024-01-20'
          }
        ],
        stats: {
          listsCreated: 31,
          totalVotes: 789,
          followers: 167,
          listsSaved: 56,
          commentsPosted: 123,
          highFivesGiven: 78,
          highFivesReceived: 145,
          trendsStarted: 6,
          firstToSave: 19
        }
      }
    };

    const baseProfile = mockProfiles[username] || {
      username: username.replace('@', ''),
      bio: 'Community member sharing great recommendations',
      avatar: username.replace('@', '').charAt(0).toUpperCase(),
      selectedGenres: ['General'],
      followers: 45,
      following: 32,
      pronouns: Math.random() > 0.5 ? ['he/him', 'she/her', 'they/them'][Math.floor(Math.random() * 3)] : undefined,
      homeCity: Math.random() > 0.6 ? ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Seattle, WA', 'Miami, FL'][Math.floor(Math.random() * 5)] : undefined,
      badges: [],
      stats: {
        listsCreated: 12,
        totalVotes: 123,
        followers: 45,
        listsSaved: 23,
        commentsPosted: 34,
        highFivesGiven: 45,
        highFivesReceived: 67,
        trendsStarted: 2,
        firstToSave: 8
      }
    };

    return {
      ...userProfile, // Use current user as base
      ...baseProfile,
      avatarImage: null,
      favoriteTopics: baseProfile.selectedGenres?.map(g => g.toLowerCase()) || ['general'],
      achievements: ['first_steps'],
      selectedBadge: baseProfile.badges?.[0] || null,
      goals: [],
      seasonalReminders: [],
      joinDate: '2024-01-01',
      isEarlyAdopter: false,
      hasSeenTutorial: true,
      claimedRewards: []
    } as User;
  };

  // Handle author click - navigate to profile
  const handleAuthorClick = (author: string) => {
    debugLog('Author clicked:', author); // Debug log
    setViewingProfile(author); // Set which user's profile we're viewing
    setCurrentView('profile');
  };

  // Handle item bookmark
  const handleItemBookmark = (listId: number, itemIndex: number) => {
    const bookmarkKey = `${listId}-${itemIndex}`;
    const list = allLists.find(l => l.id === listId);
    
    if (!list) return;
    
    if (bookmarkState[bookmarkKey]) {
      // Remove bookmark
      setBookmarkedItems(prev => prev.filter(item => item.id !== bookmarkKey));
      setBookmarkState(prev => ({ ...prev, [bookmarkKey]: false }));
    } else {
      // Add bookmark
      const newBookmark: BookmarkedItem = {
        id: bookmarkKey,
        listId,
        itemIndex,
        itemName: list.items[itemIndex],
        listTitle: list.title,
        listAuthor: list.author,
        listCategory: list.category,
        bookmarkedAt: new Date().toISOString()
      };
      
      setBookmarkedItems(prev => [...prev, newBookmark]);
      setBookmarkState(prev => ({ ...prev, [bookmarkKey]: true }));
      
      // Update user stats
      setUserProfile(prevProfile => ({
        ...prevProfile,
        stats: {
          ...prevProfile.stats,
          // Add bookmark count if we want to track it
        }
      }));
    }
  };

  // Handle trying an item (when user rates a bookmarked item)
  const handleTryItem = (listId: number, itemIndex: number, rating: 'up' | 'down') => {
    const list = allLists.find(l => l.id === listId);
    if (!list) return;

    // Create history item
    const historyItem = {
      id: `${listId}-${itemIndex}-${Date.now()}`,
      type: 'item' as const,
      action: 'tried' as const,
      listId,
      itemIndex,
      itemName: list.items[itemIndex],
      listTitle: list.title,
      listAuthor: list.author,
      listCategory: list.category,
      rating,
      savedAt: new Date().toISOString(),
      triedAt: new Date().toISOString()
    };

    // Add to history
    setHistoryItems(prev => [...prev, historyItem]);

    // Remove from bookmarks
    const bookmarkKey = `${listId}-${itemIndex}`;
    setBookmarkedItems(prev => prev.filter(item => item.id !== bookmarkKey));
    setBookmarkState(prev => ({ ...prev, [bookmarkKey]: false }));

  };

  // Handle adding item to history
  const handleAddToHistory = (listId: number, itemIndex: number) => {
    const list = allLists.find(l => l.id === listId);
    if (!list) return;

    // Create history item for item interaction
    const historyItem: HistoryItem = {
      id: `${listId}-${itemIndex}-${Date.now()}`,
      type: 'item',
      listId,
      itemIndex,
      itemName: list.items[itemIndex],
      listTitle: list.title,
      listAuthor: list.author,
      listCategory: list.category,
      action: 'tried',
      savedAt: new Date().toISOString(),
      triedAt: new Date().toISOString()
    };

    // Add to history
    setHistoryItems(prev => [...prev, historyItem]);

    // Remove from bookmarks
    const bookmarkKey = `${listId}-${itemIndex}`;
    setBookmarkedItems(prev => prev.filter(item => item.id !== bookmarkKey));
    setBookmarkState(prev => ({ ...prev, [bookmarkKey]: false }));
  };

  // Enhanced handler for list saves that also tracks in history
  const handleSaveListToHistory = (listId: number, isCurrentlySaved: boolean) => {
    const list = allLists.find(l => l.id === listId);
    if (!list) return;

    const action = isCurrentlySaved ? 'unsaved' : 'saved';

    // Create history item for list save/unsave
    const historyItem: HistoryItem = {
      id: `list-${listId}-${Date.now()}`,
      type: 'list',
      listId,
      listTitle: list.title,
      listAuthor: list.author,
      listCategory: list.category,
      action,
      savedAt: new Date().toISOString()
    };

    // Add to history
    setHistoryItems(prev => [...prev, historyItem]);

    // Update saved lists
    setSavedLists(prev =>
      isCurrentlySaved
        ? prev.filter(id => id !== listId)
        : [...prev, listId]
    );
  };

  const handleRateList = (listId: number, rating: 'up' | 'down') => {
    const list = allLists.find((l) => l.id === listId);
    if (!list) return;

    const historyItem: HistoryItem = {
      id: `rated-list-${listId}-${Date.now()}`,
      type: 'list',
      listId,
      listTitle: list.title,
      listAuthor: list.author,
      listCategory: list.category,
      action: 'rated',
      rating,
      savedAt: new Date().toISOString()
    };

    setHistoryItems((prev) => [...prev, historyItem]);

    setSavedLists((prev) => prev.filter((id) => id !== listId));
  };

  // Handle claiming early adopter rewards
  const handleClaimReward = (rewardId: string) => {
    debugLog('Claiming reward:', rewardId);
    
    // Add reward to claimed rewards list
    setUserProfile(prev => ({
      ...prev,
      claimedRewards: [...prev.claimedRewards, rewardId]
    }));
    
    // Handle different reward types
    switch (rewardId) {
        
      case 'trend_setter':
        // This reward is automatically claimed when user meets requirements
        break;
        
      case 'beta_tester':
        // This reward gives access to beta features
        break;
        
      case 'priority_support':
        // This reward provides priority support
        break;
        
      default:
        debugLog('Unknown reward type:', rewardId);
    }
    
    // Show success notification with reward-specific message
    const rewardNames: { [key: string]: string } = {
      'trend_setter': 'Trend Setter',
      'beta_tester': 'Beta Features Access',
      'priority_support': 'Priority Support'
    };
    
    setNotifications(prev => [{
      id: Date.now(),
      type: 'high_five',
      user: 'Five Alike',
      content: `successfully claimed ${rewardNames[rewardId] || 'an early adopter reward'}!`,
      time: 'just now',
      unread: true
    }, ...prev]);
  };

  // Handle seasonal list creation
  const handleCreateSeasonalList = (reminder: any) => {
    // Navigate to list creation with pre-filled category
    setSelectedCategory(reminder.category);
    setShowNewListForm(true);
  };

  // Handle tutorial completion
  const handleTutorialComplete = () => {
    debugLog('🎓 Tutorial completed - closing permanently');
    setShowTutorial(false);
    setUserProfile(prev => ({ ...prev, hasSeenTutorial: true }));
    // Clear user-specific session flags
    const userSpecificKey = `tutorial-shown-${userProfile.id || userProfile.username}`;
    sessionStorage.removeItem(userSpecificKey);
    sessionStorage.setItem(`tutorial-completed-${userProfile.id || userProfile.username}`, 'true');
  };

  // Handle event RSVP
  const handleJoinEvent = (eventId: string, status: 'going' | 'maybe' | 'not_going') => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          const currentUsername = userProfile.username;
          let newRSVP = { ...event.rsvp };
          let newCurrent = event.capacity.current;

          // Remove user from all RSVP lists first
          newRSVP.going = newRSVP.going.filter(username => username !== currentUsername);
          newRSVP.maybe = newRSVP.maybe.filter(username => username !== currentUsername);
          newRSVP.notGoing = newRSVP.notGoing.filter(username => username !== currentUsername);

          // Check if user was previously going or maybe (affects capacity)
          const wasAttending = event.rsvp.going.includes(currentUsername) || event.rsvp.maybe.includes(currentUsername);

          // Add user to appropriate list
          if (status === 'going') {
            newRSVP.going.push(currentUsername);
            if (!wasAttending) newCurrent++;
          } else if (status === 'maybe') {
            newRSVP.maybe.push(currentUsername);
            if (!wasAttending) newCurrent++;
          } else {
            newRSVP.notGoing.push(currentUsername);
            if (wasAttending) newCurrent--;
          }

          return {
            ...event,
            rsvp: newRSVP,
            capacity: {
              ...event.capacity,
              current: Math.max(0, newCurrent)
            }
          };
        }
        return event;
      })
    );
  };

  // Handle header navigation functions
  const handleNavigateToProfile = () => {
    setViewingProfile(''); // Clear viewing profile to show own profile
    setCurrentView('profile');
  };

  const handleNavigateToFavorites = () => {
    setCurrentView('favorites');
  };

  const handleShowAccountSettings = () => {
    setShowAccountSettings(true);
  };

  const handleShowCommunityGuidelines = () => {
    setShowCommunityGuidelines(true);
  };

  // Handle user mentions - trigger notifications
  const handleUserMention = (mentionedUsers: string[], content: string, context: 'comment' | 'message' | 'list', contextId: string, listId?: number, listTitle?: string) => {
    mentionedUsers.forEach(username => {
      // Don't notify if user mentioned themselves
      if (username !== userProfile.username) {
        addMentionNotification({
          type: 'mention',
          user: userProfile.username,
          content: content,
          context: context,
          contextId: contextId,
          listId: listId,
          listTitle: listTitle
        });

        // Also add to main notifications for visibility
        setNotifications(prev => [{
          id: Date.now() + Math.random(),
          type: 'mention',
          user: userProfile.username,
          content: `@${userProfile.username} mentioned you: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`,
          time: new Date().toLocaleString(),
          unread: true
        }, ...prev]);
      }
    });
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('five-alike-user');
      // Clear old generic tutorial session flags
      sessionStorage.removeItem('tutorial-shown');
      sessionStorage.removeItem('tutorial-completed');
    }

    // Reset authentication state
    setIsLoggedIn(false);

    // Reset user profile to default
    const generateUserId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
    };

    setUserProfile({
      id: generateUserId(),
      username: 'guest',
      bio: 'Exploring life through recommendations and discoveries!',
      avatar: '⭐',
      avatarImage: null,
      favoriteTopics: ['music', 'games'],
      selectedGenres: ['Music', 'Games'],
      achievements: [],
      antiSocialMode: false,
      badges: [],
      selectedBadge: null,
      goals: [],
      seasonalReminders: [],
      followers: 0,
      following: 0,
      joinDate: new Date().toISOString(),
      isEarlyAdopter: false,
      hasSeenTutorial: false,
      claimedRewards: [],
      earlyAdopterRewards: [],
      stats: {
        listsCreated: 0,
        totalVotes: 0,
        followers: 0,
        listsSaved: 0,
        commentsPosted: 0,
        highFivesGiven: 0,
        highFivesReceived: 0,
        trendsStarted: 0,
        firstToSave: 0
      },
      analytics: {
        tasteProfile: {
          categoryBreakdown: {},
          genrePreferences: {},
          votingPatterns: {
            upvotesByCategory: {},
            downvotesByCategory: {}
          },
          discoveryHistory: []
        },
        influence: {
          totalSavesReceived: 0,
          totalHighFivesReceived: 0,
          listImpact: [],
          trendsettingScore: 0,
          firstDiscoveries: 0
        }
      }
    });
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
  };

  // Force clear all notifications - direct approach
  const handleForceClearAll = () => {
    debugLog('💥 FORCE CLEAR ALL TRIGGERED');
    debugLog('📊 Before clear - Regular notifications:', notifications.length);
    debugLog('📊 Before clear - Mention notifications:', mentionNotifications.length);
    debugLog('📊 Before clear - Combined allNotifications:', allNotifications.length);
    
    // Clear regular notifications completely
    debugLog('🗑️ Clearing regular notifications...');
    setNotifications([]);
    
    // Clear ALL mention notifications by getting a fresh copy and clearing each one
    debugLog('🗑️ Clearing mention notifications...');
    const currentMentions = [...mentionNotifications];
    currentMentions.forEach(mention => {
      debugLog('🗑️ Dismissing mention ID:', mention.id);
      dismissMention(String(mention.id));
    });
    
    // Also call the original clear handler as backup
    debugLog('🗑️ Calling original clear handler as backup...');
    handleClearAllNotifications();
    
    debugLog('✅ FORCE CLEAR COMPLETED - should have cleared everything');
  };

  const handleOpenMessage = (username: string) => {
    setChatTargetUser(username);
    setShowRedditChat(true);
    // When opening chat, mark all messages as read
    setUnreadMessagesCount(0);
    // Clear the target after a brief delay to allow the chat to process it
    setTimeout(() => setChatTargetUser(''), 100);
  };

  if (!isLoggedIn) {
    return (
      <SimpleAuth
        onUserChange={(user) => {
          if (user) {
            setUserProfile(prevProfile => ({
              ...prevProfile,
              ...user,
              analytics: user.analytics || prevProfile.analytics,
              stats: user.stats || prevProfile.stats
            }));
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        }}
      />
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeFeed
              selectedFeedTab={selectedFeedTab}
              setSelectedFeedTab={setSelectedFeedTab}
              allLists={allLists}
              followedUsers={followedUsers}
              itemVotes={itemVotes}
              onListVote={handleListVote}
              onItemVote={handleItemVote}
              onHighFive={handleHighFive}
              onCategoryClick={handleCategoryClick}
              onTitleClick={handleTitleClick}
              onAddComment={handleAddComment}
              onAuthorClick={handleAuthorClick}
              onMessage={handleOpenMessage}
              onItemBookmark={handleItemBookmark}
              onEditList={handleEditList}
              bookmarkState={bookmarkState}
              highlightedItem={highlightedItem}
              onClearHighlight={() => setHighlightedItem(null)}
              savedLists={savedLists}
              setSavedLists={setSavedLists}
              userProfile={userProfile}
              onSearch={handleSearch}
              searchSettings={searchSettings}
              onSearchSettingsChange={handleSearchSettingsChange}
              onRandomList={handleRandomList}
              onClearSearch={handleClearSearch}
          />
        );
      case 'discover':
        return (
          <UnifiedDiscovery
            key={`discover-${selectedCategory}`}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            allLists={allLists}
            itemVotes={itemVotes}
            onListVote={handleListVote}
            onItemVote={handleItemVote}
            onHighFive={handleHighFive}
            onTitleClick={handleTitleClick}
            onAuthorClick={handleAuthorClick}
            onMessage={handleOpenMessage}
            onItemBookmark={handleItemBookmark}
            bookmarkState={bookmarkState}
            savedLists={savedLists}
            setSavedLists={setSavedLists}
            initialCategory={selectedCategory}
            initialQuery={searchQuery}
            onRejectListsClick={handleRejectListsClick}
            onClearSearch={handleClearSearch}
            onAddComment={handleAddComment}
            onCategorySelect={handleCategoryClick}
            searchSettings={searchSettings}
            randomTrigger={randomTrigger}
            selectedTrendingTab={selectedTrendingTab}
            setSelectedTrendingTab={setSelectedTrendingTab}
            onCategoryClick={handleCategoryClick}
            events={events}
            onJoinEvent={handleJoinEvent}
            onBack={() => setCurrentView('home')}
            antiSocialMode={userProfile.antiSocialMode}
          />
        );
      case 'trending':
        return (
          <TrendingLists
            selectedTrendingTab={selectedTrendingTab}
            setSelectedTrendingTab={setSelectedTrendingTab}
            allLists={allLists}
            itemVotes={itemVotes}
            onListVote={handleListVote}
            onItemVote={handleItemVote}
            onHighFive={handleHighFive}
            onCategoryClick={handleCategoryClick}
            onTitleClick={handleTitleClick}
            onAuthorClick={handleAuthorClick}
            onMessage={handleOpenMessage}
            onItemBookmark={handleItemBookmark}
            bookmarkState={bookmarkState}
            savedLists={savedLists}
            setSavedLists={setSavedLists}
            antiSocialMode={userProfile.antiSocialMode}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'local':
        return (
          <LocalDiscovery
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            allLists={allLists}
            itemVotes={itemVotes}
            onListVote={handleListVote}
            onItemVote={handleItemVote}
            onHighFive={handleHighFive}
            onTitleClick={handleTitleClick}
            onAuthorClick={handleAuthorClick}
            onMessage={handleOpenMessage}
            onItemBookmark={handleItemBookmark}
            bookmarkState={bookmarkState}
            savedLists={savedLists}
            setSavedLists={setSavedLists}
            onAddComment={handleAddComment}
            events={events}
            onJoinEvent={handleJoinEvent}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'favorites':
        return (
          <Favorites
            allLists={allLists}
            savedLists={savedLists}
            setSavedLists={setSavedLists}
            onSaveListToHistory={handleSaveListToHistory}
            itemVotes={itemVotes}
            onListVote={handleListVote}
            onHighFive={handleHighFive}
            onCategoryClick={handleCategoryClick}
            onTitleClick={handleTitleClick}
            onAuthorClick={handleAuthorClick}
            onMessage={handleOpenMessage}
            onItemBookmark={handleItemBookmark}
            bookmarkState={bookmarkState}
            bookmarkedItems={bookmarkedItems}
            onRemoveBookmark={handleItemBookmark}
            onItemClick={handleItemClick}
            onTryItem={handleTryItem}
            onAddToHistory={handleAddToHistory}
            historyItems={historyItems}
            onBack={() => setCurrentView('home')}
            antiSocialMode={userProfile.antiSocialMode}
            onRateList={handleRateList}
          />
        );
      case 'messages':
        return null;
      case 'community':
        return <Community followedUsers={followedUsers} setFollowedUsers={setFollowedUsers} onAuthorClick={handleAuthorClick} onMessage={handleOpenMessage} onBack={() => setCurrentView('home')} />;
      case 'groups':
        return <Groups userProfile={userProfile} allLists={allLists} onBack={() => setCurrentView('home')} onTitleClick={handleTitleClick} />;
      case 'podcast':
        return <Podcast onBack={() => setCurrentView('home')} />;
      case 'profile':
        const profileToShow = viewingProfile ? getMockUserProfile(viewingProfile) : userProfile;
        const isOwnProfile = !viewingProfile;

        // Debug logging
        debugLog('Original userProfile:', userProfile);
        debugLog('profileToShow:', profileToShow);

        // Test if the fix worked
        if (!profileToShow?.analytics || !profileToShow?.stats) {
          return (
            <div className="p-8">
              <h1>Profile Data Still Missing</h1>
              <p>The fix didn&apos;t work yet. Data check:</p>
              <pre className="bg-gray-100 p-4 rounded text-xs">
                Original userProfile keys: {Object.keys(userProfile || {}).join(', ')}
                <br /><br />
                ProfileToShow data:
                {JSON.stringify({
                  hasProfile: !!profileToShow,
                  username: profileToShow?.username,
                  hasAnalytics: !!profileToShow?.analytics,
                  hasStats: !!profileToShow?.stats,
                  statsKeys: profileToShow?.stats ? Object.keys(profileToShow.stats) : 'none',
                  analyticsKeys: profileToShow?.analytics ? Object.keys(profileToShow.analytics) : 'none',
                  viewingProfile,
                  isOwnProfile
                }, null, 2)}
              </pre>
              <button
                onClick={() => setCurrentView('home')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Back to Home
              </button>
            </div>
          );
        }

        // If we get here, the data is present - restore the Profile component
        return (
          <ProfileErrorBoundary username={profileToShow?.username}>
            <Profile
              userProfile={profileToShow}
              setUserProfile={isOwnProfile ? setUserProfile : () => {}}
              highFiveData={highFiveData}
              allLists={allLists}
              itemVotes={itemVotes}
              onListVote={handleListVote}
              onItemVote={handleItemVote}
              onHighFive={handleHighFive}
              onTitleClick={handleTitleClick}
              onNavigateToDiscover={() => setCurrentView('discover')}
              savedLists={savedLists}
              setSavedLists={setSavedLists}
              followedUsers={followedUsers}
              onFollowUser={handleFollowUser}
              onCreateSeasonalList={handleCreateSeasonalList}
              onClaimReward={handleClaimReward}
              onOpenMessage={handleOpenMessage}
              onAuthorClick={handleAuthorClick}
              viewingProfile={viewingProfile}
              onBack={() => setCurrentView('home')}
              antiSocialMode={profileToShow.antiSocialMode}
            />
          </ProfileErrorBoundary>
        );
      case 'rejected':
        return (
          <RejectLists
            allLists={allLists}
            itemVotes={itemVotes}
            onListVote={handleListVote}
            onItemVote={handleItemVote}
            onHighFive={handleHighFive}
            onTitleClick={handleTitleClick}
            onAuthorClick={handleAuthorClick}
            onMessage={handleOpenMessage}
            onItemBookmark={handleItemBookmark}
            bookmarkState={bookmarkState}
            savedLists={savedLists}
            setSavedLists={setSavedLists}
            onBackClick={handleBackFromRejected}
            antiSocialMode={userProfile.antiSocialMode}
          />
        );
      case 'events':
        return (
          <SocialEvents
            events={events}
            setEvents={setEvents}
            userProfile={userProfile}
            onJoinEvent={handleJoinEvent}
            allLists={allLists}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'leaderboard':
        return <LeaderboardPage
          onBack={() => setCurrentView('home')}
          onAuthorClick={handleAuthorClick}
          onTitleClick={handleTitleClick}
          onCategoryClick={handleCategoryClick}
        />
      case 'history':
        return (
          <History
            historyItems={historyItems}
            onItemClick={handleItemClick}
            onTitleClick={handleTitleClick}
            onAuthorClick={handleAuthorClick}
          />
        );
      default:
        return <div className="p-8 text-center">View not implemented yet</div>;
    }
  };

  return (
    <>
      <div className="transparent-top-bar"></div>
      <div className="min-h-screen bg-white dark:bg-gray-800">
        <TopHeader 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={allNotifications}
          setNotifications={setNotifications}
          onClearAllNotifications={handleClearAllNotifications}
          onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
          onNotificationClick={handleNotificationClick}
          onForceClearAll={handleForceClearAll}
          userProfile={userProfile}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToSaved={handleNavigateToFavorites}
          onShowAccountSettings={handleShowAccountSettings}
          onShowCommunityGuidelines={handleShowCommunityGuidelines}
          onLogout={handleLogout}
          onNavigateToHome={handleNavigateToHome}
          onToggleAntiSocialMode={handleToggleAntiSocialMode}
          onSearch={(query) => {
            setSearchQuery(query);
            setSelectedCategory('');
            setCurrentView('discover');
          }}
          searchSettings={searchSettings}
          onSearchSettingsChange={handleSearchSettingsChange}
          onRandomList={handleRandomList}
          onClearSearch={handleClearSearchDropdown}
        />
        
        <div className="flex">
        {/* Permanent Left Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="fixed left-0 top-24 h-[calc(100vh-6rem)] w-64">
            <Navigation 
              currentView={currentView}
              setCurrentView={(view: ViewType) => {
                debugLog('Setting current view to:', view);
                // Redirect social views to home when anti-social mode is enabled
                if (userProfile.antiSocialMode && ['community', 'messages', 'groups', 'events'].includes(view)) {
                  debugLog('Redirecting to home due to anti-social mode');
                  setCurrentView('home');
                  return;
                }
                setCurrentView(view);
                if (view === 'messages') {
                  setUnreadMessagesCount(0);
                }
              }}
              unreadMessagesCount={unreadMessagesCount}
              antiSocialMode={userProfile.antiSocialMode}
              setShowNewListForm={setShowNewListForm}
            />
          </div>
        </div>
        
        {/* Left Vertical Separator */}
        <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-700 flex-shrink-0 fixed left-64 top-0 h-screen"></div>
        
        {/* Main Content Area - Fixed width to prevent expansion */}
        <div data-main-content className="fixed left-0 lg:left-80 top-20 right-0 lg:right-64 bottom-0 lg:bottom-0 pb-16 lg:pb-0 overflow-y-auto overflow-x-hidden pr-1 bg-transparent pt-8 z-30">
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className={`fixed top-28 right-72 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 z-50 ${
              showBackToTop
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            title="Back to Top"
          >
            <ChevronUp size={24} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" />
          </button>
          <div className="max-w-4xl mx-auto bg-transparent px-0 lg:px-8 lg:pr-24">
            <main className="bg-transparent">
              {renderCurrentView()}
            </main>
          </div>
        </div>
        
        {/* Right Vertical Separator - Hidden on mobile */}
        <div className="hidden lg:block w-px bg-gray-200 dark:bg-gray-700 flex-shrink-0 fixed right-64 top-0 h-screen z-20"></div>

        {/* Right Sidebar - Communities - Hidden on mobile */}
        <div className="hidden lg:block">
          <CommunitiesSidebar
            allLists={allLists}
            onCategorySelect={handleCategorySelect}
            onRejectListsClick={handleRejectListsClick}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      {showNewListForm && (
        <CreateListModal
          setShowNewListForm={setShowNewListForm}
          allLists={allLists}
          setAllLists={setAllLists}
        />
      )}

      {showEditModal && editingList && (
        <EditListModal
          list={editingList}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingList(null);
          }}
          onSave={handleSaveEditedList}
        />
      )}

      {showTutorial && (
        <TutorialPopup onClose={handleTutorialComplete} />
      )}

      {showAccountSettings && (
        <AccountSettings 
          onClose={() => setShowAccountSettings(false)}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          onShowTutorial={() => setShowTutorial(true)}
        />
      )}

      {showCommunityGuidelines && (
        <CommunityGuidelines 
          onClose={() => setShowCommunityGuidelines(false)}
        />
      )}

      {/* Mobile Genres Sidebar - Reddit Style */}
      {showMobileGenres && (
        <div className="lg:hidden fixed inset-0 z-50" onClick={handleCloseGenres}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50 animate-fadeIn"></div>

          {/* Sidebar - covers left half of screen, full height */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-[65%] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto ${
              isSwiping
                ? ''
                : isClosingGenres
                  ? 'animate-slideOutLeft'
                  : 'animate-slideInLeft'
            }`}
            style={{
              transform: isSwiping ? `translateX(${genresSidebarOffset}px)` : undefined,
              transition: isSwiping ? 'none' : undefined
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4 z-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Genres</h2>
            </div>

            {/* Genre List */}
            <div className="px-2 py-2">
              {categories.map((category) => {
                const listCount = allLists.filter(list => list.category === category && !list.isRejected).length;
                const IconComponent = categoryIcons[category] || BookOpen;
                const isSelected = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentView('discover');
                      handleCloseGenres();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent size={22} className={isSelected ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'} />
                      <span className="text-base font-medium">{category}</span>
                    </div>
                    <span className={`text-sm ${isSelected ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {listCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Modal */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn" onClick={() => setShowMobileMenu(false)}>
          <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl max-h-[60vh] animate-slideUp" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <ChevronUp size={20} />
                </button>
              </div>

              <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                <button
                  onClick={() => {
                    const shouldShow = !showNotifications;
                    setShowNotifications(shouldShow);
                    setShowMobileMenu(false);
                    setShowMobileGenres(false);
                    setShowRedditChat(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Bell size={20} className="text-gray-700 dark:text-gray-300" />
                    <span className="text-base text-gray-900 dark:text-white">Notifications</span>
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 font-medium">
                      {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setShowRedditChat(!showRedditChat);
                    setShowMobileMenu(false);
                    setShowMobileGenres(false);
                    setShowNotifications(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <MessageCircle size={20} className="text-gray-700 dark:text-gray-300" />
                    <span className="text-base text-gray-900 dark:text-white">Chat</span>
                  </div>
                  {unreadMessagesCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 font-medium">
                      {unreadMessagesCount > 99 ? '99+' : unreadMessagesCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    setCurrentView('trending');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <TrendingUp size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="text-base text-gray-900 dark:text-white">Trending</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('leaderboard');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Trophy size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="text-base text-gray-900 dark:text-white">Leaderboards</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('community');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Users size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="text-base text-gray-900 dark:text-white">Friends</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('groups');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Layers size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="text-base text-gray-900 dark:text-white">Groups</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('events');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Calendar size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="text-base text-gray-900 dark:text-white">Social Events</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentView('podcast');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Headphones size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="text-base text-gray-900 dark:text-white">Podcast</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex justify-around items-center h-16 px-1">
          {/* Home */}
          <button
            onClick={() => {
              setCurrentView('home');
              setShowMobileMenu(false);
              setShowMobileGenres(false);
              setShowRedditChat(false);
              setShowNotifications(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              currentView === 'home'
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <HomeIcon size={22} />
            <span className="text-xs mt-1">Home</span>
          </button>

          {/* Menu */}
          <button
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
              setShowMobileGenres(false);
              setShowRedditChat(false);
              setShowNotifications(false);
            }}
            className="flex flex-col items-center justify-center flex-1 py-2 text-gray-600 dark:text-gray-400"
          >
            <Menu size={22} />
            <span className="text-xs mt-1">Menu</span>
          </button>

          {/* Create - Green Button */}
          <button
            onClick={() => {
              setShowNewListForm(true);
              setShowMobileMenu(false);
              setShowMobileGenres(false);
              setShowRedditChat(false);
              setShowNotifications(false);
            }}
            className="flex flex-col items-center justify-center flex-1 py-3 bg-green-500 text-white rounded-lg mx-1 shadow-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={26} />
            <span className="text-xs mt-1 font-semibold">Create</span>
          </button>

          {/* Local */}
          <button
            onClick={() => {
              setCurrentView('local');
              setShowMobileMenu(false);
              setShowMobileGenres(false);
              setShowRedditChat(false);
              setShowNotifications(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              currentView === 'local'
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <MapPin size={22} />
            <span className="text-xs mt-1">Local</span>
          </button>

          {/* Saved */}
          <button
            onClick={() => {
              setCurrentView('favorites');
              setShowMobileMenu(false);
              setShowMobileGenres(false);
              setShowRedditChat(false);
              setShowNotifications(false);
            }}
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              currentView === 'favorites'
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Bookmark size={22} />
            <span className="text-xs mt-1">Saved</span>
          </button>
        </div>
      </nav>

      {/* Floating Chat Button - Desktop only */}
      {/* Floating Chat Button - Desktop only */}
      {!showRedditChat && (
        <button
          onClick={() => setShowRedditChat(true)}
          className="hidden lg:flex fixed bottom-6 right-72 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg items-center justify-center transition-all duration-200 hover:scale-105 z-40"
          title="Open Chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Reddit-style Chat */}
      <RedditChat
        isOpen={showRedditChat}
        onClose={() => setShowRedditChat(false)}
        openChatWithUser={chatTargetUser}
        onAuthorClick={handleAuthorClick}
      />


      </div>
    </>
  );
}

export default function Home() {
  return (
    <RealTimeVotesProvider>
      <HomeContent />
    </RealTimeVotesProvider>
  );
}
