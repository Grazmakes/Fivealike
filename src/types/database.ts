// Database types for the Gold High Five system

export interface Database {
  public: {
    Tables: {
      bookmarked_items: {
        Row: {
          id: string;
          user_id: string;
          list_id: number;
          item_index: number;
          item_name: string;
          list_title: string;
          list_author: string;
          list_category: string;
          bookmarked_at: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          list_id: number;
          item_index: number;
          item_name: string;
          list_title: string;
          list_author: string;
          list_category: string;
          bookmarked_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          list_id?: number;
          item_index?: number;
          item_name?: string;
          list_title?: string;
          list_author?: string;
          list_category?: string;
          bookmarked_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      archived_items: {
        Row: {
          id: string;
          user_id: string;
          list_id: number;
          item_index: number;
          item_name: string;
          list_title: string;
          list_author: string;
          list_category: string;
          rating: 'up' | 'down' | 'neutral';
          tried_at: string;
          archived_at: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          list_id: number;
          item_index: number;
          item_name: string;
          list_title: string;
          list_author: string;
          list_category: string;
          rating: 'up' | 'down' | 'neutral';
          tried_at?: string;
          archived_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          list_id?: number;
          item_index?: number;
          item_name?: string;
          list_title?: string;
          list_author?: string;
          list_category?: string;
          rating?: 'up' | 'down' | 'neutral';
          tried_at?: string;
          archived_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      gold_high_fives: {
        Row: {
          id: string;
          list_id: number;
          list_title: string;
          list_author: string;
          completed_by_user_id: string;
          completed_by_username: string;
          completed_at: string;
          rating: 'gold' | 'silver' | 'bronze';
          total_items_completed: number;
          positive_items_count: number;
          completion_data: any; // JSONB
          created_at: string;
        };
        Insert: {
          id?: string;
          list_id: number;
          list_title: string;
          list_author: string;
          completed_by_user_id: string;
          completed_by_username: string;
          completed_at?: string;
          rating?: 'gold' | 'silver' | 'bronze';
          total_items_completed?: number;
          positive_items_count?: number;
          completion_data?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          list_id?: number;
          list_title?: string;
          list_author?: string;
          completed_by_user_id?: string;
          completed_by_username?: string;
          completed_at?: string;
          rating?: 'gold' | 'silver' | 'bronze';
          total_items_completed?: number;
          positive_items_count?: number;
          completion_data?: any;
          created_at?: string;
        };
      };
      list_completion_status: {
        Row: {
          id: string;
          user_id: string;
          list_id: number;
          list_title: string;
          list_author: string;
          list_category: string;
          total_items: number;
          bookmarked_items_count: number;
          completed_items_count: number;
          positive_items_count: number;
          completion_percentage: number;
          is_eligible_for_gold_high_five: boolean;
          last_updated: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          list_id: number;
          list_title: string;
          list_author: string;
          list_category: string;
          total_items?: number;
          bookmarked_items_count?: number;
          completed_items_count?: number;
          positive_items_count?: number;
          completion_percentage?: number;
          is_eligible_for_gold_high_five?: boolean;
          last_updated?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          list_id?: number;
          list_title?: string;
          list_author?: string;
          list_category?: string;
          total_items?: number;
          bookmarked_items_count?: number;
          completed_items_count?: number;
          positive_items_count?: number;
          completion_percentage?: number;
          is_eligible_for_gold_high_five?: boolean;
          last_updated?: string;
          created_at?: string;
        };
      };
    };
    Functions: {
      get_list_gold_high_five_stats: {
        Args: { p_list_id: number };
        Returns: {
          gold_count: number;
          silver_count: number;
          bronze_count: number;
          total_count: number;
          is_high_fived: boolean;
        }[];
      };
      get_user_archive_stats: {
        Args: { p_user_id: string };
        Returns: {
          total_tried: number;
          loved_items: number;
          disliked_items: number;
          success_rate: number;
        }[];
      };
    };
  };
}

// Extended interfaces for the application
export interface BookmarkedItemDB extends Database['public']['Tables']['bookmarked_items']['Row'] {}
export interface ArchivedItemDB extends Database['public']['Tables']['archived_items']['Row'] {}
export interface GoldHighFiveDB extends Database['public']['Tables']['gold_high_fives']['Row'] {}
export interface ListCompletionStatusDB extends Database['public']['Tables']['list_completion_status']['Row'] {}

// API interfaces that combine database and application data
export interface BookmarkedItemWithStatus extends BookmarkedItemDB {
  canTry?: boolean;
  isCompleted?: boolean;
}

export interface ArchivedItemWithDetails extends ArchivedItemDB {
  formattedDate?: string;
  category?: string;
}

export interface GoldHighFiveWithDetails extends GoldHighFiveDB {
  listUrl?: string;
  authorProfile?: any;
  achievements?: string[];
}

export interface ListCompletionWithProgress extends ListCompletionStatusDB {
  nextRecommendation?: string;
  estimatedTimeToComplete?: number;
  relatedLists?: number[];
}

// Request/Response types for API endpoints
export interface BookmarkItemRequest {
  listId: number;
  itemIndex: number;
  itemName: string;
  listTitle: string;
  listAuthor: string;
  listCategory: string;
  notes?: string;
}

export interface ArchiveItemRequest {
  listId: number;
  itemIndex: number;
  itemName: string;
  listTitle: string;
  listAuthor: string;
  listCategory: string;
  rating: 'up' | 'down' | 'neutral';
  notes?: string;
}

export interface CreateGoldHighFiveRequest {
  listId: number;
  listTitle: string;
  listAuthor: string;
  rating?: 'gold' | 'silver' | 'bronze';
  completionData: any;
}

// Statistics interfaces
export interface UserArchiveStats {
  totalTried: number;
  lovedItems: number;
  dislikedItems: number;
  successRate: number;
  categoriesTried: string[];
  favoriteCategories: string[];
  completedListsCount: number;
  goldHighFivesGiven: number;
}

export interface ListStats {
  goldHighFives: number;
  silverHighFives: number;
  bronzeHighFives: number;
  totalHighFives: number;
  isHighFived: boolean;
  averageRating: number;
  completionRate: number;
  popularItems: string[];
}

export interface CategoryStats {
  category: string;
  totalItems: number;
  lovedItems: number;
  dislikedItems: number;
  successRate: number;
  averageCompletionTime: number;
}

// Error types
export interface DatabaseError {
  message: string;
  code?: string;
  details?: any;
}

// Response wrapper type
export interface ApiResponse<T> {
  data?: T;
  error?: DatabaseError;
  success: boolean;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Filter types for queries
export interface BookmarkFilters extends PaginationParams {
  category?: string;
  searchQuery?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ArchiveFilters extends PaginationParams {
  category?: string;
  rating?: 'up' | 'down' | 'neutral';
  searchQuery?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface GoldHighFiveFilters extends PaginationParams {
  listAuthor?: string;
  rating?: 'gold' | 'silver' | 'bronze';
  dateRange?: {
    start: string;
    end: string;
  };
}