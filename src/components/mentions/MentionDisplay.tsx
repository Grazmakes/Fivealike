'use client';

import { renderMentions } from '@/utils/mentionsUtils';

interface MentionDisplayProps {
  content: string;
  onMentionClick?: (username: string) => void;
  onHashtagClick?: (hashtag: string) => void;
  className?: string;
}

export default function MentionDisplay({ 
  content, 
  onMentionClick, 
  onHashtagClick,
  className = ""
}: MentionDisplayProps) {
  
  // Process the content to handle mentions and hashtags
  const processContent = (text: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    let currentIndex = 0;
    let partIndex = 0;

    // Find all mentions (@username) and hashtags (#tag)
    const mentionRegex = /@(\w+)/g;
    const hashtagRegex = /#(\w+)/g;
    
    // Combine both patterns and sort by position
    const allMatches: Array<{
      type: 'mention' | 'hashtag';
      match: string;
      username: string;
      start: number;
      end: number;
    }> = [];

    let match;
    
    // Find mentions
    while ((match = mentionRegex.exec(text)) !== null) {
      allMatches.push({
        type: 'mention',
        match: match[0],
        username: match[1],
        start: match.index,
        end: match.index + match[0].length
      });
    }

    // Reset regex
    hashtagRegex.lastIndex = 0;
    
    // Find hashtags
    while ((match = hashtagRegex.exec(text)) !== null) {
      allMatches.push({
        type: 'hashtag',
        match: match[0],
        username: match[1],
        start: match.index,
        end: match.index + match[0].length
      });
    }

    // Sort matches by start position
    allMatches.sort((a, b) => a.start - b.start);

    // Process matches
    allMatches.forEach((matchData) => {
      // Add text before match
      if (currentIndex < matchData.start) {
        const beforeText = text.substring(currentIndex, matchData.start);
        if (beforeText) {
          parts.push(
            <span key={`text-${partIndex++}`}>
              {beforeText}
            </span>
          );
        }
      }

      // Add the mention or hashtag
      if (matchData.type === 'mention') {
        parts.push(
          <button
            key={`mention-${partIndex++}`}
            onClick={() => onMentionClick?.(matchData.username)}
            className="mention-tag text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline font-medium bg-primary-50 dark:bg-primary-900/20 px-1 rounded transition-colors"
          >
            @{matchData.username}
          </button>
        );
      } else {
        parts.push(
          <button
            key={`hashtag-${partIndex++}`}
            onClick={() => onHashtagClick?.(matchData.username)}
            className="hashtag-tag text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium bg-blue-50 dark:bg-blue-900/20 px-1 rounded transition-colors"
          >
            #{matchData.username}
          </button>
        );
      }

      currentIndex = matchData.end;
    });

    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.substring(currentIndex);
      if (remainingText) {
        parts.push(
          <span key={`text-${partIndex++}`}>
            {remainingText}
          </span>
        );
      }
    }

    return parts.length > 0 ? parts : [<span key="empty">{text}</span>];
  };

  return (
    <div className={className}>
      {processContent(content)}
    </div>
  );
};

// CSS styles to add to your global CSS file
export const mentionStyles = `
.mention-tag {
  @apply text-primary-600 dark:text-primary-400;
  @apply hover:text-primary-700 dark:hover:text-primary-300;
  @apply font-medium bg-primary-50 dark:bg-primary-900/20;
  @apply px-1 rounded transition-colors cursor-pointer;
}

.mention-tag:hover {
  @apply underline;
}

.hashtag-tag {
  @apply text-blue-600 dark:text-blue-400;
  @apply hover:text-blue-700 dark:hover:text-blue-300;
  @apply font-medium bg-blue-50 dark:bg-blue-900/20;
  @apply px-1 rounded transition-colors cursor-pointer;
}

.hashtag-tag:hover {
  @apply underline;
}
`;