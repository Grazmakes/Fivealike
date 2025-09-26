# Gold High Five System - Deployment Guide

This guide explains how to deploy the new Gold High Five system features to your Supabase database.

## Database Schema Changes

The new Gold High Five system introduces several new tables and features:

### New Tables
1. **bookmarked_items** - Stores user's bookmarked items from lists
2. **archived_items** - Stores items users have tried and rated
3. **gold_high_fives** - Stores Gold High Five awards when users complete lists
4. **list_completion_status** - Tracks progress on lists

### Features Added
- Individual item bookmarking system
- Try/rate system for bookmarked items
- Archive with statistics and filtering
- Gold High Five rewards for completing lists with positive ratings
- High Fived certification badges for popular lists
- Progress tracking with visual indicators

## Deployment Steps

### 1. Database Migration

Run the SQL migration file in your Supabase SQL editor:

```sql
-- Copy and paste the contents of:
-- database/migrations/001_add_gold_high_five_system.sql
```

This will create:
- All new tables with proper indexes
- Row Level Security (RLS) policies
- Helper functions for statistics
- Triggers to maintain data consistency

### 2. Environment Variables

Ensure these environment variables are set in your deployment:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. API Routes

The following new API routes are available:

- `GET/POST/DELETE /api/bookmarks` - Manage bookmarked items
- `GET/POST/PUT /api/archive` - Manage archived/tried items
- `GET/POST /api/gold-high-fives` - Manage Gold High Five awards
- `GET /api/completion-status` - Get list completion progress

### 4. Component Updates

The following components have been updated:

- **ListCard**: Removed individual item voting, added High Fived badges
- **Favorites**: Now includes enhanced BookmarkedItems component
- **BookmarkedItems**: Added try/vote functionality and progress tracking
- **Archive**: New component for viewing tried items with statistics
- **Navigation**: Added archive view option

## Features Overview

### Bookmarking System
- Users can bookmark individual items from lists
- Bookmarks are stored per user with metadata
- Search and filter bookmarked items
- Progress tracking shows completion status

### Try/Rate System
- Users can rate bookmarked items as "Loved it" or "Not for me"
- Items move from bookmarks to archive when rated
- Archive maintains history with timestamps and notes

### Gold High Five Rewards
- Triggered when user completes all 5 items from a list with positive ratings
- Awards come in Gold, Silver, Bronze tiers based on rating quality
- Sends notification popup to celebrate achievement
- List creators receive Gold High Five credit

### High Fived Certification
- Lists that receive multiple Gold High Fives get "High Fived" badge
- Badge appears on list cards to show quality/popularity
- Configurable threshold (default: 3 Gold High Fives)

### Progress Tracking
- Visual progress bars show completion status
- "Almost there!" notifications for near-complete lists (4/5 items)
- List view shows progress across all saved lists

## Database Functions

### Statistics Functions
```sql
-- Get Gold High Five stats for a list
SELECT * FROM get_list_gold_high_five_stats(list_id);

-- Get user's archive statistics
SELECT * FROM get_user_archive_stats(user_id);
```

### Triggers
- Auto-update completion status when bookmarks/archives change
- Maintain data consistency across related tables

## Security

### Row Level Security (RLS)
- Users can only access their own bookmarks and archived items
- Gold High Fives are publicly readable but only insertable by owner
- Completion status is private to each user

### API Authentication
- All API routes require valid Supabase user session
- User ID extracted from JWT token for security
- Proper error handling for unauthorized access

## Testing

To test the new features:

1. **Bookmark Items**: Click bookmark icon on list items
2. **Try Items**: Go to Favorites → Bookmarked Items → Rate items
3. **View Archive**: Navigate to Archive view to see tried items
4. **Gold High Five**: Complete all 5 items from a list with positive ratings
5. **Progress Tracking**: Check progress view in bookmarked items

## Performance Considerations

### Indexes
- Proper indexes added for common query patterns
- Composite indexes for user + list queries
- Time-based indexes for recent activity

### Caching
- Consider implementing Redis cache for:
  - Gold High Five counts per list
  - User archive statistics
  - Completion status summaries

### Batch Operations
- Bulk archive API supports multiple items
- Efficient triggers minimize database calls
- Optimized queries with proper joins

## Monitoring

Monitor these metrics:
- Gold High Five creation rate
- Archive vs bookmark ratios
- List completion percentages
- Database query performance

## Future Enhancements

Potential improvements:
- Email notifications for Gold High Fives
- Leaderboards for most Gold High Fives received
- Recommendation engine based on archive data
- Social sharing of achievements
- Mobile push notifications

## Troubleshooting

### Common Issues

1. **RLS Policy Errors**: Ensure user is properly authenticated
2. **Unique Constraint Violations**: Check for duplicate bookmarks/archives
3. **Trigger Failures**: Verify completion status updates properly
4. **Performance Issues**: Check indexes and query optimization

### Rollback Plan

If issues arise:
1. Disable new features in frontend
2. Keep existing bookmark/voting system functional
3. Database rollback scripts available if needed
4. Monitor error logs for issues

## Support

For questions or issues:
- Check console logs for detailed error messages
- Verify Supabase connection and permissions
- Test with simple bookmark operations first
- Review API response status codes