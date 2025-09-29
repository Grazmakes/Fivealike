'use client';

import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { ArrowUp, ArrowDown, Bookmark, Play, ChevronDown, ChevronUp, MessageSquare, X, Send, ChevronRight, Bell, Download, FileText, FileDown, Share, MessageCircle, History, ExternalLink, RefreshCw, Edit3 } from 'lucide-react';
import { List, ItemVotes as ItemVoteData, Comment, UserBadge } from '@/types';
import { mockTMDbData, mockArtistData } from '@/data/mockData';
import { subjectFallbacks, normalizeSubjectKey } from '@/data/subjectFallbacks';
import { getItemDetailsByName } from '@/utils/tmdbApi';
import { BadgeList } from '@/components/badges/Badge';
import { exportToPDF, exportToCSV, exportToText } from '@/utils/exportUtils';
import SimpleItemDetails from '@/components/items/SimpleItemDetails';
import MentionInput from '@/components/mentions/MentionInput';
import MentionDisplay from '@/components/mentions/MentionDisplay';
import { useRealTimeVotesContext } from '@/context/RealTimeVotesContext';
import { HighFivedBadge } from '@/components/achievements/GoldHighFiveNotification';

interface ListCardProps {
  list: List;
  itemVotes?: { [itemIndex: number]: { upvotes: number; downvotes: number; userVote: 'up' | 'down' | null; } };
  onListVote: (listId: number, voteType: 'up' | 'down') => void;
  onItemVote?: (listId: number, itemIndex: number, voteType: 'up' | 'down') => void;
  onSaveList: (listId: number) => void;
  onHighFive: (listId: number) => void;
  onCategoryClick?: (category: string) => void;
  onTitleClick?: (title: string) => void;
  onAddComment?: (listId: number, comment: string, mentions?: string[], hashtags?: string[]) => void;
  onAuthorClick?: (author: string) => void;
  onMentionClick?: (username: string) => void;
  onHashtagClick?: (hashtag: string) => void;
  onSetReminder?: (listId: number, reminderDate: string, reminderType: string, message?: string) => void;
  onItemBookmark?: (listId: number, itemIndex: number) => void;
  onMessage?: (username: string) => void;
  onAddToHistory?: (listId: number, itemIndex: number) => void;
  onEditList?: (listId: number) => void;
  bookmarkState?: { [key: string]: boolean };
  isSaved: boolean;
  antiSocialMode?: boolean;
  currentUser?: string; // Username of the current user to determine edit permissions
}

// Mock function to get user badges - in a real app this would be an API call
const getUserBadges = (username: string): UserBadge[] => {
  const badgeMap: { [key: string]: UserBadge[] } = {
    '@graz': [
      { id: 'verified', type: 'verified', name: 'Verified', description: 'Verified user', icon: '✓', color: 'bg-blue-500' },
      { id: 'early_adopter', type: 'early_adopter', name: 'Early Adopter', description: 'Beta user', icon: '🚀', color: 'bg-purple-500' }
    ],
    '@moviebuff': [
      { id: 'expert', type: 'expert', name: 'Movie Expert', description: 'Cinema expertise', icon: '🎬', color: 'bg-amber-500' },
      { id: 'list_leader', type: 'list_leader', name: 'List Leader', description: 'Top list creator', icon: '👑', color: 'bg-yellow-500' }
    ],
    '@musiclover': [
      { id: 'verified', type: 'verified', name: 'Verified', description: 'Verified user', icon: '✓', color: 'bg-blue-500' },
      { id: 'great_minds', type: 'great_minds', name: 'Multiple Creators', description: 'Created a list that others also made', icon: '2', color: 'bg-gray-500' }
    ],
    '@bookworm': [
      { id: 'expert', type: 'expert', name: 'Book Expert', description: 'Literature expertise', icon: '📚', color: 'bg-green-500' },
      { id: 'moderator', type: 'moderator', name: 'Moderator', description: 'Community moderator', icon: '🛡️', color: 'bg-red-500' }
    ],
    '@indievibes': [
      { id: 'great_minds', type: 'great_minds', name: 'Multiple Creators', description: 'Created a list that others also made', icon: '2', color: 'bg-gray-500' }
    ],
    '@readingcorner': [
      { id: 'great_minds', type: 'great_minds', name: 'Multiple Creators', description: 'Created a list that others also made', icon: '2', color: 'bg-gray-500' }
    ],
    '@artlover': [
      { id: 'great_minds', type: 'great_minds', name: 'Multiple Creators', description: 'Created a list that others also made', icon: '2', color: 'bg-gray-500' }
    ]
  };
  
  return badgeMap[username] || [];
};

const normalizeName = (value: string): string => {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
};

interface SubjectInfo {
  description: string;
  image?: string;
  sourceName?: string;
  sourceUrl?: string;
}

const subjectInfoCache = new Map<string, SubjectInfo>();

const generateAlternativeSuggestion = (subjectName: string, category: string): string => {
  const base = subjectName.replace(/"/g, '');
  const normalizedCategory = category.toLowerCase();

  if (['movies', 'movie', 'film', 'films', 'cinema'].includes(normalizedCategory)) {
    return `${base} (Extended Marathon)`;
  }

  if (['tv shows', 'tv', 'television', 'series', 'show', 'shows'].includes(normalizedCategory)) {
    return `${base} (Series Deep Dive)`;
  }

  if (['books', 'book', 'novels', 'literature'].includes(normalizedCategory)) {
    return `${base} Companion Stories`;
  }

  if (['music', 'artist', 'song', 'songs', 'album', 'albums'].includes(normalizedCategory)) {
    return `${base} Essentials Playlist`;
  }

  return `${base} Fan Favorites`;
};

function ListCard({
  list,
  onListVote,
  onSaveList,
  onHighFive,
  onCategoryClick,
  onTitleClick,
  onAddComment,
  onAuthorClick,
  onMentionClick,
  onHashtagClick,
  onSetReminder,
  onItemBookmark,
  onMessage,
  onAddToHistory,
  onEditList,
  bookmarkState = {},
  isSaved,
  antiSocialMode = false,
  currentUser = '@graz' // Default to graz for demo purposes
}: ListCardProps) {
  const [showDescription, setShowDescription] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // Changed to string to support "commentId" or "commentId-replyId"
  const [isTyping, setIsTyping] = useState(false);

  // Helper function to determine if the current user can edit this list
  const canEditList = () => {
    if (!currentUser || !onEditList) return false;

    // User can edit if they are the author
    const isAuthor = list.author === currentUser;
    if (!isAuthor) return false;

    // Check time restrictions (allow edits within 48 hours)
    const listCreatedDate = new Date(list.date);
    const now = new Date();
    const timeDiff = now.getTime() - listCreatedDate.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    const isWithinTimeLimit = hoursDiff <= 48;

    // Check if list has significant engagement (votes > 10 or comments > 5)
    const hasSignificantEngagement = Math.abs(list.votes) > 10 || list.comments.length > 5;

    // Allow certain types of edits always (artwork, minor text fixes)
    // For now, we'll be permissive and allow edits if within time limit OR if no significant engagement
    return isWithinTimeLimit || !hasSignificantEngagement;
  };
  const [replyText, setReplyText] = useState('');
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [tmdbCache, setTmdbCache] = useState<{[key: string]: any}>({});
  const [loadingItems, setLoadingItems] = useState<{[key: number]: boolean}>({});
  const [mainSubjectData, setMainSubjectData] = useState<SubjectInfo | null>(null);
  const [loadingMainSubject, setLoadingMainSubject] = useState(true);
  const [mainSubjectError, setMainSubjectError] = useState<string | null>(null);
  const [showAuthorTooltip, setShowAuthorTooltip] = useState(false);
  const [tooltipHoverTimeout, setTooltipHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showApprovalTooltip, setShowApprovalTooltip] = useState(false);
  const [showVotesTooltip, setShowVotesTooltip] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderType, setReminderType] = useState<'revisit' | 'update' | 'custom'>('revisit');
  const [reminderMessage, setReminderMessage] = useState('');
  
  const [commentMentions, setCommentMentions] = useState<string[]>([]);
  const [commentHashtags, setCommentHashtags] = useState<string[]>([]);
  
  const [replyMentions, setReplyMentions] = useState<string[]>([]);
  const [replyHashtags, setReplyHashtags] = useState<string[]>([]);
  const [showInlineMessage, setShowInlineMessage] = useState(false);
  const [inlineMessage, setInlineMessage] = useState('');
  const [messageMentions, setMessageMentions] = useState<string[]>([]);
  const [messageHashtags, setMessageHashtags] = useState<string[]>([]);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const mainSubjectAbortRef = useRef(false);
  const authorTooltipRef = useRef<HTMLDivElement>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Extract main subject from title
  const mainSubjectName = useMemo(() => {
    // Try to extract quoted content first
    const quotedMatch = list.title.match(/\"([^"]+)\"/)?.[1];
    if (quotedMatch) return quotedMatch;

    // Try single quotes
    const singleQuoteMatch = list.title.split("'")[1]?.split("'")[0];
    if (singleQuoteMatch) return singleQuoteMatch;

    // Try to extract from "If you like X, try these" pattern
    const ifYouLikeMatch = list.title.match(/If you like ([^,]+),/)?.[1];
    if (ifYouLikeMatch) return ifYouLikeMatch.trim();

    // Extract first item from the items array as fallback
    if (list.items && list.items.length > 0) {
      return list.items[0];
    }

    // Final fallback to category
    return list.category || 'Unknown';
  }, [list.title, list.items, list.category]);

  const mainSubjectNormalized = useMemo(() => normalizeName(mainSubjectName), [mainSubjectName]);

  const mainSubjectFallback = useMemo(() => {
    if (!mainSubjectName || mainSubjectName === 'Unknown') {
      return null;
    }
    return subjectFallbacks[normalizeSubjectKey(mainSubjectName, list.category)];
  }, [list.category, mainSubjectName]);

  const mainSubjectCacheKey = useMemo(() => {
    if (!mainSubjectName) return null;
    const normalizedCategory = list.category ? list.category.toLowerCase() : 'general';
    return `${mainSubjectName.toLowerCase()}|${normalizedCategory}`;
  }, [mainSubjectName, list.category]);

  // Memoized expensive calculations
  const userBadges = useMemo(() => getUserBadges(list.author), [list.author]);
  
  const hasValidComments = useMemo(() => 
    list.comments && list.comments.length > 0, 
    [list.comments]
  );

  const totalCommentsCount = useMemo(() => {
    if (!list.comments) return 0;
    return list.comments.reduce((total, comment) => {
      const repliesCount = comment.replies ? comment.replies.reduce((replyTotal, reply) => {
        return replyTotal + 1 + (reply.replies?.length || 0);
      }, 0) : 0;
      return total + 1 + repliesCount;
    }, 0);
  }, [list.comments]);

  // Memoized event handlers to prevent child re-renders
  const handleListVote = useCallback((voteType: 'up' | 'down') => {
    onListVote(list.id, voteType);
  }, [onListVote, list.id]);

  const handleHighFive = useCallback(() => {
    onHighFive(list.id);
  }, [onHighFive, list.id]);

  const handleSaveList = useCallback(() => {
    onSaveList(list.id);
  }, [onSaveList, list.id]);

  const handleCategoryClick = useCallback(() => {
    if (onCategoryClick) {
      onCategoryClick(list.category);
    }
  }, [onCategoryClick, list.category]);

  const handleAuthorClick = useCallback(() => {
    if (onAuthorClick) {
      onAuthorClick(list.author);
    }
  }, [onAuthorClick, list.author]);

  const fetchMainSubjectInfo = useCallback(async (options?: { force?: boolean }) => {
    mainSubjectAbortRef.current = false;

    if (!mainSubjectName || mainSubjectName === 'Unknown' || !mainSubjectCacheKey) {
      setMainSubjectData(null);
      setMainSubjectError(null);
      setLoadingMainSubject(false);
      return;
    }

    if (mainSubjectFallback) {
      setMainSubjectData(mainSubjectFallback);
      setMainSubjectError(null);
      setLoadingMainSubject(false);
      return;
    }

    if (!options?.force && subjectInfoCache.has(mainSubjectCacheKey)) {
      const cached = subjectInfoCache.get(mainSubjectCacheKey)!;
      const normalizedCategory = (list.category || '').toLowerCase();
      const needsArtworkRefresh = ['movies', 'movie', 'tv shows', 'tv', 'music', 'books'].includes(normalizedCategory);

      if (!needsArtworkRefresh || cached.image) {
        setMainSubjectData(cached);
        setMainSubjectError(null);
        setLoadingMainSubject(false);
        return;
      }
    }

    setLoadingMainSubject(true);
    setMainSubjectError(null);

    try {
      const response = await fetch('/api/subject-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: mainSubjectName, category: list.category }),
      });

      if (!response.ok) {
        throw new Error(`Subject info request failed: ${response.status}`);
      }

      const payload: SubjectInfo = await response.json();

      if (mainSubjectAbortRef.current) {
        return;
      }

      if ((payload.description && payload.description.trim()) || payload.image) {
        subjectInfoCache.set(mainSubjectCacheKey, payload);
      }

      setMainSubjectData(payload);
      setMainSubjectError(null);
    } catch (error) {
      if (mainSubjectAbortRef.current) {
        return;
      }
      setMainSubjectError('We couldn\'t fetch details for this main subject right now.');
      setMainSubjectData(null);
    } finally {
      if (!mainSubjectAbortRef.current) {
        setLoadingMainSubject(false);
      }
    }
  }, [list.category, mainSubjectCacheKey, mainSubjectName, mainSubjectFallback]);

  const handleRefreshMainSubject = useCallback(() => {
    fetchMainSubjectInfo({ force: true });
  }, [fetchMainSubjectInfo]);

  // Handle clicks outside tooltip to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (authorTooltipRef.current && !authorTooltipRef.current.contains(event.target as Node)) {
        if (tooltipHoverTimeout) {
          clearTimeout(tooltipHoverTimeout);
          setTooltipHoverTimeout(null);
        }
        setShowAuthorTooltip(false);
        setShowInlineMessage(false);
      }
    }

    if (showAuthorTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAuthorTooltip, tooltipHoverTimeout]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipHoverTimeout) {
        clearTimeout(tooltipHoverTimeout);
      }
    };
  }, [tooltipHoverTimeout]);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    mainSubjectAbortRef.current = false;

    if (!mainSubjectName || mainSubjectName === 'Unknown' || !mainSubjectCacheKey) {
      setMainSubjectData(null);
      setMainSubjectError(null);
      setLoadingMainSubject(false);
      return () => {
        mainSubjectAbortRef.current = true;
      };
    }

    fetchMainSubjectInfo();

    return () => {
      mainSubjectAbortRef.current = true;
    };
  }, [fetchMainSubjectInfo, hasHydrated, mainSubjectCacheKey, mainSubjectName, mainSubjectFallback]);

  // Get real-time vote updates
  const { getVoteUpdate } = useRealTimeVotesContext();
  const realtimeUpdate = getVoteUpdate(list.id);
  const currentVotes = list.votes;
  const currentUpvotes = list.upvotes;
  const currentDownvotes = list.downvotes;
  
  // Calculate approval percentage with real-time data
  const totalActualVotes = currentUpvotes + currentDownvotes || 1;
  const approvalPercentage = Math.round((currentUpvotes / totalActualVotes) * 100);

  // Handle click outside export menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const displayVotes = currentVotes;


  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    if (onAddComment) {
      onAddComment(list.id, newComment.trim(), commentMentions, commentHashtags);
      // Automatically expand comments section after posting
      setShowComments(true);
    }
    setNewComment('');
    setCommentMentions([]);
    setCommentHashtags([]);
  };

  const handleAddReply = (targetId: string) => {
    if (!replyText.trim()) return;
    
    // Create new reply
    const newReply = {
      id: Date.now(),
      user: '@graz',
      content: replyText,
      time: 'just now',
      avatar: 'G',
      replies: []
    };

    // Parse targetId to determine if it's a comment or reply
    const [commentIdStr, replyIdStr] = targetId.split('-');
    const commentId = parseInt(commentIdStr);
    const replyId = replyIdStr ? parseInt(replyIdStr) : null;

    // Find and update the comment with the new reply
    const updatedComments = list.comments.map(comment => {
      if (comment.id === commentId) {
        if (replyId === null) {
          // Reply to comment
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        } else {
          // Reply to reply - add to the reply's replies array
          const updatedReplies = comment.replies?.map(reply => {
            if (reply.id === replyId) {
              return {
                ...reply,
                replies: [...(reply.replies || []), newReply]
              };
            }
            return reply;
          }) || [];
          
          return {
            ...comment,
            replies: updatedReplies
          };
        }
      }
      return comment;
    });

    // Update the list with new comments (this would typically be handled by a parent component)
    list.comments = updatedComments;
    
    setReplyText('');
    setReplyingTo(null);
  };

  const getItemDetails = async (itemName: string, itemIndex: number) => {
    // Check cache first
    if (tmdbCache[itemName]) {
      return tmdbCache[itemName];
    }

    // Check if already loading
    if (loadingItems[itemIndex]) {
      return null;
    }

    // Set loading state
    setLoadingItems(prev => ({ ...prev, [itemIndex]: true }));

    try {
      // Only use TMDB API for Movies and TV Shows categories
      if (list.category === 'Movies' || list.category === 'TV Shows') {
        const tmdbResult = await getItemDetailsByName(itemName);

        if (tmdbResult) {
          // Cache the result
          setTmdbCache(prev => ({ ...prev, [itemName]: tmdbResult }));
          setLoadingItems(prev => ({ ...prev, [itemIndex]: false }));
          return tmdbResult;
        }
      }

      // Use subject-info API for Music category
      if (list.category === 'Music') {
        const response = await fetch('/api/subject-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject: itemName, category: list.category }),
        });

        if (response.ok) {
          const subjectData = await response.json();
          const result = {
            type: 'music',
            name: itemName,
            description: subjectData.description || '',
            image: subjectData.image,
            sourceName: subjectData.sourceName,
            sourceUrl: subjectData.sourceUrl
          };
          // Cache the result
          setTmdbCache(prev => ({ ...prev, [itemName]: result }));
          setLoadingItems(prev => ({ ...prev, [itemIndex]: false }));
          return result;
        }
      }

      // Fallback to mock artist data (music)
      const artistItem = mockArtistData[itemName];
      if (artistItem) {
        const result = {
          type: 'artist',
          name: artistItem.name,
          description: artistItem.biography,
          formed: artistItem.formed,
          genres: artistItem.genres.join(', ')
        };
        setTmdbCache(prev => ({ ...prev, [itemName]: result }));
        setLoadingItems(prev => ({ ...prev, [itemIndex]: false }));
        return result;
      }

      // Default fallback
      const result = {
        type: 'unknown',
        name: itemName,
        description: `Information about "${itemName}" would be displayed here. This could include plot summaries for movies/books, artist biographies for musicians, or game descriptions.`,
        year: '',
        rating: null
      };
      setTmdbCache(prev => ({ ...prev, [itemName]: result }));
      setLoadingItems(prev => ({ ...prev, [itemIndex]: false }));
      return result;

    } catch (error) {
      console.error('Error fetching item details:', error);
      setLoadingItems(prev => ({ ...prev, [itemIndex]: false }));
      
      // Return fallback data
      const result = {
        type: 'unknown',
        name: itemName,
        description: `Unable to load information for "${itemName}". Please try again later.`,
        year: '',
        rating: null
      };
      return result;
    }
  };

  const handleSetReminder = () => {
    if (!reminderDate || !onSetReminder) return;
    
    onSetReminder(list.id, reminderDate, reminderType, reminderMessage || undefined);
    setShowReminderModal(false);
    setReminderDate('');
    setReminderType('revisit');
    setReminderMessage('');
  };

  const handleSendInlineMessage = () => {
    if (!inlineMessage.trim()) return;
    
    // Call the existing onMessage function but with additional message data
    if (onMessage) {
      // You could enhance this to pass the actual message content
      onMessage(list.author);
    }
    
    // Reset the inline message form
    setInlineMessage('');
    setMessageMentions([]);
    setMessageHashtags([]);
    setShowInlineMessage(false);
    
    // Optionally show a success message or notification
    console.log(`Message sent to ${list.author}:`, inlineMessage, { mentions: messageMentions, hashtags: messageHashtags });
  };


  const handleExport = (format: 'pdf' | 'csv' | 'text') => {
    switch (format) {
      case 'pdf':
        exportToPDF(list);
        break;
      case 'csv':
        exportToCSV(list);
        break;
      case 'text':
        exportToText(list);
        break;
    }
    setShowExportMenu(false);
  };

  // Get category border color
  const getCategoryBorderColor = (category: string) => {
    switch (category) {
      case 'Movies': return 'border-l-red-500';
      case 'TV Shows': return 'border-l-purple-500';
      case 'Books': return 'border-l-green-600';
      case 'Music': return 'border-l-pink-500';
      case 'Games': return 'border-l-orange-500';
      case 'Food & Drink': return 'border-l-yellow-500';
      case 'Travel': return 'border-l-cyan-500';
      case 'Technology': return 'border-l-indigo-500';
      case 'Health & Fitness': return 'border-l-emerald-500';
      case 'Arts & Crafts': return 'border-l-violet-500';
      case 'Sports': return 'border-l-blue-600';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div
      id={`list-${list.id}`}
      data-list-card
      className={`list-card relative mb-10 rounded-3xl border border-gray-200/80 dark:border-gray-700/70 bg-white/95 dark:bg-gray-900/80 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.75)] backdrop-blur-sm transition-shadow hover:shadow-[0_35px_65px_-30px_rgba(15,23,42,0.85)] border-l-4 ${getCategoryBorderColor(list.category)}`}
    >

      {/* Genre Bubble */}
      <button
        onClick={() => onCategoryClick?.(list.category)}
        className={`absolute -top-2 -right-2 text-white text-sm px-3 py-1.5 rounded-full z-20 flex items-center space-x-1 font-medium shadow-lg hover:scale-105 transition-transform cursor-pointer ${
          list.category === 'Movies' ? 'bg-red-500 hover:bg-red-600' :
          list.category === 'TV Shows' ? 'bg-purple-500 hover:bg-purple-600' :
          list.category === 'Books' ? 'bg-green-600 hover:bg-green-700' :
          list.category === 'Music' ? 'bg-pink-500 hover:bg-pink-600' :
          list.category === 'Games' ? 'bg-orange-500 hover:bg-orange-600' :
          list.category === 'Food & Drink' ? 'bg-yellow-500 hover:bg-yellow-600' :
          list.category === 'Travel' ? 'bg-cyan-500 hover:bg-cyan-600' :
          list.category === 'Technology' ? 'bg-indigo-500 hover:bg-indigo-600' :
          list.category === 'Health & Fitness' ? 'bg-emerald-500 hover:bg-emerald-600' :
          list.category === 'Arts & Crafts' ? 'bg-violet-500 hover:bg-violet-600' :
          list.category === 'Sports' ? 'bg-blue-600 hover:bg-blue-700' :
          'bg-gray-500 hover:bg-gray-600'
        }`}
        title={`View all ${list.category} lists`}
      >
        <span>{list.category}</span>
      </button>

      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex-1">
              If you like {onTitleClick ? (
              <button
                onClick={() => onTitleClick(list.title.match(/\"([^"]+)\"/)?.[1] || list.title)}
                className="text-primary-600 dark:text-primary-400 underline decoration-2 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                &quot;{list.title.match(/\"([^"]+)\"/)?.[1] || list.title.split("'")[1]?.split("'")[0] || mainSubjectName}&quot;
              </button>
            ) : (
              <span className="text-primary-600 dark:text-primary-400 underline decoration-2">&quot;{list.title.match(/\"([^"]+)\"/)?.[1] || list.title.split("'")[1]?.split("'")[0] || mainSubjectName}&quot;</span>
            )}, try these FIVE&nbsp;ALIKE...
            {list.isOrdered && (
              <span className="inline-flex items-center px-2 py-1 ml-2 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                📊 Ranked List
              </span>
            )}
            </h3>

          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>by</span>
            <div className="relative inline-block">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Toggle tooltip on click for better accessibility
                  if (tooltipHoverTimeout) {
                    clearTimeout(tooltipHoverTimeout);
                    setTooltipHoverTimeout(null);
                  }
                  setShowAuthorTooltip(!showAuthorTooltip);
                }}
                onMouseEnter={() => {
                  if (tooltipHoverTimeout) {
                    clearTimeout(tooltipHoverTimeout);
                    setTooltipHoverTimeout(null);
                  }
                  setShowAuthorTooltip(true);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => setShowAuthorTooltip(false), 800);
                  setTooltipHoverTimeout(timeout);
                }}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-colors"
              >
                {list.author}
              </button>
              
              {/* Author Tooltip */}
              {showAuthorTooltip && (
                <div
                  ref={authorTooltipRef}
                  onMouseEnter={() => {
                    if (tooltipHoverTimeout) {
                      clearTimeout(tooltipHoverTimeout);
                      setTooltipHoverTimeout(null);
                    }
                    setShowAuthorTooltip(true);
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => setShowAuthorTooltip(false), 600);
                    setTooltipHoverTimeout(timeout);
                  }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 bg-white dark:bg-gray-200 border border-gray-200 dark:border-gray-300 text-gray-900 dark:text-gray-800 text-sm rounded-2xl py-3 px-4 shadow-lg min-w-64"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-700">
                        {list.author.replace('@', '').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{list.author}</div>
                        <BadgeList badges={userBadges} maxDisplay={2} size="small" />
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-700 mb-1">
                    {(() => {
                      const userBio = {
                        '@graz': 'Platform creator and early adopter with expertise in recommendations',
                        '@moviebuff': 'Film enthusiast with extensive knowledge of cinema classics and modern hits',
                        '@musiclover': 'Music curator specializing in indie and alternative genres',
                        '@bookworm': 'Literature expert and community moderator with passion for fiction'
                      }[list.author] || 'Recommendation enthusiast and community member';
                      return userBio;
                    })()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-600 mb-3">
                    {(() => {
                      const userListsCount = {
                        '@graz': 42,
                        '@moviebuff': 67,
                        '@musiclover': 23,
                        '@bookworm': 31
                      }[list.author] || 15;
                      return `${userListsCount} lists created`;
                    })()}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-2 pt-2 border-t border-gray-200 dark:border-gray-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAuthorClick?.(list.author);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-primary-100 dark:bg-primary-200 text-primary-700 dark:text-primary-800 rounded-md hover:bg-primary-200 dark:hover:bg-primary-300 transition-colors"
                    >
                      View Profile
                    </button>
                    {onMessage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowInlineMessage(!showInlineMessage);
                        }}
                        className={`flex-1 px-3 py-1.5 text-xs rounded-md transition-colors flex items-center justify-center space-x-1 ${
                          showInlineMessage 
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-100 dark:bg-blue-200 text-blue-700 dark:text-blue-800 hover:bg-blue-200 dark:hover:bg-blue-300'
                        }`}
                      >
                        <MessageCircle size={12} />
                        <span>{showInlineMessage ? 'Cancel' : 'Message'}</span>
                      </button>
                    )}
                  </div>

                  {/* Inline Message Composer */}
                  {showInlineMessage && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-300">
                      <div className="mb-2">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-600 mb-1 block">
                          Send a message to {list.author}
                        </label>
                        <MentionInput
                          value={inlineMessage}
                          onChange={(value, mentions, hashtags) => {
                            setInlineMessage(value);
                            setMessageMentions(mentions);
                            setMessageHashtags(hashtags);
                          }}
                          placeholder="Type your message..."
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {inlineMessage.length}/280
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowInlineMessage(false);
                              setInlineMessage('');
                              setMessageMentions([]);
                              setMessageHashtags([]);
                            }}
                            className="px-2 py-1 text-xs text-gray-600 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendInlineMessage();
                            }}
                            disabled={!inlineMessage.trim() || inlineMessage.length > 280}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                          >
                            <Send size={10} />
                            <span>Send</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-200 border-r border-b border-gray-200 dark:border-gray-300 rotate-45"></div>
                </div>
              )}
            </div>
            <span>•</span>
            <span>{list.date}</span>
            {list.twinCount && list.twinCount > 1 && (
              <span
                className="ml-2 text-xs text-gray-500 dark:text-gray-400 cursor-help inline-flex items-center space-x-1"
                title={`${list.twinCount} users independently created this exact same list`}
              >
                <span>•</span>
                <span>{list.twinCount} people also made this list</span>
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-3">
          <button
            onClick={() => onSaveList(list.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isSaved
                ? 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900'
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={isSaved ? 'Unsave list' : 'Save List'}
          >
            <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium">{isSaved ? 'Saved' : 'Save List'}</span>
          </button>

          {/* Edit Button */}
          {canEditList() && (
            <button
              onClick={() => onEditList!(list.id)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900 transition-colors"
              title="Edit list"
            >
              <Edit3 size={20} />
              <span className="text-sm font-medium">Edit</span>
            </button>
          )}

          {/* Reminder Button */}
          {onSetReminder && (
            <button
              onClick={() => setShowReminderModal(true)}
              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
              title="Set reminder"
            >
              <Bell size={20} />
            </button>
          )}

          {/* Export Menu */}
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="p-2 rounded-lg text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
              title="Export list"
            >
              <Download size={20} />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 py-2 z-50">
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FileText size={16} />
                  <span>Export as PDF</span>
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FileDown size={16} />
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={() => handleExport('text')}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Share size={16} />
                  <span>Export as Text</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Subject Overview */}
      {hasHydrated && mainSubjectName && mainSubjectName !== 'Unknown' && (
        <div className="mb-6">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex-shrink-0">
                <div className="w-28 h-40 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                  {loadingMainSubject ? (
                    <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" aria-label="Loading main subject" />
                  ) : list.subjectImage ? (
                    <img
                      src={list.subjectImage}
                      alt={mainSubjectName}
                      className="w-full h-full object-cover"
                    />
                  ) : mainSubjectData?.image ? (
                    <img
                      src={mainSubjectData.image}
                      alt={mainSubjectName}
                      className="w-full h-full object-contain bg-white dark:bg-gray-900"
                      onError={(event) => {
                        const target = event.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mainSubjectName)}&background=0f766e&color=ffffff&size=256&bold=true`;
                      }}
                    />
                  ) : (
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mainSubjectName)}&background=0f766e&color=ffffff&size=256&bold=true`}
                      alt={mainSubjectName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mainSubjectName}</h3>
                    {mainSubjectData?.sourceName && (
                      <div className="mt-1 flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Source:</span>
                        {mainSubjectData.sourceUrl ? (
                          <a
                            href={mainSubjectData.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1 text-green-600 dark:text-green-400 hover:underline"
                          >
                            <span>{mainSubjectData.sourceName}</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span>{mainSubjectData.sourceName}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleRefreshMainSubject}
                    disabled={loadingMainSubject}
                    className="inline-flex items-center space-x-2 self-start px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-400 transition-colors disabled:opacity-60"
                  >
                    <RefreshCw size={14} className={loadingMainSubject ? 'animate-spin' : ''} />
                    <span>{loadingMainSubject ? 'Refreshing' : 'Refresh'}</span>
                  </button>
                </div>
                <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {loadingMainSubject ? (
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  ) : mainSubjectError ? (
                    <p className="text-sm text-amber-600 dark:text-amber-400">{mainSubjectError}</p>
                  ) : mainSubjectData?.description ? (
                    <p>{mainSubjectData.description}</p>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We couldn’t find a quick description yet. We’ll keep looking for fresh sources.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="space-y-3 mb-6">
        {list.items.map((item, index) => {
          const normalizedItem = normalizeName(item);
          const isMainSubjectItem = normalizedItem && normalizedItem === mainSubjectNormalized;
          const displayLabel = hasHydrated && isMainSubjectItem
            ? generateAlternativeSuggestion(mainSubjectName, list.category)
            : item;

          const isExpanded = expandedItem === index;
          const isLoading = loadingItems[index];
          const cachedDetails = tmdbCache[item];

          const handleExpandClick = async () => {
            if (isExpanded) {
              setExpandedItem(null);
            } else {
              setExpandedItem(index);
              if ((list.category === 'Movies' || list.category === 'TV Shows' || list.category === 'Music') && !cachedDetails) {
                await getItemDetails(item, index);
              }
            }
          };

          return (
            <div key={index} className="rounded-lg bg-gray-200 dark:bg-gray-500 transition-colors">
              <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {list.isOrdered ? (
                      <>
                        <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full text-xs font-bold text-white bg-green-600">
                          {index + 1}
                        </span>
                        {displayLabel}
                      </>
                    ) : (
                      displayLabel
                    )}
                  </span>
                  <button 
                    onClick={handleExpandClick}
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    title="Show details"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full" />
                    ) : (
                      <ChevronRight 
                        size={20} 
                        className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                      />
                    )}
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {onItemBookmark && (
                    <button
                      onClick={() => onItemBookmark(list.id, index)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        bookmarkState[`${list.id}-${index}`]
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-blue-900 dark:hover:text-blue-300'
                      }`}
                      title={bookmarkState[`${list.id}-${index}`] ? 'Saved to your bookmarks' : 'Save Item'}
                    >
                      <Bookmark size={14} className={bookmarkState[`${list.id}-${index}`] ? 'fill-current' : ''} />
                      <span>{bookmarkState[`${list.id}-${index}`] ? 'Saved' : 'Save Item'}</span>
                    </button>
                  )}

                  {onAddToHistory && (
                    <button
                      onClick={() => onAddToHistory(list.id, index)}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-purple-900 dark:hover:text-purple-300 transition-colors"
                      title="Add to history"
                    >
                      <History size={14} />
                      <span>Add to History</span>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Enhanced Item Details Dropdown */}
              {isExpanded && (
                <div className="px-3 pb-3">
                  <SimpleItemDetails
                    itemName={item}
                    category={list.category}
                    onClose={() => setExpandedItem(null)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Description Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          <span className="font-medium text-lg">Why you&apos;ll love these</span>
          {showDescription ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showDescription && (
          <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <MentionDisplay
              content={list.description}
              onMentionClick={onMentionClick}
              onHashtagClick={onHashtagClick}
              className="text-gray-700 dark:text-gray-300"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {!antiSocialMode && (
            <button
              onClick={() => onListVote(list.id, 'up')}
              className={`vote-button min-w-[44px] min-h-[44px] ${list.userVote === 'up' ? 'upvoted' : ''}`}
              title="Upvote this list - Click to add +1 to the score if you think this is a great recommendation list"
            >
              <ArrowUp size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          )}
          
          <div className="relative">
            <span 
              className={`font-bold text-lg text-gray-900 dark:text-white cursor-help transition-all duration-300 ${
                realtimeUpdate?.latestVoteEvent && Date.now() - realtimeUpdate.latestVoteEvent.timestamp < 2000 
                  ? 'scale-110 text-primary-600' 
                  : ''
              }`}
              onMouseEnter={() => setShowVotesTooltip(true)}
              onMouseLeave={() => setShowVotesTooltip(false)}
            >
              {displayVotes}
              {realtimeUpdate?.latestVoteEvent && Date.now() - realtimeUpdate.latestVoteEvent.timestamp < 1000 && (
                <span className="ml-1 text-xs animate-bounce text-primary-600">
                  {realtimeUpdate.latestVoteEvent.voteType === 'up' ? '↑' : '↓'}
                </span>
              )}
            </span>
            
            {/* Total Votes Tooltip */}
            {showVotesTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-2xl py-3 px-4 shadow-lg min-w-64">
                <div className="font-semibold mb-2">List Total Score</div>
                <div className="space-y-2 text-xs">
                  <div className="text-gray-600 dark:text-gray-400 mb-2">
                    This score shows how much people like the overall list
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="font-medium mb-1">How it works:</div>
                    <div className="space-y-1 text-gray-600 dark:text-gray-400">
                      <div>• <span className="text-green-600">↑ Upvote</span> = +1 to score</div>
                      <div>• <span className="text-red-600">↓ Downvote</span> = -1 from score</div>
                      <div>• Score = Total Upvotes - Total Downvotes</div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2 text-xs">
                    <div className="flex justify-between">
                      <span>Current breakdown:</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mt-1">
                      <span className="text-green-600">↑ {currentUpvotes}</span> upvotes, <span className="text-red-600">↓ {currentDownvotes}</span> downvotes
                      {realtimeUpdate && (
                        <span className="text-blue-600 ml-2 text-xs">
                          ({realtimeUpdate.upvotes > 0 ? '+' : ''}{realtimeUpdate.upvotes} / {realtimeUpdate.downvotes > 0 ? '+' : ''}{realtimeUpdate.downvotes} live)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-600 rotate-45"></div>
              </div>
            )}
          </div>
          
          {!antiSocialMode && (
            <button
              onClick={() => onListVote(list.id, 'down')}
              className={`vote-button min-w-[44px] min-h-[44px] ${list.userVote === 'down' ? 'downvoted' : ''}`}
              title="Downvote this list - Click to subtract -1 from the score if you don't think this is a good recommendation list"
            >
              <ArrowDown size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          )}
        </div>

        {/* Right side - High Fived Badge and Comments */}
        <div className="flex items-center space-x-4">
          {!antiSocialMode && list.highFives >= 10 && (
            <HighFivedBadge count={list.highFives} size="md" showCount={true} />
          )}

          {!antiSocialMode && (
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <MessageSquare size={20} />
              <span className="text-sm font-medium">{list.comments.length}</span>
            </button>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {!antiSocialMode && showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          {/* Comments Container with limited height and scroll */}
          <div className="max-h-60 overflow-y-auto pr-2">
            <div className="space-y-4">
              {/* Comments List */}
              {list.comments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {comment.avatar}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {comment.user}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {comment.time}
                        </span>
                      </div>
                      <MentionDisplay
                        content={comment.content}
                        onMentionClick={onMentionClick}
                        onHashtagClick={onHashtagClick}
                        className="text-sm text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id.toString() ? null : comment.id.toString())}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mt-1 ml-3"
                    >
                      Reply
                    </button>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.map((reply) => (
                  <div key={reply.id} className="ml-11">
                    <div className="flex space-x-3 mb-2">
                      <div className="flex-shrink-0 w-7 h-7 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                          {reply.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                              {reply.user}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {reply.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            {reply.content}
                          </p>
                        </div>
                        <button
                          onClick={() => setReplyingTo(replyingTo === `${comment.id}-${reply.id}` ? null : `${comment.id}-${reply.id}`)}
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mt-1"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                    
                    {/* Nested Replies */}
                    {reply.replies && reply.replies.map((nestedReply) => (
                      <div key={nestedReply.id} className="ml-10 flex space-x-3 mb-2">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                            {nestedReply.avatar}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                                {nestedReply.user}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {nestedReply.time}
                              </span>
                            </div>
                            <p className="text-xs text-gray-900 dark:text-gray-100">
                              {nestedReply.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Reply to Reply Input */}
                    {replyingTo === `${comment.id}-${reply.id}` && (
                      <div className="ml-10 mt-2">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddReply(`${comment.id}-${reply.id}`);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddReply(`${comment.id}-${reply.id}`)}
                            className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Reply Input */}
                {replyingTo === comment.id.toString() && (
                  <div className="ml-11 flex space-x-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddReply(comment.id.toString());
                        }
                        if (e.key === 'Escape') {
                          setReplyingTo(null);
                          setReplyText('');
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddReply(comment.id.toString())}
                      className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}

          </div>
          </div>
        </div>
      )}

      {/* Add Comment Form - Only visible when comments are shown */}
      {!antiSocialMode && showComments && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                G
              </span>
            </div>
            <div className="flex-1">
              <MentionInput
                value={newComment}
                onChange={(value, mentions, hashtags) => {
                  setNewComment(value);
                  setCommentMentions(mentions);
                  setCommentHashtags(hashtags);
                  
                  // Simple typing indicator
                  if (value.trim()) {
                    setIsTyping(true);
                    // Clear typing after 2 seconds of no activity
                    setTimeout(() => setIsTyping(false), 2000);
                  } else {
                    setIsTyping(false);
                  }
                }}
                placeholder="Share your thoughts..."
                currentUser="graz"
                rows={1}
                maxLength={300}
                className="mention-input-compact"
              />
            </div>
            <div className="flex flex-col items-end space-y-2">
              {isTyping && (
                <div className="text-xs text-gray-500 dark:text-gray-400 animate-pulse flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce mr-1"></span>
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce mr-1" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce mr-2" style={{animationDelay: '0.2s'}}></span>
                  Typing...
                </div>
              )}
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Set Reminder
                </h3>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reminder Date
                  </label>
                  <input
                    type="datetime-local"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reminder Type
                  </label>
                  <select
                    value={reminderType}
                    onChange={(e) => setReminderType(e.target.value as 'revisit' | 'update' | 'custom')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="revisit">Revisit this list</option>
                    <option value="update">Update this list</option>
                    <option value="custom">Custom reminder</option>
                  </select>
                </div>

                {reminderType === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Message
                    </label>
                    <textarea
                      value={reminderMessage}
                      onChange={(e) => setReminderMessage(e.target.value)}
                      placeholder="What would you like to be reminded about?"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 h-20 resize-none"
                    />
                  </div>
                )}

                <div className="flex space-x-3 pt-2">
                  <button
                    onClick={() => setShowReminderModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSetReminder}
                    disabled={!reminderDate}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Memoized ListCard to prevent unnecessary re-renders
export default memo(ListCard, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.list.id === nextProps.list.id &&
    prevProps.list.votes === nextProps.list.votes &&
    prevProps.list.highFives === nextProps.list.highFives &&
    prevProps.list.userVote === nextProps.list.userVote &&
    prevProps.list.userHighFived === nextProps.list.userHighFived &&
    prevProps.list.comments.length === nextProps.list.comments.length &&
    prevProps.isSaved === nextProps.isSaved &&
    prevProps.antiSocialMode === nextProps.antiSocialMode &&
    JSON.stringify(prevProps.itemVotes) === JSON.stringify(nextProps.itemVotes) &&
    JSON.stringify(prevProps.bookmarkState) === JSON.stringify(nextProps.bookmarkState)
  );
});
