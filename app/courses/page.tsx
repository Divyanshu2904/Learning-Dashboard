import { Suspense } from "react";
import { getCourses } from "@/lib/supabase";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import CoursesClient from "./CoursesClient";
import { CoursesSkeleton } from "@/components/ui/Skeletons";

export const revalidate = 0;

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1
            className="text-3xl font-bold text-white tracking-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            My Courses
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your dynamic curriculum, study plans, and interactive syllabi.
          </p>
        </div>

        <Suspense fallback={<CoursesSkeleton count={6} />}>
          <CoursesClient initialCourses={courses} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
