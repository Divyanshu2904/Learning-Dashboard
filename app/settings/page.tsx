"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Sliders, Shield, Save, CheckCircle2, ChevronRight, Moon, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "personalization">("profile");
  const [name, setName] = useState("Divyanshu Kumar");
  const [email, setEmail] = useState("divyanshu.kumar@learnos.edu");
  const [profession, setProfession] = useState("Computer Science Student");
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("studentName");
    const savedEmail = localStorage.getItem("studentEmail");
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Preference switches states
  const [reminders, setReminders] = useState(true);
  const [emailDigests, setEmailDigests] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);

  // Toggles render helper
  const renderToggle = (checked: boolean, onChange: (v: boolean) => void) => (
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none flex items-center ${
        checked ? "bg-cyan-500" : "bg-[#1E2733]"
      }`}
    >
      <motion.div
        layout
        className="w-4.5 h-4.5 rounded-full bg-white shadow"
        animate={{ x: checked ? 18 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("studentName", name);
    localStorage.setItem("studentEmail", email);
    // Dispatch event to notify other mounted components instantly
    window.dispatchEvent(new Event("studentNameUpdated"));
    
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 relative">
        {/* Save confirmation toast notification */}
        <AnimatePresence>
          {showSavedNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/80 backdrop-blur-md shadow-2xl"
            >
              <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-100">Profile Saved</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Your profile and preferences have been successfully updated.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div>
          <h1
            className="text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            System Settings
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Customize your LearnOS student profile, system reminders, and dashboard personalization.
          </p>
        </div>

        {/* Tabs and Form Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Navigation tabs column */}
          <div className="flex flex-row lg:flex-col gap-1.5 p-1 rounded-2xl bg-[#0D1117] border border-[#1E2733] overflow-x-auto lg:overflow-x-visible">
            {[
              { id: "profile", label: "Student Profile", icon: User },
              { id: "notifications", label: "Preferences & Alerts", icon: Bell },
              { id: "personalization", label: "Interface styling", icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-3.5 py-3 text-xs font-bold rounded-xl text-left transition-all duration-300 shrink-0 w-full relative ${
                    isActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-settings-tab"
                      className="absolute inset-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <Icon className="w-4.5 h-4.5 relative" />
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Column (spans 3) */}
          <div className="lg:col-span-3">
            <article className="relative rounded-2xl border border-[#1E2733] bg-[#0D1117] p-6 overflow-hidden noise-overlay">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

              <form onSubmit={handleSave} className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* PROFILE TAB */}
                  {activeTab === "profile" && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <h3 className="font-bold text-slate-100 text-base mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Profile Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Full Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#1E2733] bg-[#080C14] text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/20"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#1E2733] bg-[#080C14] text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Profession/Title</label>
                        <input
                          type="text"
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                          className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#1E2733] bg-[#080C14] text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all focus:ring-1 focus:ring-cyan-500/20"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* NOTIFICATIONS TAB */}
                  {activeTab === "notifications" && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <h3 className="font-bold text-slate-100 text-base mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Preferences & Alerts</h3>

                      <div className="space-y-4 divide-y divide-[#1E2733]/50">
                        <div className="flex items-center justify-between py-2">
                          <div className="pr-4">
                            <h4 className="text-sm font-bold text-slate-200">Daily Study Reminders</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Receive gentle push indicators when your daily streak is about to drop.</p>
                          </div>
                          {renderToggle(reminders, setReminders)}
                        </div>

                        <div className="flex items-center justify-between pt-4 pb-2">
                          <div className="pr-4">
                            <h4 className="text-sm font-bold text-slate-200">Weekly Progress Digests</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Receive detailed charts and hours tracking reports in your inbox every Sunday.</p>
                          </div>
                          {renderToggle(weeklyReports, setWeeklyReports)}
                        </div>

                        <div className="flex items-center justify-between pt-4 pb-2">
                          <div className="pr-4">
                            <h4 className="text-sm font-bold text-slate-200">Product Announcements</h4>
                            <p className="text-xs text-slate-500 mt-0.5">Hear about new system themes, visual widgets, and newly registered syllabus releases.</p>
                          </div>
                          {renderToggle(emailDigests, setEmailDigests)}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* PERSONALIZATION TAB */}
                  {activeTab === "personalization" && (
                    <motion.div
                      key="personalization"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <h3 className="font-bold text-slate-100 text-base mb-4" style={{ fontFamily: "Syne, sans-serif" }}>Personalization & Styling</h3>

                      <div className="space-y-6">
                        {/* Themes */}
                        <div className="space-y-2">
                          <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Dashboard Accent Color</label>
                          <div className="flex gap-3">
                            {[
                              { label: "Cyan", color: "bg-cyan-500 border-cyan-400" },
                              { label: "Violet", color: "bg-violet-500 border-violet-400" },
                              { label: "Emerald", color: "bg-emerald-500 border-emerald-400" },
                              { label: "Amber", color: "bg-amber-500 border-amber-400" },
                            ].map((accent) => (
                              <button
                                key={accent.label}
                                type="button"
                                className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#080C14] border border-[#1E2733] hover:border-slate-700 transition-colors w-16"
                              >
                                <span className={`w-5 h-5 rounded-full ${accent.color} border`} />
                                <span className="text-[10px] text-slate-500 font-semibold">{accent.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interface toggles */}
                        <div className="space-y-2">
                          <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">System Interface Mode</label>
                          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#080C14] border border-[#1E2733]/60 w-fit">
                            <Moon className="w-5 h-5 text-cyan-400" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-200">Futuristic Cyber Dark</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">Optimized dynamic HSL color scheme for reducing night strain.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Save button (only shows for input tabs) */}
                <div className="pt-6 border-t border-[#1E2733] flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-bold text-xs transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-95 group"
                  >
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
