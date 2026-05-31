"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Course } from "@/types";
import ProgressBar from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

interface CourseTileProps {
  course: Course;
  index?: number;
}

// Color schemes for course cards
const colorSchemes = [
  {
    gradient: "from-cyan-500/8 to-violet-500/8",
    border: "hover:border-cyan-500/30",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    glow: "hover:shadow-[0_0_30px_rgba(0,229,255,0.08)]",
    progressColor: "from-cyan-400 to-violet-500",
  },
  {
    gradient: "from-violet-500/8 to-pink-500/8",
    border: "hover:border-violet-500/30",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]",
    progressColor: "from-violet-400 to-pink-500",
  },
  {
    gradient: "from-emerald-500/8 to-cyan-500/8",
    border: "hover:border-emerald-500/30",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]",
    progressColor: "from-emerald-400 to-cyan-400",
  },
  {
    gradient: "from-amber-500/8 to-rose-500/8",
    border: "hover:border-amber-500/30",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]",
    progressColor: "from-amber-400 to-rose-500",
  },
];

export default function CourseTile({ course }: CourseTileProps) {
  // Dynamically resolve Lucide icon
  const IconComponent =
    (LucideIcons[course.icon_name as keyof typeof LucideIcons] as React.ComponentType<{
      className?: string;
    }>) || LucideIcons.BookOpen;

  // Assign color scheme based on index using hash
  const schemeIndex =
    course.title.charCodeAt(0) % colorSchemes.length;
  const scheme = colorSchemes[schemeIndex];

  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        y: -2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 cursor-pointer overflow-hidden noise-overlay transition-all duration-300 group",
        scheme.border,
        scheme.glow
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          scheme.gradient
        )}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />

      {/* Content */}
      <div className="relative flex flex-col h-full gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "p-2.5 rounded-xl transition-colors duration-300",
              scheme.iconBg
            )}
          >
            <IconComponent
              className={cn("w-5 h-5", scheme.iconColor)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Title */}
        <div>
          <h3
            className="font-semibold text-slate-100 text-sm leading-snug mb-1 line-clamp-2"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {course.title}
          </h3>
          <p className="text-xs text-slate-500">
            {course.progress >= 80
              ? "Almost done!"
              : course.progress >= 50
              ? "Halfway there"
              : "Just getting started"}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-auto">
          <ProgressBar
            value={course.progress}
            color={scheme.progressColor}
            height={3}
            showLabel={true}
          />
        </div>
      </div>
    </motion.article>
  );
}
