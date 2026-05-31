export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
  color?: string;
  instructor?: string;
  total_lessons?: number;
  completed_lessons?: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  streak: number;
  xp: number;
  level: number;
  rank: string;
}
