"use client";

import { motion } from "framer-motion";
import { Play, Calendar, Users, Bookmark } from "lucide-react";

const actions = [
  {
    label: "Resume Course",
    description: "Advanced React Patterns",
    icon: Play,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    label: "Study Session",
    description: "Schedule focus time",
    icon: Calendar,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    label: "Study Groups",
    description: "3 active groups",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "Saved Lessons",
    description: "12 bookmarked",
    icon: Bookmark,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

export default function QuickActionsTile() {
  return (
    <article className="relative rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay">
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />

      <h3
        className="font-semibold text-slate-100 text-sm mb-4 relative"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Quick Actions
      </h3>

      <div className="flex flex-col gap-2 relative">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl border ${action.border} ${action.bg} hover:brightness-110 transition-all text-left`}
            >
              <div className="shrink-0">
                <Icon className={`w-4 h-4 ${action.color}`} />
              </div>
              <div className="overflow-hidden">
                <p className={`text-xs font-medium ${action.color}`}>
                  {action.label}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {action.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </article>
  );
}
