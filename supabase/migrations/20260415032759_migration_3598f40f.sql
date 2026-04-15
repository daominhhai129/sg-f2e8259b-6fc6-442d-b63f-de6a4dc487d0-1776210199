-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (admin users who own cards)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  plan TEXT NOT NULL CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT NOT NULL CHECK (status IN ('active', 'invited', 'suspended')),
  last_active TIMESTAMP WITH TIME ZONE,
  cards_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business cards table
CREATE TABLE IF NOT EXISTS business_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  default_language TEXT NOT NULL CHECK (default_language IN ('vi', 'en', 'zh')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business card content (one row per language)
CREATE TABLE IF NOT EXISTS business_card_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID NOT NULL REFERENCES business_cards(id) ON DELETE CASCADE,
  language TEXT NOT NULL CHECK (language IN ('vi', 'en', 'zh')),
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  phone2 TEXT,
  website TEXT,
  website2 TEXT,
  linkedin TEXT,
  twitter TEXT,
  facebook TEXT,
  tiktok TEXT,
  shopee TEXT,
  youtube_url TEXT,
  youtube_channel TEXT,
  wechat_id TEXT,
  wechat_qr TEXT,
  kakao_id TEXT,
  kakao_qr TEXT,
  zalo_number TEXT,
  zalo_qr TEXT,
  tax_info TEXT,
  address1 TEXT,
  address2 TEXT,
  profile_image_url TEXT,
  cover_image_url TEXT,
  about_media_1 TEXT,
  about_media_2 TEXT,
  about_media_3 TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(card_id, language)
);

-- RLS policies for users table (T2 - public read, auth write)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_users" ON users FOR SELECT USING (true);
CREATE POLICY "auth_insert_users" ON users FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_users" ON users FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_users" ON users FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS policies for business_cards table (T2 - public read, auth write)
ALTER TABLE business_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_cards" ON business_cards FOR SELECT USING (true);
CREATE POLICY "auth_insert_cards" ON business_cards FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_cards" ON business_cards FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_cards" ON business_cards FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS policies for business_card_content table (T2 - public read, auth write)
ALTER TABLE business_card_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_content" ON business_card_content FOR SELECT USING (true);
CREATE POLICY "auth_insert_content" ON business_card_content FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_content" ON business_card_content FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_content" ON business_card_content FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_business_cards_owner ON business_cards(owner_id);
CREATE INDEX IF NOT EXISTS idx_business_card_content_card ON business_card_content(card_id);
CREATE INDEX IF NOT EXISTS idx_business_card_content_language ON business_card_content(language);