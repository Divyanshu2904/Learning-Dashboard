"use client";

import { motion } from "framer-motion";
import { Course } from "@/types";
import HeroTile from "./HeroTile";
import CourseTile from "./CourseTile";
import ActivityTile from "./ActivityTile";
import StatsTile from "./StatsTile";
import QuickActionsTile from "./QuickActionsTile";

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {/* Hero tile - spans 2 cols */}
      <motion.div variants={tileVariants} className="col-span-1 md:col-span-2">
        <HeroTile name="Alex" streak={12} />
      </motion.div>

      {/* Stats tile */}
      <motion.div variants={tileVariants}>
        <StatsTile />
      </motion.div>

      {/* Course tiles */}
      {courses.map((course) => (
        <motion.div key={course.id} variants={tileVariants}>
          <CourseTile course={course} />
        </motion.div>
      ))}

      {/* Quick actions tile */}
      <motion.div variants={tileVariants}>
        <QuickActionsTile />
      </motion.div>

      {/* Activity tile - spans 2 cols */}
      <motion.div variants={tileVariants} className="col-span-1 md:col-span-2">
        <ActivityTile />
      </motion.div>
    </motion.div>
  );
}
