"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp } from "lucide-react";
import { generateActivityData } from "@/lib/utils";
import { ActivityDay } from "@/types";

const levelColors: Record<number, string> = {
  0: "bg-[#1E2733]",
  1: "bg-cyan-900/60",
  2: "bg-cyan-700/70",
  3: "bg-cyan-500/80",
  4: "bg-cyan-400",
};

const levelGlow: Record<number, string> = {
  0: "",
  1: "",
  2: "",
  3: "shadow-[0_0_4px_rgba(0,229,255,0.3)]",
  4: "shadow-[0_0_6px_rgba(0,229,255,0.5)]",
};

interface ActivityTileProps {
  index?: number;
}

export default function ActivityTile({ index }: ActivityTileProps = {}) {
  const [activityData, setActivityData] = useState<ActivityDay[]>([]);

  useEffect(() => {
    setActivityData(generateActivityData());
  }, []);

  if (activityData.length === 0) {
    return (
      <article className="relative col-span-1 md:col-span-2 rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay min-h-[220px]">
        <div className="skeleton h-[180px] w-full rounded-2xl opacity-10" />
      </article>
    );
  }

  // Group into weeks (columns of 7)
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const totalContributions = activityData.reduce((sum, d) => sum + d.count, 0);
  const activeDays = activityData.filter((d) => d.count > 0).length;

  return (
    <article className="relative col-span-1 md:col-span-2 rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay">
      {/* Background glow */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10">
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3
              className="font-semibold text-slate-100 text-sm"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Learning Activity
            </h3>
            <p className="text-xs text-slate-500">Past 16 weeks</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-medium">{activeDays} active days</span>
        </div>
      </div>

      {/* Contribution graph */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: weekIdx * 0.02 + dayIdx * 0.005,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  title={`${day.date}: ${day.count} activities`}
                  className={`w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125 ${
                    levelColors[day.level]
                  } ${levelGlow[day.level]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend + stats */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-600">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-2.5 h-2.5 rounded-sm ${levelColors[level]}`}
            />
          ))}
          <span className="text-xs text-slate-600">More</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-lg font-bold text-slate-100 font-mono">
              {totalContributions}
            </p>
            <p className="text-xs text-slate-500">total activities</p>
          </div>
        </div>
      </div>
    </article>
  );
}
