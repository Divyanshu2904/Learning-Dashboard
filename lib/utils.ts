import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateActivityData() {
  const weeks = 26;
  const days = weeks * 7;
  const data = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const random = Math.random();
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (random > 0.4) {
      count = Math.floor(Math.random() * 12) + 1;
      if (count >= 10) level = 4;
      else if (count >= 7) level = 3;
      else if (count >= 4) level = 2;
      else level = 1;
    }

    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    });
  }
  return data;
}

export function getColorForCourse(color?: string): { gradient: string; glow: string; text: string; bar: string } {
  const map: Record<string, { gradient: string; glow: string; text: string; bar: string }> = {
    cyan: {
      gradient: 'from-cyan-500/10 via-cyan-400/5 to-transparent',
      glow: 'group-hover:shadow-[0_0_30px_#00D4FF22]',
      text: 'text-cyan-400',
      bar: 'from-cyan-500 to-cyan-300',
    },
    purple: {
      gradient: 'from-purple-500/10 via-purple-400/5 to-transparent',
      glow: 'group-hover:shadow-[0_0_30px_#A855F722]',
      text: 'text-purple-400',
      bar: 'from-purple-500 to-purple-300',
    },
    blue: {
      gradient: 'from-blue-500/10 via-blue-400/5 to-transparent',
      glow: 'group-hover:shadow-[0_0_30px_#3B82F622]',
      text: 'text-blue-400',
      bar: 'from-blue-500 to-blue-300',
    },
    orange: {
      gradient: 'from-orange-500/10 via-orange-400/5 to-transparent',
      glow: 'group-hover:shadow-[0_0_30px_#F9731622]',
      text: 'text-orange-400',
      bar: 'from-orange-500 to-orange-300',
    },
    green: {
      gradient: 'from-emerald-500/10 via-emerald-400/5 to-transparent',
      glow: 'group-hover:shadow-[0_0_30px_#10B98122]',
      text: 'text-emerald-400',
      bar: 'from-emerald-500 to-emerald-300',
    },
    pink: {
      gradient: 'from-pink-500/10 via-pink-400/5 to-transparent',
      glow: 'group-hover:shadow-[0_0_30px_#EC489922]',
      text: 'text-pink-400',
      bar: 'from-pink-500 to-pink-300',
    },
  };
  return map[color ?? 'cyan'] ?? map['cyan'];
}

const colorCycle = ['cyan', 'purple', 'blue', 'orange', 'green', 'pink'];
export function assignColors(courses: { id: string }[]): Record<string, string> {
  return Object.fromEntries(courses.map((c, i) => [c.id, colorCycle[i % colorCycle.length]]));
}
