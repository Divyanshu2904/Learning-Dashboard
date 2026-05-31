"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080B11]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 p-8 rounded-2xl border border-[#1E2733] bg-[#0D1117] max-w-md w-full mx-4 text-center"
      >
        <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20">
          <AlertTriangle className="w-8 h-8 text-rose-400" />
        </div>

        <div className="space-y-2">
          <h2
            className="text-xl font-semibold text-slate-100"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Something went wrong
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Failed to load the dashboard. This might be a database connection
            issue. Check your Supabase environment variables.
          </p>
          {error.message && (
            <p className="text-xs font-mono text-rose-400/70 bg-rose-500/5 border border-rose-500/10 rounded-lg p-3 mt-3">
              {error.message}
            </p>
          )}
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E2733] hover:bg-[#243040] border border-[#1E2733] hover:border-cyan-500/30 text-slate-300 hover:text-cyan-400 transition-all duration-200 text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </motion.div>
    </div>
  );
}
