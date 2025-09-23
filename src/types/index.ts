export interface UserBadge {
  id: string;
  type: 'verified' | 'moderator' | 'list_leader' | 'early_adopter' | 'top_contributor' | 'expert' | 'great_minds';
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedDate?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  category: 'lists_created' | 'votes_given' | 'comments_made' | 'lists_saved' | 'high_fives_given';
  deadline?: string;
  completed: boolean;
  completedDate?: string;
}

export interface SeasonalReminder {
  id: string;
  title: string;
  description: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  category: string;
  listId?: number;
  isActive: boolean;
  lastTriggered?: string;
}


export interface UserMention {
  id: string;
  mentionedBy: string;
  mentionedUser: string;
  context: 'comment' | 'list' | 'reply';
  contextId: string;
  timestamp: string;
  isRead: boolean;
}

export interface User {
  id?: string;
  username: string;
  bio: string;
  avatar: string;
  avatarImage: string | null;
  favoriteTopics: string[];
  selectedGenres: string[];
  achievements: string[];
  badges: UserBadge[];
  selectedBadge: UserBadge | null;
  goals: Goal[];
  seasonalReminders: SeasonalReminder[];
  followers: number;
  following: number;
  joinDate: string;
  isEarlyAdopter: boolean;
  hasSeenTutorial: boolean;
  claimedRewards: string[];
  earlyAdopterRewards?: string[];
  birthday?: string;
  email?: string;
  gender?: string;
  pronouns?: string;
  homeCity?: string;
  nsfwFilter?: boolean;
  antiSocialMode?: boolean;
  stats: {
    listsCreated: number;
    totalVotes: number;
    followers: number;
    listsSaved: number;
    commentsPosted: number;
    highFivesGiven: number;
    highFivesReceived: number;
    trendsStarted: number;
    firstToSave: number;
  };
  analytics: {
    tasteProfile: {
      categoryBreakdown: { [category: string]: number };
      genrePreferences: { [genre: string]: number };
      votingPatterns: {
        upvotesByCategory: { [category: string]: number };
        downvotesByCategory: { [category: string]: number };
      };
      discoveryHistory: Array<{
        date: string;
        category: string;
        action: 'saved' | 'voted' | 'created';
      }>;
    };
    influence: {
      totalSavesReceived: number;
      totalHighFivesReceived: number;
      listImpact: Array<{
        listId: number;
        title: string;
        saves: number;
        highFives: number;
        votes: number;
      }>;
      trendsettingScore: number;
      firstDiscoveries: number;
    };
  };
}

export interface ListReminder {
  id: string;
  listId: number;
  userId: string;
  reminderDate: string;
  reminderType: 'revisit' | 'update' | 'custom';
  message?: string;
  isActive: boolean;
  createdAt: string;
}

export interface List {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  votes: number;
  upvotes: number;
  downvotes: number;
  userVote: 'up' | 'down' | null;
  highFives: number;
  userHighFived: boolean;
  items: string[];
  description: string;
  rawDescription?: string; // Original description before mention processing
  mentions?: string[]; // Array of mentioned usernames in description
  tags?: string[]; // Custom tags for the list
  comments: Comment[];
  saves: number;
  isRejected?: boolean;
  isNSFW?: boolean;
  reminders?: ListReminder[];
  isOrdered?: boolean; // Whether this list should be displayed with ranking numbers
  twins?: string[]; // Array of all authors who created this exact same list
  twinCount?: number; // Number of users who independently created this identical list
}

export interface Notification {
  id: number | string;
  type: 'like' | 'follow' | 'comment' | 'high_five' | 'mention' | 'tag';
  user: string;
  content: string;
  time: string;
  unread: boolean;
  contextType?: 'list' | 'comment' | 'reply' | 'message';
  contextId?: string;
  listId?: number;
  listTitle?: string;
  mentionData?: {
    context: string;
    contextId: string;
    listId: number | undefined;
    listTitle: string | undefined;
  };
}

export interface Comment {
  id: number;
  user: string;
  content: string;
  rawContent?: string; // Original content before mention processing
  mentions?: string[]; // Array of mentioned usernames
  time: string;
  avatar: string;
  replies?: Comment[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'list_share' | 'system';
  listContext?: {
    listId: number;
    listTitle: string;
    listAuthor: string;
  };
  edited?: boolean;
  editedAt?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: ChatMessage;
  unreadCount: number;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface MessagePreview {
  conversationId: string;
  otherUser: string;
  otherUserAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline?: boolean;
}

export interface UserProfile {
  username: string;
  bio: string;
  avatar: string;
  avatarImage: string | null;
  followers: number;
  following: number;
  favoriteGenres: string[];
  isFollowing?: boolean;
}

export interface TMDbItem {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Artist {
  id: number;
  name: string;
  biography: string;
  image: string;
  formed: string;
  genres: string[];
  members: string[];
}

export interface ItemVotes {
  [key: string]: {
    [itemIndex: number]: {
      upvotes: number;
      downvotes: number;
      userVote: 'up' | 'down' | null;
    };
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: any) => boolean;
  earned?: boolean;
}

export type ViewType = 
  | 'home' 
  | 'discover' 
  | 'local'
  | 'favorites' 
  | 'messages' 
  | 'community' 
  | 'profile'
  | 'rejected'
  | 'events'
  | 'groups'
  | 'podcast'
  | 'leaderboard';

export type FeedTab = 
  | 'yourfeed' 
  | 'all' 
  | 'new' 
  | 'best' 
  | 'likes' 
  | 'comments';

export type TrendingTab = 
  | 'votes' 
  | 'comments' 
  | 'saved'
  | 'highfives';

export interface SocialEvent {
  id: string;
  title: string;
  description: string;
  type: 'movie_night' | 'book_club' | 'music_listening' | 'game_night' | 'meetup' | 'discussion' | 'activity';
  category: string;
  relatedListId?: number;
  relatedItems: string[];
  host: {
    username: string;
    avatar: string;
    avatarImage?: string;
    badges: UserBadge[];
  };
  dateTime: string;
  endDateTime?: string;
  location: {
    type: 'online' | 'in_person' | 'hybrid';
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    platform?: string; // For online events: Zoom, Discord, etc.
    meetingLink?: string;
  };
  capacity: {
    min: number;
    max: number;
    current: number;
  };
  rsvp: {
    going: string[];
    maybe: string[];
    notGoing: string[];
  };
  requirements?: string[];
  tags: string[];
  isPrivate: boolean;
  requiresApproval: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  photos: string[];
  chat: EventMessage[];
}

export interface EventMessage {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  avatar: string;
  replyTo?: string;
}

export interface EventFilter {
  type?: string[];
  category?: string[];
  location?: 'online' | 'in_person' | 'hybrid';
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
  capacity?: {
    hasSpace: boolean;
  };
}

export interface BookmarkedItem {
  id: string;
  listId: number;
  itemIndex: number;
  itemName: string;
  listTitle: string;
  listAuthor: string;
  listCategory: string;
  bookmarkedAt: string;
  notes?: string;
}

export interface BookmarkState {
  [key: string]: boolean; // Key format: "listId-itemIndex"
}

export interface TopicGroup {
  id: string;
  name: string;
  description: string;
  topic: string;
  category: string;
  founder: string;
  createdAt: string;
  memberCount: number;
  members: GroupMember[];
  isPublic: boolean;
  requiresApproval: boolean;
  tags: string[];
  rules: string[];
  featuredLists: number[]; // List IDs
  recentActivity: GroupActivity[];
  stats: {
    totalLists: number;
    totalDiscussions: number;
    activeMembers: number;
    weeklyActivity: number;
  };
}

export interface GroupMember {
  username: string;
  role: 'founder' | 'admin' | 'moderator' | 'member';
  joinedAt: string;
  contributionScore: number;
  badges: string[]; // Group-specific badges
  isActive: boolean;
  lastSeen: string;
}

export interface GroupActivity {
  id: string;
  type: 'list_shared' | 'member_joined' | 'discussion_started' | 'event_created';
  actor: string;
  content: string;
  timestamp: string;
  metadata?: {
    listId?: number;
    discussionId?: string;
    eventId?: string;
  };
}

export interface GroupDiscussion {
  id: string;
  groupId: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  replies: DiscussionReply[];
  tags: string[];
  isPinned: boolean;
  upvotes: number;
  userVote: 'up' | 'down' | null;
}

export interface DiscussionReply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  upvotes: number;
  userVote: 'up' | 'down' | null;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  hosts: string[];
  featuredList: {
    id: number;
    title: string;
    author: string;
    category: string;
  };
  audioUrl: string;
  duration: number; // in seconds
  publishedAt: string;
  season: number;
  episode: number;
  tags: string[];
  playCount: number;
  likes: number;
  userLiked: boolean;
  transcript?: string;
  showNotes?: string[];
  guestAppearances?: {
    username: string;
    role: string;
  }[];
}

export interface PodcastSeason {
  id: string;
  seasonNumber: number;
  title: string;
  description: string;
  episodes: PodcastEpisode[];
  startDate: string;
  endDate?: string;
  coverArt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  avatarImage?: string;
  badges: UserBadge[];
  score: number;
  scoreType: 'saves' | 'high_fives' | 'lists' | 'comments' | 'votes';
  featuredList?: {
    id: number;
    title: string;
    category: string;
  };
  change?: 'up' | 'down' | 'same' | 'new';
}

export interface LeaderboardData {
  timePeriod: '24h' | '7d' | '30d' | 'all';
  category: 'taste_makers' | 'trend_setters' | 'community_heroes' | 'quality_creators';
  entries: LeaderboardEntry[];
  lastUpdated: string;
}