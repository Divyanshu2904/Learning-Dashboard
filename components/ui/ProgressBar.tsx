"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  color = "from-cyan-400 to-violet-500",
  height = 4,
  showLabel = true,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div ref={ref} className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Progress</span>
          <motion.span
            className="text-xs font-mono font-medium text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {value}%
          </motion.span>
        </div>
      )}

      <div
        style={{ height: `${height}px` }}
        className="relative w-full rounded-full bg-[#1E2733] overflow-hidden"
      >
        {/* Track glow */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: "0%" }}
          animate={{ width: hasAnimated ? `${value}%` : "0%" }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: [0.34, 1.56, 0.64, 1], // spring-like easing
          }}
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
}
