import { Suspense } from 'react';
import { getCourses } from '@/lib/supabase';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import HeroTile from '@/components/tiles/HeroTile';
import CourseTile from '@/components/tiles/CourseTile';
import ActivityTile from '@/components/tiles/ActivityTile';
import StatsTile from '@/components/tiles/StatsTile';
import { CoursesSkeleton } from '@/components/ui/Skeletons';
import BentoGrid from '@/components/tiles/BentoGrid';
import { assignColors } from '@/lib/utils';

const userProfile = {
  name: 'Aryan',
  streak: 12,
  xp: 4280,
  level: 7,
  rank: 'Curious Explorer',
};

async function CoursesSection() {
  const courses = await getCourses();
  const colorMap = assignColors(courses);
  const coloredCourses = courses.map(c => ({ ...c, color: colorMap[c.id] }));

  return (
    <>
      {coloredCourses.map((course, index) => (
        <CourseTile key={course.id} course={course} index={index + 3} />
      ))}
    </>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <BentoGrid>
        <HeroTile user={userProfile} index={0} />
        <StatsTile user={userProfile} index={1} />
        <ActivityTile index={2} />
        <Suspense fallback={<CoursesSkeleton count={4} />}>
          <CoursesSection />
        </Suspense>
      </BentoGrid>
    </DashboardLayout>
  );
}
