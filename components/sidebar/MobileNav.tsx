"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "achievements", label: "Awards", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0D1117]/95 backdrop-blur-xl border-t border-[#1E2733] px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-bg"
                  className="absolute inset-0 rounded-xl bg-cyan-500/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "w-5 h-5 relative transition-colors duration-200",
                  isActive ? "text-cyan-400" : "text-slate-500"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium relative transition-colors duration-200",
                  isActive ? "text-cyan-400" : "text-slate-500"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
