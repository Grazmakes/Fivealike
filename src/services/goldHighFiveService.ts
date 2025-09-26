import { List, User, BookmarkedItem } from '@/types';

export interface GoldHighFive {
  id: string;
  listId: number;
  listTitle: string;
  listAuthor: string;
  completedBy: string;
  completedAt: string;
  rating: 'gold' | 'silver' | 'bronze'; // Based on completion percentage
  completedItems: {
    itemIndex: number;
    itemName: string;
    rating: 'up' | 'down';
    completedAt: string;
  }[];
}

export interface ListCompletionStatus {
  listId: number;
  listTitle: string;
  listAuthor: string;
  totalItems: number;
  completedItems: number;
  positivelyRatedItems: number;
  completionPercentage: number;
  isEligibleForGoldHighFive: boolean;
  completedItemsData: {
    itemIndex: number;
    itemName: string;
    rating: 'up' | 'down';
    completedAt: string;
  }[];
}

class GoldHighFiveService {
  private static instance: GoldHighFiveService;
  private goldHighFives: GoldHighFive[] = [];
  private completionStatuses: { [userId: string]: { [listId: number]: ListCompletionStatus } } = {};

  static getInstance(): GoldHighFiveService {
    if (!GoldHighFiveService.instance) {
      GoldHighFiveService.instance = new GoldHighFiveService();
    }
    return GoldHighFiveService.instance;
  }

  // Check if completing this item triggers a Gold High Five
  checkForGoldHighFive(
    userId: string,
    listId: number,
    itemIndex: number,
    rating: 'up' | 'down',
    listData: List,
    userArchivedItems: any[] // Items that user has tried and rated
  ): { triggersGoldHighFive: boolean; completionStatus: ListCompletionStatus } {

    // Get current completion status for this user and list
    const completionStatus = this.getListCompletionStatus(userId, listId, listData, userArchivedItems);

    // Update with the new rating
    const existingItemIndex = completionStatus.completedItemsData.findIndex(item => item.itemIndex === itemIndex);
    if (existingItemIndex >= 0) {
      // Update existing rating
      completionStatus.completedItemsData[existingItemIndex].rating = rating;
    } else {
      // Add new completion
      completionStatus.completedItemsData.push({
        itemIndex,
        itemName: listData.items[itemIndex],
        rating,
        completedAt: new Date().toISOString()
      });
    }

    // Recalculate stats
    completionStatus.completedItems = completionStatus.completedItemsData.length;
    completionStatus.positivelyRatedItems = completionStatus.completedItemsData.filter(item => item.rating === 'up').length;
    completionStatus.completionPercentage = Math.round((completionStatus.completedItems / completionStatus.totalItems) * 100);

    // Check if eligible for Gold High Five (all 5 items completed with positive ratings)
    const isEligibleForGoldHighFive = completionStatus.completedItems === 5 && completionStatus.positivelyRatedItems === 5;
    completionStatus.isEligibleForGoldHighFive = isEligibleForGoldHighFive;

    // Store updated status
    if (!this.completionStatuses[userId]) {
      this.completionStatuses[userId] = {};
    }
    this.completionStatuses[userId][listId] = completionStatus;

    return {
      triggersGoldHighFive: isEligibleForGoldHighFive,
      completionStatus
    };
  }

  // Create a Gold High Five award
  createGoldHighFive(
    userId: string,
    listData: List,
    completionStatus: ListCompletionStatus
  ): GoldHighFive {
    const goldHighFive: GoldHighFive = {
      id: `ghf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      listId: listData.id,
      listTitle: listData.title,
      listAuthor: listData.author,
      completedBy: userId,
      completedAt: new Date().toISOString(),
      rating: this.getGoldHighFiveRating(completionStatus),
      completedItems: completionStatus.completedItemsData
    };

    // Store the Gold High Five
    this.goldHighFives.push(goldHighFive);

    return goldHighFive;
  }

  // Get completion status for a specific list and user
  getListCompletionStatus(
    userId: string,
    listId: number,
    listData: List,
    userArchivedItems: any[]
  ): ListCompletionStatus {

    // Check if we have cached status
    if (this.completionStatuses[userId]?.[listId]) {
      return this.completionStatuses[userId][listId];
    }

    // Get completed items for this specific list from archived items
    const listCompletedItems = userArchivedItems
      .filter(item => item.listId === listId)
      .map(item => ({
        itemIndex: item.itemIndex,
        itemName: item.itemName,
        rating: item.rating as 'up' | 'down',
        completedAt: item.archivedAt || item.triedAt || new Date().toISOString()
      }));

    const completedCount = listCompletedItems.length;
    const positiveCount = listCompletedItems.filter(item => item.rating === 'up').length;
    const completionPercentage = Math.round((completedCount / 5) * 100);

    const status: ListCompletionStatus = {
      listId,
      listTitle: listData.title,
      listAuthor: listData.author,
      totalItems: 5,
      completedItems: completedCount,
      positivelyRatedItems: positiveCount,
      completionPercentage,
      isEligibleForGoldHighFive: completedCount === 5 && positiveCount === 5,
      completedItemsData: listCompletedItems
    };

    return status;
  }

  // Get rating tier based on completion quality
  private getGoldHighFiveRating(completionStatus: ListCompletionStatus): 'gold' | 'silver' | 'bronze' {
    if (completionStatus.positivelyRatedItems === 5) return 'gold';
    if (completionStatus.positivelyRatedItems >= 4) return 'silver';
    return 'bronze';
  }

  // Get all Gold High Fives for a user
  getUserGoldHighFives(userId: string): GoldHighFive[] {
    return this.goldHighFives.filter(ghf => ghf.completedBy === userId);
  }

  // Get all Gold High Fives received by a list author
  getAuthorGoldHighFives(authorName: string): GoldHighFive[] {
    return this.goldHighFives.filter(ghf => ghf.listAuthor === authorName);
  }

  // Get Gold High Five count for a list
  getListGoldHighFiveCount(listId: number): number {
    return this.goldHighFives.filter(ghf => ghf.listId === listId).length;
  }

  // Check if a list is "High Fived" (has received gold high fives)
  isListHighFived(listId: number, threshold: number = 3): boolean {
    const goldHighFiveCount = this.getListGoldHighFiveCount(listId);
    return goldHighFiveCount >= threshold;
  }

  // Get all completion statuses for a user
  getUserCompletionStatuses(userId: string): { [listId: number]: ListCompletionStatus } {
    return this.completionStatuses[userId] || {};
  }

  // Get lists near completion for a user (4/5 items completed)
  getListsNearCompletion(userId: string): ListCompletionStatus[] {
    const userStatuses = this.getUserCompletionStatuses(userId);
    return Object.values(userStatuses).filter(status =>
      status.completedItems >= 4 && !status.isEligibleForGoldHighFive
    );
  }

  // Clear data (for testing or reset)
  clearData(): void {
    this.goldHighFives = [];
    this.completionStatuses = {};
  }
}

export default GoldHighFiveService;