-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'f6ed79aec4bd1c45';

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'judge');
CREATE TYPE platform_type AS ENUM ('youtube', 'tiktok', 'twitch', 'other');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user'::user_role,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awards table
CREATE TABLE public.awards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  nomination_start_date TIMESTAMP WITH TIME ZONE,
  nomination_end_date TIMESTAMP WITH TIME ZONE,
  voting_start_date TIMESTAMP WITH TIME ZONE,
  voting_end_date TIMESTAMP WITH TIME ZONE,
  judging_start_date TIMESTAMP WITH TIME ZONE,
  judging_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  award_id UUID REFERENCES public.awards(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creators table
CREATE TABLE public.creators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  primary_platform platform_type NOT NULL,
  channel_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name, primary_platform)
);

-- Nominations table
CREATE TABLE public.nominations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, category_id) -- One nomination per user per category
);

-- Nominees table (approved nominations)
CREATE TABLE public.nominees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
  is_approved BOOLEAN DEFAULT false,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_id, creator_id)
);

-- Votes table
CREATE TABLE public.votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  nominee_id UUID REFERENCES public.nominees(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, nominee_id) -- One vote per user per nominee
);

-- Judge scores table
CREATE TABLE public.judge_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  judge_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  nominee_id UUID REFERENCES public.nominees(id) ON DELETE CASCADE,
  consistency_score INTEGER CHECK (consistency_score >= 1 AND consistency_score <= 3),
  influence_score INTEGER CHECK (influence_score >= 1 AND influence_score <= 3),
  engagement_score INTEGER CHECK (engagement_score >= 1 AND engagement_score <= 3),
  quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 3),
  total_score INTEGER GENERATED ALWAYS AS (consistency_score + influence_score + engagement_score + quality_score) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(judge_id, nominee_id)
);

-- Final scores table (calculated results)
CREATE TABLE public.final_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nominee_id UUID REFERENCES public.nominees(id) ON DELETE CASCADE,
  vote_points INTEGER DEFAULT 0,
  judge_points INTEGER DEFAULT 0,
  total_points INTEGER GENERATED ALWAYS AS (vote_points + judge_points) STORED,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(nominee_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nominations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nominees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.judge_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.final_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for awards table
CREATE POLICY "Awards are viewable by everyone" ON public.awards
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify awards" ON public.awards
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for categories table
CREATE POLICY "Categories are viewable by everyone" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify categories" ON public.categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for creators table
CREATE POLICY "Creators are viewable by everyone" ON public.creators
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create creators" ON public.creators
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Only admins can update/delete creators" ON public.creators
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for nominations table
CREATE POLICY "Users can view their own nominations" ON public.nominations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all nominations" ON public.nominations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can create their own nominations" ON public.nominations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nominations" ON public.nominations
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for nominees table
CREATE POLICY "Nominees are viewable by everyone" ON public.nominees
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Admins can view all nominees" ON public.nominees
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can modify nominees" ON public.nominees
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for votes table
CREATE POLICY "Users can view their own votes" ON public.votes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all votes" ON public.votes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can create their own votes" ON public.votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for judge_scores table
CREATE POLICY "Judges can view their own scores" ON public.judge_scores
  FOR SELECT USING (auth.uid() = judge_id);

CREATE POLICY "Admins can view all judge scores" ON public.judge_scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Judges can create their own scores" ON public.judge_scores
  FOR INSERT WITH CHECK (
    auth.uid() = judge_id AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'judge'
    )
  );

CREATE POLICY "Judges can update their own scores" ON public.judge_scores
  FOR UPDATE USING (
    auth.uid() = judge_id AND
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'judge'
    )
  );

-- RLS Policies for final_scores table
CREATE POLICY "Final scores are viewable by everyone" ON public.final_scores
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify final scores" ON public.final_scores
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Functions and triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER set_timestamp_users BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_awards BEFORE UPDATE ON public.awards FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_creators BEFORE UPDATE ON public.creators FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_nominations BEFORE UPDATE ON public.nominations FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_nominees BEFORE UPDATE ON public.nominees FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_judge_scores BEFORE UPDATE ON public.judge_scores FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_final_scores BEFORE UPDATE ON public.final_scores FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Sample data for testing
INSERT INTO public.awards (name, description, is_active) VALUES 
('WWG Awards 2024', 'The first annual WWG Creator Awards', true);

INSERT INTO public.categories (award_id, name, description) VALUES 
((SELECT id FROM public.awards WHERE name = 'WWG Awards 2024'), 'Best Gaming Creator', 'Recognizing excellence in gaming content creation'),
((SELECT id FROM public.awards WHERE name = 'WWG Awards 2024'), 'Best Educational Creator', 'Recognizing creators who educate and inform their audience'),
((SELECT id FROM public.awards WHERE name = 'WWG Awards 2024'), 'Best Entertainment Creator', 'Recognizing creators who entertain and bring joy to their audience'),
((SELECT id FROM public.awards WHERE name = 'WWG Awards 2024'), 'Rising Star', 'Recognizing up-and-coming creators with exceptional potential'),
((SELECT id FROM public.awards WHERE name = 'WWG Awards 2024'), 'Community Champion', 'Recognizing creators who build and nurture amazing communities');