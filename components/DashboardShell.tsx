import { Course } from "@/types";
import Sidebar from "@/components/sidebar/Sidebar";
import MobileNav from "@/components/sidebar/MobileNav";
import TopBar from "@/components/TopBar";
import BentoGrid from "@/components/tiles/BentoGrid";

interface DashboardShellProps {
  courses: Course[];
}

export default function DashboardShell({ courses }: DashboardShellProps) {
  return (
    <div className="flex h-screen bg-[#080B11] overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-6">
          {/* Grid background */}
          <div className="grid-bg min-h-full">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
              {/* Page title */}
              <div className="mb-6">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">
                  Overview
                </p>
                <h2
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Dashboard
                </h2>
              </div>

              {/* Bento Grid */}
              <BentoGrid courses={courses} />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
