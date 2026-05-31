"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Zap, Flame, Target, Star, Download, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function AchievementsPage() {
  const badges = [
    { title: "Consistency King", desc: "Maintained a 10+ day study streak", icon: Flame, color: "from-orange-500/20 via-orange-500/5 to-transparent", border: "border-orange-500/20", glow: "hover:shadow-[0_0_25px_#F9731633]", iconColor: "text-orange-400" },
    { title: "Syllabus Crusher", desc: "Finished your first complete course syllabus", icon: Target, color: "from-cyan-500/20 via-cyan-500/5 to-transparent", border: "border-cyan-500/20", glow: "hover:shadow-[0_0_25px_#06B6D433]", iconColor: "text-cyan-400" },
    { title: "Speed Demon", desc: "Finished 3 dense modules in a single session", icon: Zap, color: "from-violet-500/20 via-violet-500/5 to-transparent", border: "border-violet-500/20", glow: "hover:shadow-[0_0_25px_#8B5CF633]", iconColor: "text-violet-400" },
    { title: "Database Explorer", desc: "Successfully completed Supabase PostgreSQL integration", icon: Award, color: "from-emerald-500/20 via-emerald-500/5 to-transparent", border: "border-emerald-500/20", glow: "hover:shadow-[0_0_25px_#10B98133]", iconColor: "text-emerald-400" },
    { title: "Perfect Score", desc: "Scored 100% on a course quiz challenge", icon: Star, color: "from-amber-500/20 via-amber-500/5 to-transparent", border: "border-amber-500/20", glow: "hover:shadow-[0_0_25px_#F59E0B33]", iconColor: "text-amber-400" },
    { title: "Next-Gen Architect", desc: "Constructed dynamic multi-page dashboard client routing", icon: Sparkles, color: "from-pink-500/20 via-pink-500/5 to-transparent", border: "border-pink-500/20", glow: "hover:shadow-[0_0_25px_#EC489933]", iconColor: "text-pink-400" },
  ];

  const certificates = [
    { title: "Advanced React & NextJS Engineering", issued: "May 2026", authority: "LearnOS Academy", id: "CERT-773-882" },
    { title: "Database Architectures with Supabase", issued: "April 2026", authority: "LearnOS Academy", id: "CERT-909-122" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div>
          <h1
            className="text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Achievements & Badges
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Unlock premium student badges, custom achievements, and verified course certifications.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-100 text-base" style={{ fontFamily: "Syne, sans-serif" }}>Unlocked Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`relative p-5 rounded-2xl border ${badge.border} bg-gradient-to-br ${badge.color} transition-all duration-300 ${badge.glow} group overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-slate-500/5 blur-2xl pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl bg-white/[0.04] ${badge.iconColor} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">
                        {badge.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-tight">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="space-y-4 pt-6">
          <h3 className="font-bold text-slate-100 text-base" style={{ fontFamily: "Syne, sans-serif" }}>Verified Certificates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, idx) => (
              <motion.article
                key={cert.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative rounded-2xl border border-[#1E2733] bg-[#0D1117] p-5 overflow-hidden noise-overlay flex items-center justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />
                <div className="space-y-2 pr-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verified Graduate</span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-tight">{cert.title}</h4>
                  <p className="text-xs text-slate-400">
                    Issued by {cert.authority} • <span className="text-slate-500">{cert.issued}</span>
                  </p>
                  <p className="text-[10px] font-mono text-slate-600">ID: {cert.id}</p>
                </div>

                <button className="p-3.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all duration-300 shrink-0 self-center active:scale-95 group">
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
