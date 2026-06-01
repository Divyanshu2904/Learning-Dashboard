"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, Clock, Play, CheckCircle2, Award, X, Sparkles } from "lucide-react";
import { Course } from "@/types";
import CourseTile from "@/components/tiles/CourseTile";

interface CoursesClientProps {
  initialCourses: Course[];
}

export default function CoursesClient({ initialCourses }: CoursesClientProps) {
  const [courses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "in-progress" | "completed">("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.instructor || "").toLowerCase().includes(searchQuery.toLowerCase());

    const isCompleted = course.progress === 100;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "in-progress" && !isCompleted) ||
      (activeTab === "completed" && isCompleted);

    return matchesSearch && matchesTab;
  });

  const totalCourses = courses.length;
  const completedCourses = courses.filter((c) => c.progress === 100).length;
  const inProgressCourses = totalCourses - completedCourses;

  return (
    <div className="space-y-6 pb-20">
      {/* Quick summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Registered", value: totalCourses, icon: BookOpen, color: "text-cyan-400", bg: "bg-cyan-500/10" },
          { label: "Active Studies", value: inProgressCourses, icon: Clock, color: "text-violet-400", bg: "bg-violet-500/10" },
          { label: "Completed", value: completedCourses, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Mastery Badge", value: "Level A+", icon: Award, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-2xl border border-[#1E2733] bg-[#0D1117] flex items-center gap-3 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-slate-500/5 blur-2xl pointer-events-none" />
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 font-medium tracking-wider uppercase">{stat.label}</p>
                <p className="text-lg font-bold text-white leading-none mt-1">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters & search controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0D1117]/65 border border-[#1E2733] p-4 rounded-2xl">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search courses or tutors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[#1E2733] bg-[#080C14] text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all duration-300 focus:ring-1 focus:ring-cyan-500/20 placeholder:text-slate-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080C14] border border-[#1E2733]">
          {(["all", "in-progress", "completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors duration-300 ${
                activeTab === tab ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-course-tab"
                  className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <AnimatePresence mode="popLayout">
        {filteredCourses.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCourse(course)}
                className="cursor-pointer group"
              >
                <CourseTile course={course} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-[#1E2733] rounded-3xl"
          >
            <div className="p-4 rounded-full bg-[#1E2733]/30 text-slate-500 mb-4">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-300">No courses match your query</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-xs">
              Try adjusting your search terms or choosing a different status filter.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal overlay */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg rounded-3xl border border-[#1E2733] bg-[#0D1117] p-6 shadow-2xl overflow-hidden noise-overlay"
            >
              {/* Background glows */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#1E2733]/30 hover:bg-[#1E2733]/70 text-slate-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Course syllabus overview</span>
              </div>

              <h2 className="text-2xl font-bold text-white leading-tight mb-2 pr-6">
                {selectedCourse.title}
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Led by <span className="text-slate-200 font-semibold">{selectedCourse.instructor || "Expert Tutor"}</span>
              </p>

              {/* Course syllabus mockup */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-[#080C14] border border-[#1E2733]/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500 font-medium">Session Progress</span>
                    <span className="text-xs text-cyan-400 font-bold">{selectedCourse.progress}% completed</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1E2733] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                      style={{ width: `${selectedCourse.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs text-slate-500 font-bold uppercase tracking-wider">Next Modules</h4>
                  {[
                    { title: "Introduction to Advanced Frameworks", status: "completed", duration: "45 mins" },
                    { title: "Dynamic State Management & Async Operations", status: "in-progress", duration: "1 hr 15 mins" },
                    { title: "Building Responsive Production Architectures", status: "locked", duration: "55 mins" },
                  ].map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          lesson.status === "completed" ? "bg-emerald-500" : lesson.status === "in-progress" ? "bg-cyan-500 animate-pulse" : "bg-slate-600"
                        }`} />
                        <span className="text-xs text-slate-300 font-medium">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start/Resume button */}
              <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-95 group">
                <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                <span>Resume Study Session</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
