-- ConceptForge AI Supabase Setup Script
-- Run this in your Supabase project's SQL Editor to create the necessary tables and policies.

-- Create the concepts table
CREATE TABLE IF NOT EXISTS public.concepts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    prompt_data JSONB NOT NULL,
    generated_content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) to ensure privacy
ALTER TABLE public.concepts ENABLE ROW LEVEL SECURITY;

-- Create policies so users can only access their own concepts
CREATE POLICY "Users can view their own concepts"
    ON public.concepts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own concepts"
    ON public.concepts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own concepts"
    ON public.concepts FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own concepts"
    ON public.concepts FOR DELETE
    USING (auth.uid() = user_id);
