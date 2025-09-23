// Utilities for handling user mentions and tagging

export interface MentionMatch {
  username: string;
  start: number;
  end: number;
}

export interface ParsedContent {
  processedContent: string;
  mentions: string[];
  rawContent: string;
}

// Mock users database - in a real app, this would come from your user service
export const MOCK_USERS = [
  { username: 'graz', displayName: 'Graziano', avatar: '⭐', isActive: true },
  { username: 'moviebuff', displayName: 'Movie Buff', avatar: '🎬', isActive: true },
  { username: 'musiclover', displayName: 'Music Lover', avatar: '🎵', isActive: true },
  { username: 'bookworm', displayName: 'Book Worm', avatar: '📚', isActive: true },
  { username: 'traveler', displayName: 'World Traveler', avatar: '✈️', isActive: true },
  { username: 'foodie', displayName: 'Foodie Explorer', avatar: '🍕', isActive: true },
  { username: 'gamer', displayName: 'Gamer Pro', avatar: '🎮', isActive: true },
  { username: 'techgeek', displayName: 'Tech Geek', avatar: '💻', isActive: true },
  { username: 'artist', displayName: 'Creative Artist', avatar: '🎨', isActive: true },
  { username: 'athlete', displayName: 'Sports Fan', avatar: '⚽', isActive: true }
];

// Extract mentions from text content
export function extractMentions(content: string): MentionMatch[] {
  const mentionRegex = /@(\w+)/g;
  const mentions: MentionMatch[] = [];
  let match;

  while ((match = mentionRegex.exec(content)) !== null) {
    const username = match[1];
    
    // Verify the user exists
    const userExists = MOCK_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (userExists) {
      mentions.push({
        username: userExists.username,
        start: match.index,
        end: match.index + match[0].length
      });
    }
  }

  return mentions;
}

// Process content to convert mentions to clickable elements
export function processMentions(content: string): ParsedContent {
  const mentions = extractMentions(content);
  let processedContent = content;
  let offset = 0;

  // Sort mentions by start position (reverse order to maintain correct indices)
  const sortedMentions = [...mentions].sort((a, b) => b.start - a.start);

  for (const mention of sortedMentions) {
    const before = processedContent.substring(0, mention.start);
    const after = processedContent.substring(mention.end);
    
    // Replace @username with a marked version for rendering
    processedContent = before + `<mention>@${mention.username}</mention>` + after;
  }

  return {
    processedContent,
    mentions: mentions.map(m => m.username),
    rawContent: content
  };
}

// Search users for mention autocomplete
export function searchUsers(query: string, limit: number = 5): typeof MOCK_USERS {
  const lowercaseQuery = query.toLowerCase();
  
  return MOCK_USERS
    .filter(user => 
      user.isActive && (
        user.username.toLowerCase().includes(lowercaseQuery) ||
        user.displayName.toLowerCase().includes(lowercaseQuery)
      )
    )
    .sort((a, b) => {
      // Prioritize exact username matches
      const aUsernameMatch = a.username.toLowerCase().startsWith(lowercaseQuery);
      const bUsernameMatch = b.username.toLowerCase().startsWith(lowercaseQuery);
      
      if (aUsernameMatch && !bUsernameMatch) return -1;
      if (!aUsernameMatch && bUsernameMatch) return 1;
      
      // Then prioritize display name matches
      const aDisplayMatch = a.displayName.toLowerCase().startsWith(lowercaseQuery);
      const bDisplayMatch = b.displayName.toLowerCase().startsWith(lowercaseQuery);
      
      if (aDisplayMatch && !bDisplayMatch) return -1;
      if (!aDisplayMatch && bDisplayMatch) return 1;
      
      // Finally sort alphabetically
      return a.username.localeCompare(b.username);
    })
    .slice(0, limit);
}

// Get the current mention being typed
export function getCurrentMention(text: string, cursorPosition: number): { query: string; start: number } | null {
  // Look backwards from cursor position to find @
  let start = cursorPosition - 1;
  
  while (start >= 0 && text[start] !== '@' && text[start] !== ' ' && text[start] !== '\n') {
    start--;
  }
  
  if (start >= 0 && text[start] === '@') {
    const query = text.substring(start + 1, cursorPosition);
    
    // Only return if query doesn't contain spaces or special characters
    if (!/[\s@#]/.test(query)) {
      return { query, start };
    }
  }
  
  return null;
}

// Create notification for mentioned users
export function createMentionNotifications(
  mentions: string[],
  mentioningUser: string,
  context: 'comment' | 'list' | 'reply',
  contextId: string,
  listId?: number
): Array<{
  type: 'mention';
  user: string;
  content: string;
  contextType: string;
  contextId: string;
  listId?: number;
}> {
  return mentions.map(mentionedUser => ({
    type: 'mention' as const,
    user: mentioningUser,
    content: `@${mentioningUser} mentioned you in a ${context}`,
    contextType: context,
    contextId,
    listId
  }));
}

// Render mentions in content for display
export function renderMentions(content: string): string {
  return content.replace(
    /<mention>@(\w+)<\/mention>/g,
    '<span class="mention-tag">@$1</span>'
  );
}

// Extract hashtags from content
export function extractHashtags(content: string): string[] {
  const hashtagRegex = /#(\w+)/g;
  const hashtags: string[] = [];
  let match;

  while ((match = hashtagRegex.exec(content)) !== null) {
    hashtags.push(match[1]);
  }

  return Array.from(new Set(hashtags)); // Remove duplicates
}

// Process content to handle both mentions and hashtags
export function processContentWithMentionsAndTags(content: string): {
  processedContent: string;
  mentions: string[];
  hashtags: string[];
  rawContent: string;
} {
  const mentionResult = processMentions(content);
  const hashtags = extractHashtags(content);
  
  // Process hashtags in the already mention-processed content
  let finalContent = mentionResult.processedContent.replace(
    /#(\w+)/g,
    '<hashtag>#$1</hashtag>'
  );

  return {
    processedContent: finalContent,
    mentions: mentionResult.mentions,
    hashtags,
    rawContent: content
  };
}

// Validate mention format
export function isValidMention(mention: string): boolean {
  return /^@\w+$/.test(mention) && mention.length > 1 && mention.length <= 20;
}

// Get mention suggestions based on context
export function getContextualMentionSuggestions(
  query: string,
  context: 'comment' | 'list',
  currentUser: string,
  recentUsers?: string[]
): typeof MOCK_USERS {
  let suggestions = searchUsers(query);
  
  // Filter out current user
  suggestions = suggestions.filter(user => user.username !== currentUser);
  
  // If we have recent users, prioritize them
  if (recentUsers && recentUsers.length > 0) {
    const recentUserSet = new Set(recentUsers);
    suggestions.sort((a, b) => {
      const aIsRecent = recentUserSet.has(a.username);
      const bIsRecent = recentUserSet.has(b.username);
      
      if (aIsRecent && !bIsRecent) return -1;
      if (!aIsRecent && bIsRecent) return 1;
      
      return 0;
    });
  }
  
  return suggestions;
}