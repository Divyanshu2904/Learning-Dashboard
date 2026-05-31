"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock, Calendar, CheckCircle2, TrendingUp, Sparkles, Award } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function ProgressPage() {
  const [activeRange, setActiveRange] = useState<"week" | "month" | "year">("week");

  // Sample analytics data
  const subjects = [
    { name: "Frontend Architecture", progress: 85, color: "from-cyan-500 to-cyan-300" },
    { name: "Backend Databases", progress: 42, color: "from-purple-500 to-purple-300" },
    { name: "UI Design & Glassmorphism", progress: 95, color: "from-emerald-500 to-emerald-300" },
    { name: "TypeScript Mastery", progress: 60, color: "from-amber-500 to-amber-300" },
  ];

  const milestones = [
    { title: "First Course Mastery", desc: "Completed Frontend Systems overview", date: "May 24", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10" },
    { title: "Consistency Streak", desc: "Completed 7 days streak target", date: "May 18", icon: Calendar, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { title: "Fast Learner", desc: "Finished 3 modules in under 4 hours", date: "May 12", icon: Sparkles, color: "text-violet-400", bg: "bg-violet-500/10" },
  ];

  const weekDays = [
    { label: "Mon", hrs: 2.5 },
    { label: "Tue", hrs: 4.0 },
    { label: "Wed", hrs: 1.2 },
    { label: "Thu", hrs: 5.5 },
    { label: "Fri", hrs: 3.8 },
    { label: "Sat", hrs: 0.8 },
    { label: "Sun", hrs: 2.0 },
  ];

  const maxHrs = Math.max(...weekDays.map(d => d.hrs));

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div>
          <h1
            className="text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Learning Progress
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Dive into deep study performance charts, weekly active hours, and curriculum achievements.
          </p>
        </div>

        {/* Main stats layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Column (spans 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly performance analytics card */}
            <article className="relative rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-base" style={{ fontFamily: "Syne, sans-serif" }}>Weekly Active Study Hours</h3>
                    <p className="text-xs text-slate-500">Average of 2.8 hours per day</p>
                  </div>
                </div>

                {/* Range selectors */}
                <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#080C14] border border-[#1E2733]">
                  {(["week", "month", "year"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveRange(range)}
                      className={`relative px-3 py-1 text-[10px] font-bold rounded capitalize transition-colors duration-300 ${
                        activeRange === range ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {activeRange === range && (
                        <motion.div
                          layoutId="active-range-tab"
                          className="absolute inset-0 rounded bg-cyan-500/10 border border-cyan-500/20"
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        />
                      )}
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphic custom bar chart */}
              <div className="h-64 flex items-end justify-between gap-2 pt-6 px-4">
                {weekDays.map((day, i) => {
                  const percent = (day.hrs / maxHrs) * 100;
                  return (
                    <div key={day.label} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="relative w-full flex flex-col items-center justify-end h-full">
                        {/* Hover stats label */}
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-slate-900 border border-cyan-500/20 px-2 py-1 rounded text-[10px] font-bold text-cyan-400 z-10 whitespace-nowrap shadow-xl">
                          {day.hrs} hrs
                        </div>
                        {/* Bar fill */}
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${percent}%` }}
                          transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.05 }}
                          className="w-full max-w-[32px] rounded-t-xl bg-gradient-to-t from-cyan-600/30 to-cyan-400 relative overflow-hidden group-hover:from-cyan-500 group-hover:to-cyan-300 group-hover:shadow-[0_0_15px_#00E5FF44] transition-all duration-300 cursor-pointer"
                        >
                          <div className="absolute top-0 inset-x-0 h-1 bg-white/20" />
                        </motion.div>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 mt-2">{day.label}</span>
                    </div>
                  );
                })}
              </div>
            </article>

            {/* Curriculum breakdown card */}
            <article className="rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay">
              <h3 className="font-bold text-slate-100 text-base mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Topic Mastery Breakdown</h3>
              <div className="space-y-4">
                {subjects.map((subject, i) => (
                  <div key={subject.name} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">{subject.name}</span>
                      <span className="text-slate-400 font-bold">{subject.progress}% Mastery</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#080C14] border border-[#1E2733] overflow-hidden p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${subject.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* Side Performance Cards (spans 1) */}
          <div className="space-y-6">
            {/* Quick Metrics stats */}
            <article className="relative rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-violet-500/5 blur-2xl pointer-events-none" />
              <h3 className="font-bold text-slate-100 text-base mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Weekly Goals</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium uppercase">Time Goal</p>
                    <p className="text-sm font-semibold text-slate-200">18.2 / 25 hours active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium uppercase">Finished Lessons</p>
                    <p className="text-sm font-semibold text-slate-200">9 of 12 planned syllabus</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-medium uppercase">Study efficiency</p>
                    <p className="text-sm font-semibold text-slate-200">+8.5% weekly pace improvement</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Learning Timeline card */}
            <article className="relative rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay">
              <h3 className="font-bold text-slate-100 text-base mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Recent Milestones</h3>
              <div className="space-y-4 relative pl-3 border-l border-slate-800">
                {milestones.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="relative space-y-1">
                      {/* Timeline dot */}
                      <div className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-slate-800 border border-slate-700 group-hover:bg-cyan-400 transition-colors" />
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${item.bg} ${item.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                        <span className="text-[9px] text-slate-500 font-medium ml-auto">{item.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-6 leading-tight">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
