-- Migration: Add Gold High Five System
-- Description: Adds tables for bookmarked items, archived items, and Gold High Five tracking
-- Date: 2025-01-23

-- Table for storing bookmarked items
CREATE TABLE IF NOT EXISTS bookmarked_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    list_id INTEGER NOT NULL,
    item_index INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    list_title TEXT NOT NULL,
    list_author TEXT NOT NULL,
    list_category TEXT NOT NULL,
    bookmarked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Ensure unique bookmarks per user/list/item
    UNIQUE(user_id, list_id, item_index)
);

-- Table for storing archived/tried items
CREATE TABLE IF NOT EXISTS archived_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    list_id INTEGER NOT NULL,
    item_index INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    list_title TEXT NOT NULL,
    list_author TEXT NOT NULL,
    list_category TEXT NOT NULL,
    rating VARCHAR(10) CHECK (rating IN ('up', 'down', 'neutral')) NOT NULL,
    tried_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    archived_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Ensure unique archived items per user/list/item
    UNIQUE(user_id, list_id, item_index)
);

-- Table for storing Gold High Fives
CREATE TABLE IF NOT EXISTS gold_high_fives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    list_id INTEGER NOT NULL,
    list_title TEXT NOT NULL,
    list_author TEXT NOT NULL,
    completed_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    completed_by_username TEXT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rating VARCHAR(10) CHECK (rating IN ('gold', 'silver', 'bronze')) DEFAULT 'gold',
    total_items_completed INTEGER DEFAULT 5,
    positive_items_count INTEGER DEFAULT 5,
    completion_data JSONB, -- Stores the completed items data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Ensure unique Gold High Five per user/list
    UNIQUE(completed_by_user_id, list_id)
);

-- Table for tracking list completion progress
CREATE TABLE IF NOT EXISTS list_completion_status (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    list_id INTEGER NOT NULL,
    list_title TEXT NOT NULL,
    list_author TEXT NOT NULL,
    list_category TEXT NOT NULL,
    total_items INTEGER DEFAULT 5,
    bookmarked_items_count INTEGER DEFAULT 0,
    completed_items_count INTEGER DEFAULT 0,
    positive_items_count INTEGER DEFAULT 0,
    completion_percentage INTEGER DEFAULT 0,
    is_eligible_for_gold_high_five BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Ensure unique status per user/list
    UNIQUE(user_id, list_id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookmarked_items_user_id ON bookmarked_items(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarked_items_list_id ON bookmarked_items(list_id);
CREATE INDEX IF NOT EXISTS idx_bookmarked_items_bookmarked_at ON bookmarked_items(bookmarked_at DESC);

CREATE INDEX IF NOT EXISTS idx_archived_items_user_id ON archived_items(user_id);
CREATE INDEX IF NOT EXISTS idx_archived_items_list_id ON archived_items(list_id);
CREATE INDEX IF NOT EXISTS idx_archived_items_rating ON archived_items(rating);
CREATE INDEX IF NOT EXISTS idx_archived_items_tried_at ON archived_items(tried_at DESC);

CREATE INDEX IF NOT EXISTS idx_gold_high_fives_list_id ON gold_high_fives(list_id);
CREATE INDEX IF NOT EXISTS idx_gold_high_fives_list_author ON gold_high_fives(list_author);
CREATE INDEX IF NOT EXISTS idx_gold_high_fives_completed_by ON gold_high_fives(completed_by_user_id);
CREATE INDEX IF NOT EXISTS idx_gold_high_fives_completed_at ON gold_high_fives(completed_at DESC);

CREATE INDEX IF NOT EXISTS idx_list_completion_user_id ON list_completion_status(user_id);
CREATE INDEX IF NOT EXISTS idx_list_completion_list_id ON list_completion_status(list_id);
CREATE INDEX IF NOT EXISTS idx_list_completion_eligible ON list_completion_status(is_eligible_for_gold_high_five);

-- Row Level Security (RLS) policies
ALTER TABLE bookmarked_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE archived_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gold_high_fives ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_completion_status ENABLE ROW LEVEL SECURITY;

-- Policies for bookmarked_items
CREATE POLICY "Users can view own bookmarked items" ON bookmarked_items
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarked items" ON bookmarked_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookmarked items" ON bookmarked_items
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarked items" ON bookmarked_items
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for archived_items
CREATE POLICY "Users can view own archived items" ON archived_items
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own archived items" ON archived_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own archived items" ON archived_items
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own archived items" ON archived_items
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for gold_high_fives
CREATE POLICY "Users can view all Gold High Fives" ON gold_high_fives
    FOR SELECT USING (true);

CREATE POLICY "Users can insert own Gold High Fives" ON gold_high_fives
    FOR INSERT WITH CHECK (auth.uid() = completed_by_user_id);

-- Policies for list_completion_status
CREATE POLICY "Users can view own completion status" ON list_completion_status
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completion status" ON list_completion_status
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own completion status" ON list_completion_status
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions for maintaining data consistency

-- Function to update list completion status when bookmarks or archived items change
CREATE OR REPLACE FUNCTION update_list_completion_status()
RETURNS TRIGGER AS $$
BEGIN
    -- This function will be called by triggers on bookmarked_items and archived_items
    -- to keep the list_completion_status table updated

    INSERT INTO list_completion_status (
        user_id,
        list_id,
        list_title,
        list_author,
        list_category,
        bookmarked_items_count,
        completed_items_count,
        positive_items_count,
        completion_percentage,
        is_eligible_for_gold_high_five
    )
    SELECT
        COALESCE(NEW.user_id, OLD.user_id) as user_id,
        COALESCE(NEW.list_id, OLD.list_id) as list_id,
        COALESCE(NEW.list_title, OLD.list_title) as list_title,
        COALESCE(NEW.list_author, OLD.list_author) as list_author,
        COALESCE(NEW.list_category, OLD.list_category) as list_category,
        COALESCE(
            (SELECT COUNT(*) FROM bookmarked_items b
             WHERE b.user_id = COALESCE(NEW.user_id, OLD.user_id)
             AND b.list_id = COALESCE(NEW.list_id, OLD.list_id)),
            0
        ) as bookmarked_count,
        COALESCE(
            (SELECT COUNT(*) FROM archived_items a
             WHERE a.user_id = COALESCE(NEW.user_id, OLD.user_id)
             AND a.list_id = COALESCE(NEW.list_id, OLD.list_id)),
            0
        ) as completed_count,
        COALESCE(
            (SELECT COUNT(*) FROM archived_items a
             WHERE a.user_id = COALESCE(NEW.user_id, OLD.user_id)
             AND a.list_id = COALESCE(NEW.list_id, OLD.list_id)
             AND a.rating = 'up'),
            0
        ) as positive_count,
        CASE
            WHEN COALESCE(
                (SELECT COUNT(*) FROM archived_items a
                 WHERE a.user_id = COALESCE(NEW.user_id, OLD.user_id)
                 AND a.list_id = COALESCE(NEW.list_id, OLD.list_id)),
                0
            ) > 0 THEN
                ROUND(
                    COALESCE(
                        (SELECT COUNT(*) FROM archived_items a
                         WHERE a.user_id = COALESCE(NEW.user_id, OLD.user_id)
                         AND a.list_id = COALESCE(NEW.list_id, OLD.list_id)),
                        0
                    ) * 100.0 / 5
                )
            ELSE 0
        END as completion_percentage,
        COALESCE(
            (SELECT COUNT(*) FROM archived_items a
             WHERE a.user_id = COALESCE(NEW.user_id, OLD.user_id)
             AND a.list_id = COALESCE(NEW.list_id, OLD.list_id)),
            0
        ) = 5
        AND
        COALESCE(
            (SELECT COUNT(*) FROM archived_items a
             WHERE a.user_id = COALESCE(NEW.user_id, OLD.user_id)
             AND a.list_id = COALESCE(NEW.list_id, OLD.list_id)
             AND a.rating = 'up'),
            0
        ) = 5 as is_eligible
    ON CONFLICT (user_id, list_id)
    DO UPDATE SET
        bookmarked_items_count = EXCLUDED.bookmarked_items_count,
        completed_items_count = EXCLUDED.completed_items_count,
        positive_items_count = EXCLUDED.positive_items_count,
        completion_percentage = EXCLUDED.completion_percentage,
        is_eligible_for_gold_high_five = EXCLUDED.is_eligible_for_gold_high_five,
        last_updated = NOW();

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers to maintain list completion status
CREATE TRIGGER trigger_update_completion_on_bookmark_change
    AFTER INSERT OR UPDATE OR DELETE ON bookmarked_items
    FOR EACH ROW EXECUTE FUNCTION update_list_completion_status();

CREATE TRIGGER trigger_update_completion_on_archive_change
    AFTER INSERT OR UPDATE OR DELETE ON archived_items
    FOR EACH ROW EXECUTE FUNCTION update_list_completion_status();

-- Function to get Gold High Five statistics for a list
CREATE OR REPLACE FUNCTION get_list_gold_high_five_stats(p_list_id INTEGER)
RETURNS TABLE (
    gold_count BIGINT,
    silver_count BIGINT,
    bronze_count BIGINT,
    total_count BIGINT,
    is_high_fived BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) FILTER (WHERE rating = 'gold') as gold_count,
        COUNT(*) FILTER (WHERE rating = 'silver') as silver_count,
        COUNT(*) FILTER (WHERE rating = 'bronze') as bronze_count,
        COUNT(*) as total_count,
        COUNT(*) >= 3 as is_high_fived
    FROM gold_high_fives
    WHERE list_id = p_list_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's archive statistics
CREATE OR REPLACE FUNCTION get_user_archive_stats(p_user_id UUID)
RETURNS TABLE (
    total_tried BIGINT,
    loved_items BIGINT,
    disliked_items BIGINT,
    success_rate INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) as total_tried,
        COUNT(*) FILTER (WHERE rating = 'up') as loved_items,
        COUNT(*) FILTER (WHERE rating = 'down') as disliked_items,
        CASE
            WHEN COUNT(*) > 0 THEN
                ROUND(COUNT(*) FILTER (WHERE rating = 'up') * 100.0 / COUNT(*))::INTEGER
            ELSE 0
        END as success_rate
    FROM archived_items
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;