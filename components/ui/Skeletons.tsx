import React from 'react';

interface CoursesSkeletonProps {
  count?: number;
}

export function CoursesSkeleton({ count = 4 }: CoursesSkeletonProps) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="skeleton h-[180px] rounded-2xl border border-[#1E2D45]/40" />
      ))}
    </>
  );
}

export function FullSkeletonGrid() {
  return (
    <>
      {/* Hero tile skeleton */}
      <div className="skeleton col-span-1 md:col-span-2 h-[200px] rounded-2xl border border-[#1E2D45]/40" />

      {/* Stats tile skeleton */}
      <div className="skeleton h-[200px] rounded-2xl border border-[#1E2D45]/40" />

      {/* Activity tile skeleton */}
      <div className="skeleton col-span-1 md:col-span-2 h-[220px] rounded-2xl border border-[#1E2D45]/40" />

      {/* Course tiles skeletons */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton h-[180px] rounded-2xl border border-[#1E2D45]/40" />
      ))}
    </>
  );
}
