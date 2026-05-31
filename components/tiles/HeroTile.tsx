"use client";

import { motion } from "framer-motion";
import { Flame, Star, ChevronRight } from "lucide-react";

interface HeroTileProps {
  name: string;
  streak: number;
}

export default function HeroTile({ name, streak }: HeroTileProps) {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <article className="relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden border border-[#1E2733] bg-[#0D1117] p-6 noise-overlay min-h-[180px] flex flex-col justify-between">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-emerald-500/5 blur-2xl" />
      </div>

      {/* Top row */}
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium tracking-wide uppercase mb-1">
            {greeting()}
          </p>
          <h1
            className="text-2xl md:text-3xl font-bold text-white leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {name}
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            You&apos;ve completed{" "}
            <span className="text-slate-200 font-medium">3 lessons</span> this
            week. Keep the momentum!
          </p>
        </div>

        {/* Streak badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0 ml-4"
        >
          <Flame className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-lg font-bold text-amber-400 leading-none">
              {streak}
            </p>
            <p className="text-xs text-amber-500/70 leading-none mt-0.5">
              day streak
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="relative flex items-center justify-between mt-4">
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < 5
                  ? "bg-cyan-400 shadow-[0_0_6px_rgba(0,229,255,0.5)]"
                  : "bg-[#1E2733]"
              }`}
            />
          ))}
          <span className="text-xs text-slate-500 ml-2">5/7 days this week</span>
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
        >
          Continue learning
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Stars decoration */}
      <div className="absolute top-4 right-4 pointer-events-none opacity-30">
        <Star className="w-3 h-3 text-violet-400 absolute top-0 right-8" fill="currentColor" />
        <Star className="w-2 h-2 text-cyan-400 absolute top-6 right-2" fill="currentColor" />
        <Star className="w-2 h-2 text-amber-400 absolute top-1 right-0" fill="currentColor" />
      </div>
    </article>
  );
}
