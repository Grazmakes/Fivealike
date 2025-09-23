'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { User, Hash } from 'lucide-react';
import { 
  getCurrentMention, 
  searchUsers, 
  getContextualMentionSuggestions,
  MOCK_USERS,
  processContentWithMentionsAndTags
} from '@/utils/mentionsUtils';

interface MentionInputProps {
  value: string;
  onChange: (value: string, mentions: string[], hashtags: string[]) => void;
  placeholder?: string;
  currentUser?: string;
  className?: string;
  maxLength?: number;
  rows?: number;
  disabled?: boolean;
  recentUsers?: string[];
}

interface MentionSuggestion {
  username: string;
  displayName: string;
  avatar: string;
  isActive: boolean;
}

export default function MentionInput({
  value,
  onChange,
  placeholder = "Write your comment...",
  currentUser = "graz",
  className = "",
  maxLength = 500,
  rows = 3,
  disabled = false,
  recentUsers = []
}: MentionInputProps) {
  const [suggestions, setSuggestions] = useState<MentionSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mentionQuery, setMentionQuery] = useState<{ query: string; start: number } | null>(null);
  const [isTypingHashtag, setIsTypingHashtag] = useState(false);
  const [hashtagQuery, setHashtagQuery] = useState<{ query: string; start: number } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Common hashtags for suggestions
  const commonHashtags = useMemo(() => [
    'recommendations', 'favorites', 'mustwatch', 'mustread', 'mustlisten',
    'hidden', 'gems', 'classics', 'trending', 'underrated', 'popular',
    'beginner', 'advanced', 'seasonal', 'holiday', 'weekend', 'cozy',
    'adventure', 'romance', 'comedy', 'drama', 'thriller', 'scifi',
    'fantasy', 'documentary', 'indie', 'mainstream', 'nostalgia'
  ], []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleInput = () => {
      const cursorPosition = textarea.selectionStart;
      
      // Check for @ mentions
      const mention = getCurrentMention(value, cursorPosition);
      if (mention) {
        setMentionQuery(mention);
        setIsTypingHashtag(false);
        setHashtagQuery(null);
        
        const userSuggestions = getContextualMentionSuggestions(
          mention.query,
          'comment',
          currentUser,
          recentUsers
        );
        
        setSuggestions(userSuggestions);
        setShowSuggestions(userSuggestions.length > 0);
        setSelectedIndex(0);
        return;
      }
      
      // Check for # hashtags
      const hashtagMatch = getCurrentHashtag(value, cursorPosition);
      if (hashtagMatch) {
        setHashtagQuery(hashtagMatch);
        setIsTypingHashtag(true);
        setMentionQuery(null);
        
        const hashtagSuggestions = getHashtagSuggestions(hashtagMatch.query);
        setSuggestions(hashtagSuggestions.map(tag => ({
          username: tag,
          displayName: `#${tag}`,
          avatar: '#',
          isActive: true
        })));
        setShowSuggestions(hashtagSuggestions.length > 0);
        setSelectedIndex(0);
        return;
      }
      
      // No mention or hashtag being typed
      setShowSuggestions(false);
      setMentionQuery(null);
      setHashtagQuery(null);
      setIsTypingHashtag(false);
    };

    handleInput(); // Check initial state
    
    textarea.addEventListener('input', handleInput);
    textarea.addEventListener('selectionchange', handleInput);
    
    return () => {
      textarea.removeEventListener('input', handleInput);
      textarea.removeEventListener('selectionchange', handleInput);
    };
  }, [value, currentUser, recentUsers]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCurrentHashtag = (text: string, cursorPosition: number): { query: string; start: number } | null => {
    let start = cursorPosition - 1;
    
    while (start >= 0 && text[start] !== '#' && text[start] !== ' ' && text[start] !== '\n') {
      start--;
    }
    
    if (start >= 0 && text[start] === '#') {
      const query = text.substring(start + 1, cursorPosition);
      
      if (!/[\s@#]/.test(query)) {
        return { query, start };
      }
    }
    
    return null;
  };

  const getHashtagSuggestions = useCallback((query: string): string[] => {
    const lowercaseQuery = query.toLowerCase();
    return commonHashtags
      .filter(tag => tag.includes(lowercaseQuery))
      .sort((a, b) => {
        const aStartsWith = a.startsWith(lowercaseQuery);
        const bStartsWith = b.startsWith(lowercaseQuery);
        
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        
        return a.localeCompare(b);
      })
      .slice(0, 6);
  }, [commonHashtags]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        selectSuggestion(selectedIndex);
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const selectSuggestion = (index: number) => {
    const suggestion = suggestions[index];
    if (!suggestion) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    let newValue = value;
    let insertText = '';

    if (isTypingHashtag && hashtagQuery) {
      insertText = `#${suggestion.username}`;
      newValue = value.substring(0, hashtagQuery.start) + insertText + value.substring(textarea.selectionStart);
    } else if (mentionQuery) {
      insertText = `@${suggestion.username}`;
      newValue = value.substring(0, mentionQuery.start) + insertText + value.substring(textarea.selectionStart);
    }

    // Process the new content
    const processed = processContentWithMentionsAndTags(newValue);
    onChange(newValue, processed.mentions, processed.hashtags);
    
    setShowSuggestions(false);
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      const newCursorPos = (isTypingHashtag ? hashtagQuery?.start || 0 : mentionQuery?.start || 0) + insertText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    if (maxLength && newValue.length > maxLength) return;
    
    const processed = processContentWithMentionsAndTags(newValue);
    onChange(newValue, processed.mentions, processed.hashtags);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className={`relative ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        style={{
          minHeight: `${rows * 1.5}rem`
        }}
      />
      
      {maxLength && (
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {value.length}/{maxLength}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg max-h-48 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.username}
              onClick={() => selectSuggestion(index)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
                index === selectedIndex
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                {isTypingHashtag ? (
                  <Hash size={12} className="text-primary-600 dark:text-primary-400" />
                ) : (
                  <span className="text-xs">{suggestion.avatar}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {isTypingHashtag ? `#${suggestion.username}` : `@${suggestion.username}`}
                </div>
                {!isTypingHashtag && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {suggestion.displayName}
                  </div>
                )}
              </div>
              
              {!isTypingHashtag && recentUsers.includes(suggestion.username) && (
                <div className="flex-shrink-0">
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full">
                    Recent
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};