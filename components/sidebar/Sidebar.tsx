"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronRight,
  Zap,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/dashboard" },
  { id: "courses", label: "My Courses", icon: "BookOpen", href: "/courses" },
  { id: "progress", label: "Progress", icon: "BarChart3", href: "/progress" },
  {
    id: "achievements",
    label: "Achievements",
    icon: "Trophy",
    href: "/achievements",
  },
  { id: "settings", label: "Settings", icon: "Settings", href: "/settings" },
];

const iconMap = {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
};

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ className, collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const isExpanded = !collapsed;
  const toggleSidebar = onToggle || (() => {});

  const [displayName, setDisplayName] = useState("Divyanshu Kumar");

  useEffect(() => {
    const savedName = localStorage.getItem("studentName");
    if (savedName) {
      setDisplayName(savedName);
    }

    const handleUpdate = () => {
      const updatedName = localStorage.getItem("studentName");
      if (updatedName) {
        setDisplayName(updatedName);
      }
    };
    window.addEventListener("studentNameUpdated", handleUpdate);
    return () => window.removeEventListener("studentNameUpdated", handleUpdate);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{ width: isExpanded ? 220 : 72 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "flex flex-col h-full border-r border-[#1E2733] bg-[#0D1117] shrink-0 overflow-hidden relative z-10",
        className
      )}
    >
      {/* Logo area */}
      <div className="flex items-center h-16 px-4 border-b border-[#1E2733]">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-display font-bold text-lg text-white whitespace-nowrap"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                LearnOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

  <div className="flex-1 flex flex-col gap-1 p-3 pt-4">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");

          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left w-full group"
            >
              {/* Active background with layoutId */}
              {isActive && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Hover background */}
              {!isActive && (
                <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-200" />
              )}

              <div
                className={cn(
                  "relative shrink-0 transition-colors duration-200",
                  isActive
                    ? "text-cyan-400"
                    : "text-slate-500 group-hover:text-slate-300"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "relative text-sm font-medium whitespace-nowrap transition-colors duration-200",
                      isActive
                        ? "text-slate-100"
                        : "text-slate-500 group-hover:text-slate-300"
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>

      {/* Bottom: toggle + avatar */}
      <div className="p-3 border-t border-[#1E2733] flex flex-col gap-2">
        {/* User avatar */}
        <Link href="/settings" className="flex items-center gap-3 px-2.5 py-2 hover:bg-[#1E2733]/40 rounded-xl transition-all duration-200 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <User className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <p className="text-xs font-medium text-slate-200 whitespace-nowrap group-hover:text-cyan-400 transition-colors">
                  {displayName}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Expand toggle */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full h-8 rounded-lg bg-[#1E2733] hover:bg-[#243040] transition-colors duration-200 group"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
          </motion.div>
        </button>
      </div>
    </motion.nav>
  );
}
