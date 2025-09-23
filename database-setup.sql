-- Five Alike Database Setup
-- This creates all the tables for your memory box! 🎉

-- Enable RLS (Row Level Security) for data protection
-- This makes sure users can only see their own data

-- Users table (for accounts and profiles)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT DEFAULT '',
  avatar TEXT DEFAULT '',
  avatar_image TEXT,
  home_city TEXT DEFAULT '',
  favorite_topics TEXT[] DEFAULT '{}',
  selected_genres TEXT[] DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  anti_social_mode BOOLEAN DEFAULT false,
  has_seen_tutorial BOOLEAN DEFAULT false,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lists table (for recommendation lists)
CREATE TABLE public.lists (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  author_id UUID REFERENCES public.users(id) NOT NULL,
  author TEXT NOT NULL, -- Display name
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  votes INTEGER DEFAULT 0, -- calculated field
  saves INTEGER DEFAULT 0,
  high_fives INTEGER DEFAULT 0,
  is_rejected BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Votes table (for tracking who voted on what)
CREATE TABLE public.votes (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES public.lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('up', 'down')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, user_id) -- One vote per user per list
);

-- High fives table (special likes)
CREATE TABLE public.high_fives (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES public.lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, user_id) -- One high five per user per list
);

-- Comments table (for list comments)
CREATE TABLE public.comments (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES public.lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  mentions TEXT[] DEFAULT '{}', -- @username mentions
  hashtags TEXT[] DEFAULT '{}', -- #hashtag tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved lists table (bookmarks)
CREATE TABLE public.saved_lists (
  id BIGSERIAL PRIMARY KEY,
  list_id BIGINT REFERENCES public.lists(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(list_id, user_id) -- One save per user per list
);

-- Follows table (user following)
CREATE TABLE public.follows (
  id BIGSERIAL PRIMARY KEY,
  follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id) -- One follow relationship per pair
);

-- Create indexes for better performance
CREATE INDEX idx_lists_author_id ON public.lists(author_id);
CREATE INDEX idx_lists_category ON public.lists(category);
CREATE INDEX idx_lists_created_at ON public.lists(created_at DESC);
CREATE INDEX idx_votes_list_id ON public.votes(list_id);
CREATE INDEX idx_votes_user_id ON public.votes(user_id);
CREATE INDEX idx_comments_list_id ON public.comments(list_id);
CREATE INDEX idx_comments_user_id ON public.comments(user_id);

-- Set up Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.high_fives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- RLS Policies (who can see what)

-- Users: can view all profiles, can only edit own profile
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Lists: everyone can view, only author can edit
CREATE POLICY "Anyone can view lists" ON public.lists FOR SELECT USING (true);
CREATE POLICY "Users can create lists" ON public.lists FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own lists" ON public.lists FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own lists" ON public.lists FOR DELETE USING (auth.uid() = author_id);

-- Votes: everyone can view, users can manage own votes
CREATE POLICY "Anyone can view votes" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Users can create votes" ON public.votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own votes" ON public.votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own votes" ON public.votes FOR DELETE USING (auth.uid() = user_id);

-- High fives: everyone can view, users can manage own high fives
CREATE POLICY "Anyone can view high fives" ON public.high_fives FOR SELECT USING (true);
CREATE POLICY "Users can create high fives" ON public.high_fives FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own high fives" ON public.high_fives FOR DELETE USING (auth.uid() = user_id);

-- Comments: everyone can view, users can manage own comments
CREATE POLICY "Anyone can view comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Saved lists: users can only see and manage their own saves
CREATE POLICY "Users can view own saved lists" ON public.saved_lists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create saved lists" ON public.saved_lists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved lists" ON public.saved_lists FOR DELETE USING (auth.uid() = user_id);

-- Follows: everyone can view, users can manage own follows
CREATE POLICY "Anyone can view follows" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Users can create follows" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete own follows" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- Functions to automatically update vote counts
CREATE OR REPLACE FUNCTION update_list_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.lists 
    SET 
      upvotes = (SELECT COUNT(*) FROM public.votes WHERE list_id = NEW.list_id AND vote_type = 'up'),
      downvotes = (SELECT COUNT(*) FROM public.votes WHERE list_id = NEW.list_id AND vote_type = 'down')
    WHERE id = NEW.list_id;
    
    UPDATE public.lists 
    SET votes = upvotes - downvotes 
    WHERE id = NEW.list_id;
    
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.lists 
    SET 
      upvotes = (SELECT COUNT(*) FROM public.votes WHERE list_id = OLD.list_id AND vote_type = 'up'),
      downvotes = (SELECT COUNT(*) FROM public.votes WHERE list_id = OLD.list_id AND vote_type = 'down')
    WHERE id = OLD.list_id;
    
    UPDATE public.lists 
    SET votes = upvotes - downvotes 
    WHERE id = OLD.list_id;
    
    RETURN OLD;
  END IF;
  
  IF TG_OP = 'UPDATE' THEN
    UPDATE public.lists 
    SET 
      upvotes = (SELECT COUNT(*) FROM public.votes WHERE list_id = NEW.list_id AND vote_type = 'up'),
      downvotes = (SELECT COUNT(*) FROM public.votes WHERE list_id = NEW.list_id AND vote_type = 'down')
    WHERE id = NEW.list_id;
    
    UPDATE public.lists 
    SET votes = upvotes - downvotes 
    WHERE id = NEW.list_id;
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update vote counts
CREATE TRIGGER vote_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.votes
  FOR EACH ROW
  EXECUTE FUNCTION update_list_votes();

-- Function to update high five counts
CREATE OR REPLACE FUNCTION update_high_five_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.lists 
    SET high_fives = (SELECT COUNT(*) FROM public.high_fives WHERE list_id = NEW.list_id)
    WHERE id = NEW.list_id;
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.lists 
    SET high_fives = (SELECT COUNT(*) FROM public.high_fives WHERE list_id = OLD.list_id)
    WHERE id = OLD.list_id;
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update high five counts
CREATE TRIGGER high_five_count_trigger
  AFTER INSERT OR DELETE ON public.high_fives
  FOR EACH ROW
  EXECUTE FUNCTION update_high_five_counts();

-- Function to update save counts
CREATE OR REPLACE FUNCTION update_save_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.lists 
    SET saves = (SELECT COUNT(*) FROM public.saved_lists WHERE list_id = NEW.list_id)
    WHERE id = NEW.list_id;
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.lists 
    SET saves = (SELECT COUNT(*) FROM public.saved_lists WHERE list_id = OLD.list_id)
    WHERE id = OLD.list_id;
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update save counts
CREATE TRIGGER save_count_trigger
  AFTER INSERT OR DELETE ON public.saved_lists
  FOR EACH ROW
  EXECUTE FUNCTION update_save_counts();