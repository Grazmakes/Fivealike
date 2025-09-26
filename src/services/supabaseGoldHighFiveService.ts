import { createClient } from '@supabase/supabase-js';
import { Database, BookmarkedItemDB, ArchivedItemDB, GoldHighFiveDB, ListCompletionStatusDB } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export class SupabaseGoldHighFiveService {
  private static instance: SupabaseGoldHighFiveService;

  static getInstance(): SupabaseGoldHighFiveService {
    if (!SupabaseGoldHighFiveService.instance) {
      SupabaseGoldHighFiveService.instance = new SupabaseGoldHighFiveService();
    }
    return SupabaseGoldHighFiveService.instance;
  }

  // ============= BOOKMARKED ITEMS =============

  async addBookmark(
    userId: string,
    listId: number,
    itemIndex: number,
    itemName: string,
    listTitle: string,
    listAuthor: string,
    listCategory: string,
    notes?: string
  ) {
    const { data, error } = await supabase
      .from('bookmarked_items')
      .insert({
        user_id: userId,
        list_id: listId,
        item_index: itemIndex,
        item_name: itemName,
        list_title: listTitle,
        list_author: listAuthor,
        list_category: listCategory,
        notes
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeBookmark(userId: string, listId: number, itemIndex: number) {
    const { error } = await supabase
      .from('bookmarked_items')
      .delete()
      .eq('user_id', userId)
      .eq('list_id', listId)
      .eq('item_index', itemIndex);

    if (error) throw error;
  }

  async getUserBookmarks(userId: string) {
    const { data, error } = await supabase
      .from('bookmarked_items')
      .select('*')
      .eq('user_id', userId)
      .order('bookmarked_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getListBookmarks(userId: string, listId: number) {
    const { data, error } = await supabase
      .from('bookmarked_items')
      .select('*')
      .eq('user_id', userId)
      .eq('list_id', listId)
      .order('item_index');

    if (error) throw error;
    return data || [];
  }

  // ============= ARCHIVED ITEMS =============

  async archiveItem(
    userId: string,
    listId: number,
    itemIndex: number,
    itemName: string,
    listTitle: string,
    listAuthor: string,
    listCategory: string,
    rating: 'up' | 'down' | 'neutral',
    notes?: string
  ) {
    // First, remove from bookmarks if it exists
    await this.removeBookmark(userId, listId, itemIndex);

    // Then add to archive
    const { data, error } = await supabase
      .from('archived_items')
      .insert({
        user_id: userId,
        list_id: listId,
        item_index: itemIndex,
        item_name: itemName,
        list_title: listTitle,
        list_author: listAuthor,
        list_category: listCategory,
        rating,
        notes
      })
      .select()
      .single();

    if (error) throw error;

    // Check if this triggers a Gold High Five
    const completionStatus = await this.getListCompletionStatus(userId, listId);
    if (completionStatus?.is_eligible_for_gold_high_five) {
      await this.createGoldHighFive(userId, listId, listTitle, listAuthor);
    }

    return data;
  }

  async getUserArchivedItems(userId: string) {
    const { data, error } = await supabase
      .from('archived_items')
      .select('*')
      .eq('user_id', userId)
      .order('tried_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getListArchivedItems(userId: string, listId: number) {
    const { data, error } = await supabase
      .from('archived_items')
      .select('*')
      .eq('user_id', userId)
      .eq('list_id', listId)
      .order('item_index');

    if (error) throw error;
    return data || [];
  }

  // ============= GOLD HIGH FIVES =============

  async createGoldHighFive(
    userId: string,
    listId: number,
    listTitle: string,
    listAuthor: string
  ) {
    // Get user info
    const { data: userData } = await supabase.auth.getUser();
    const username = userData.user?.user_metadata?.username || userData.user?.email || 'Anonymous';

    // Get completion data
    const archivedItems = await this.getListArchivedItems(userId, listId);
    const positiveCount = archivedItems.filter(item => item.rating === 'up').length;

    // Determine rating
    let rating: 'gold' | 'silver' | 'bronze' = 'bronze';
    if (positiveCount === 5) rating = 'gold';
    else if (positiveCount >= 4) rating = 'silver';

    const { data, error } = await supabase
      .from('gold_high_fives')
      .insert({
        list_id: listId,
        list_title: listTitle,
        list_author: listAuthor,
        completed_by_user_id: userId,
        completed_by_username: username,
        rating,
        total_items_completed: archivedItems.length,
        positive_items_count: positiveCount,
        completion_data: archivedItems
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getListGoldHighFives(listId: number) {
    const { data, error } = await supabase
      .from('gold_high_fives')
      .select('*')
      .eq('list_id', listId)
      .order('completed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getUserGoldHighFives(userId: string) {
    const { data, error } = await supabase
      .from('gold_high_fives')
      .select('*')
      .eq('completed_by_user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getAuthorGoldHighFives(authorName: string) {
    const { data, error } = await supabase
      .from('gold_high_fives')
      .select('*')
      .eq('list_author', authorName)
      .order('completed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // ============= LIST COMPLETION STATUS =============

  async getListCompletionStatus(userId: string, listId: number) {
    const { data, error } = await supabase
      .from('list_completion_status')
      .select('*')
      .eq('user_id', userId)
      .eq('list_id', listId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data;
  }

  async getUserCompletionStatuses(userId: string) {
    const { data, error } = await supabase
      .from('list_completion_status')
      .select('*')
      .eq('user_id', userId)
      .order('last_updated', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getListsNearCompletion(userId: string) {
    const { data, error } = await supabase
      .from('list_completion_status')
      .select('*')
      .eq('user_id', userId)
      .gte('completed_items_count', 4)
      .eq('is_eligible_for_gold_high_five', false)
      .order('completion_percentage', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // ============= STATISTICS =============

  async getUserArchiveStats(userId: string) {
    const { data, error } = await supabase
      .rpc('get_user_archive_stats', { p_user_id: userId });

    if (error) throw error;
    return data?.[0] || { total_tried: 0, loved_items: 0, disliked_items: 0, success_rate: 0 };
  }

  async getListGoldHighFiveStats(listId: number) {
    const { data, error } = await supabase
      .rpc('get_list_gold_high_five_stats', { p_list_id: listId });

    if (error) throw error;
    return data?.[0] || { gold_count: 0, silver_count: 0, bronze_count: 0, total_count: 0, is_high_fived: false };
  }

  // ============= BULK OPERATIONS =============

  async moveBookmarkToArchive(
    userId: string,
    listId: number,
    itemIndex: number,
    rating: 'up' | 'down' | 'neutral',
    notes?: string
  ) {
    // Get the bookmark first
    const { data: bookmark, error: bookmarkError } = await supabase
      .from('bookmarked_items')
      .select('*')
      .eq('user_id', userId)
      .eq('list_id', listId)
      .eq('item_index', itemIndex)
      .single();

    if (bookmarkError) throw bookmarkError;

    // Archive the item
    return this.archiveItem(
      userId,
      listId,
      itemIndex,
      bookmark.item_name,
      bookmark.list_title,
      bookmark.list_author,
      bookmark.list_category,
      rating,
      notes
    );
  }

  async bulkArchiveBookmarks(
    userId: string,
    items: Array<{
      listId: number;
      itemIndex: number;
      rating: 'up' | 'down' | 'neutral';
      notes?: string;
    }>
  ) {
    const results = [];
    for (const item of items) {
      try {
        const result = await this.moveBookmarkToArchive(
          userId,
          item.listId,
          item.itemIndex,
          item.rating,
          item.notes
        );
        results.push({ success: true, data: result });
      } catch (error) {
        results.push({ success: false, error, item });
      }
    }
    return results;
  }

  // ============= SEARCH AND FILTERING =============

  async searchBookmarks(userId: string, query: string, category?: string) {
    let queryBuilder = supabase
      .from('bookmarked_items')
      .select('*')
      .eq('user_id', userId);

    if (query) {
      queryBuilder = queryBuilder.or(`item_name.ilike.%${query}%,list_title.ilike.%${query}%,list_author.ilike.%${query}%`);
    }

    if (category) {
      queryBuilder = queryBuilder.eq('list_category', category);
    }

    const { data, error } = await queryBuilder
      .order('bookmarked_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async searchArchivedItems(userId: string, query: string, category?: string, rating?: 'up' | 'down' | 'neutral') {
    let queryBuilder = supabase
      .from('archived_items')
      .select('*')
      .eq('user_id', userId);

    if (query) {
      queryBuilder = queryBuilder.or(`item_name.ilike.%${query}%,list_title.ilike.%${query}%,list_author.ilike.%${query}%`);
    }

    if (category) {
      queryBuilder = queryBuilder.eq('list_category', category);
    }

    if (rating) {
      queryBuilder = queryBuilder.eq('rating', rating);
    }

    const { data, error } = await queryBuilder
      .order('tried_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // ============= CLEANUP =============

  async clearUserData(userId: string) {
    // Remove all user's bookmarks
    await supabase
      .from('bookmarked_items')
      .delete()
      .eq('user_id', userId);

    // Remove all user's archived items
    await supabase
      .from('archived_items')
      .delete()
      .eq('user_id', userId);

    // Remove all user's Gold High Fives
    await supabase
      .from('gold_high_fives')
      .delete()
      .eq('completed_by_user_id', userId);

    // Remove all user's completion statuses
    await supabase
      .from('list_completion_status')
      .delete()
      .eq('user_id', userId);
  }
}

export default SupabaseGoldHighFiveService;