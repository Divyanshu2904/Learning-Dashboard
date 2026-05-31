"use client";

import { motion } from "framer-motion";
import { BookMarked, Clock, Award, Target } from "lucide-react";

const stats = [
  {
    label: "Courses Active",
    value: "4",
    icon: BookMarked,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    label: "Hours Learned",
    value: "47",
    icon: Clock,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    label: "Certificates",
    value: "2",
    icon: Award,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Weekly Goal",
    value: "71%",
    icon: Target,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

interface StatsTileProps {
  user?: any;
  index?: number;
}

export default function StatsTile({ user, index }: StatsTileProps = {}) {
  return (
    <article className="relative rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-violet-500/5 blur-2xl pointer-events-none" />

      <h3
        className="font-semibold text-slate-100 text-sm mb-4 relative"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Your Stats
      </h3>

      <div className="grid grid-cols-2 gap-3 relative">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col gap-2 p-3 rounded-xl bg-[#131920] border border-[#1E2733] hover:border-slate-600/50 transition-colors"
            >
              <div className={`p-1.5 rounded-lg ${stat.bg} w-fit`}>
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
              </div>
              <div>
                <p className={`text-lg font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 leading-snug">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </article>
  );
}
