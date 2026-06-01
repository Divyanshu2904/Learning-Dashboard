import { createClient } from '@supabase/supabase-js';
import type { Course } from '@/types';


const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

// Automatically clean URL if trailing API paths are appended
let cleanUrl = rawUrl.trim();
if (cleanUrl.endsWith('/rest/v1/')) {
  cleanUrl = cleanUrl.slice(0, -9);
} else if (cleanUrl.endsWith('/rest/v1')) {
  cleanUrl = cleanUrl.slice(0, -8);
}

const isConfigured = 
  cleanUrl.startsWith('http') && 
  !cleanUrl.includes('your_supabase_url_here') &&
  supabaseAnonKey.length > 0;

export const supabase = isConfigured ? createClient(cleanUrl, supabaseAnonKey) : null;

export async function getCourses(): Promise<Course[]> {
  if (!supabase) {
    return getFallbackCourses();
  }
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
      console.log("SUPABASE DATA:", data);
      console.log("SUPABASE ERROR:", error);

    if (error) {
      console.error('Supabase error:', error.message);
      return getFallbackCourses();
    }

    if (!data || data.length === 0) {
      return getFallbackCourses();
    }

    return data as Course[];
  } catch (err) {
    console.error('Connection error:', err);
    return getFallbackCourses();
  }
}

// Fallback data if Supabase is not configured
function getFallbackCourses(): Course[] {
  return [
    {
      id: '1',
      title: 'Advanced React Patterns',
      progress: 75,
      icon_name: 'Layers',
      created_at: new Date().toISOString(),
      color: 'cyan',
      instructor: 'Sarah Chen',
      total_lessons: 24,
      completed_lessons: 18,
    },
    {
      id: '2',
      title: 'System Design Mastery',
      progress: 42,
      icon_name: 'Network',
      created_at: new Date().toISOString(),
      color: 'purple',
      instructor: 'Alex Kumar',
      total_lessons: 32,
      completed_lessons: 13,
    },
    {
      id: '3',
      title: 'TypeScript Deep Dive',
      progress: 88,
      icon_name: 'Code2',
      created_at: new Date().toISOString(),
      color: 'blue',
      instructor: 'Maria Santos',
      total_lessons: 20,
      completed_lessons: 17,
    },
    {
      id: '4',
      title: 'Next.js & Performance',
      progress: 31,
      icon_name: 'Zap',
      created_at: new Date().toISOString(),
      color: 'orange',
      instructor: 'James Wright',
      total_lessons: 28,
      completed_lessons: 9,
    },
  ];
}
