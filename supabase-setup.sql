-- Run this in your Supabase SQL Editor to set up the database

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL DEFAULT 'BookOpen',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for demo purposes)
CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);

-- Seed data: Insert mock courses
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Code2'),
  ('System Design Fundamentals', 42, 'Network'),
  ('TypeScript Mastery', 88, 'FileCode'),
  ('CSS Architecture & Design', 30, 'Palette');
