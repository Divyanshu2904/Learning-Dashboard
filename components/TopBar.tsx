"use client";

import { motion } from "framer-motion";
import { Bell, Search, Zap } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b border-[#1E2733] bg-[#080B11]/80 backdrop-blur-xl">
      {/* Mobile logo */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        <span
          className="font-bold text-base text-white"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          LearnOS
        </span>
      </div>

      {/* Search bar */}
      <motion.div
        whileFocus={{ scale: 1.01 }}
        className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#0D1117] border border-[#1E2733] hover:border-slate-600/50 transition-colors w-64 cursor-text"
      >
        <Search className="w-4 h-4 text-slate-500 shrink-0" />
        <span className="text-sm text-slate-500">Search courses...</span>
        <kbd className="ml-auto text-xs text-slate-600 bg-[#1E2733] px-1.5 py-0.5 rounded font-mono">
          ⌘K
        </kbd>
      </motion.div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative p-2 rounded-xl bg-[#0D1117] border border-[#1E2733] hover:border-slate-600/50 transition-colors"
        >
          <Bell className="w-4 h-4 text-slate-400" />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(0,229,255,0.7)]" />
        </motion.button>

        {/* Avatar */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 border-2 border-[#1E2733] hover:border-violet-500/50 transition-colors flex items-center justify-center"
        >
          <span className="text-xs font-bold text-white">A</span>
        </motion.button>
      </div>
    </header>
  );
}
