-- Five Alike Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/vfkkjozknvmeqqeoyoam/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT,
  avatar_image TEXT,
  bio TEXT,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lists table
CREATE TABLE IF NOT EXISTS lists (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  author_username TEXT NOT NULL,
  author_avatar TEXT,
  author_avatar_image TEXT,
  author_badges TEXT[] DEFAULT '{}',
  votes_up INTEGER DEFAULT 0,
  votes_down INTEGER DEFAULT 0,
  high_fives INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, user_id)
);

-- Item votes table (for individual items in lists)
CREATE TABLE IF NOT EXISTS item_votes (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES lists(id) ON DELETE CASCADE,
  item_index INTEGER NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, item_index, user_id)
);

-- High fives table
CREATE TABLE IF NOT EXISTS high_fives (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, user_id)
);

-- Saved lists table
CREATE TABLE IF NOT EXISTS saved_lists (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, user_id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  avatar TEXT,
  avatar_image TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookmarks table (for individual items)
CREATE TABLE IF NOT EXISTS bookmarks (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES lists(id) ON DELETE CASCADE,
  item_index INTEGER NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, item_index, user_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lists_author_id ON lists(author_id);
CREATE INDEX IF NOT EXISTS idx_lists_category ON lists(category);
CREATE INDEX IF NOT EXISTS idx_lists_created_at ON lists(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_votes_list_id ON votes(list_id);
CREATE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
CREATE INDEX IF NOT EXISTS idx_high_fives_list_id ON high_fives(list_id);
CREATE INDEX IF NOT EXISTS idx_saved_lists_user_id ON saved_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_list_id ON comments(list_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE high_fives ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- RLS Policies (allow all for now - you can restrict later)
CREATE POLICY "Allow all access to users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to lists" ON lists FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to votes" ON votes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to item_votes" ON item_votes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to high_fives" ON high_fives FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to saved_lists" ON saved_lists FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to comments" ON comments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to bookmarks" ON bookmarks FOR ALL USING (true) WITH CHECK (true);

-- Insert a test user (you can remove this later)
INSERT INTO users (id, username, email, avatar, bio, badges)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'testuser',
  'test@fivealike.com',
  '🧪',
  'Test user for Five Alike',
  ARRAY['Early Adopter']
)
ON CONFLICT (username) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Five Alike database schema created successfully!';
END $$;
