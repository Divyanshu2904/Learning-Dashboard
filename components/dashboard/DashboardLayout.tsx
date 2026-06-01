'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/sidebar/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstLetter, setFirstLetter] = useState('D');

  // Reactively track dynamic username changes for initials
  useEffect(() => {
    const savedName = localStorage.getItem("studentName");
    if (savedName && savedName.trim().length > 0) {
      setFirstLetter(savedName.trim()[0].toUpperCase());
    }

    const handleUpdate = () => {
      const updatedName = localStorage.getItem("studentName");
      if (updatedName && updatedName.trim().length > 0) {
        setFirstLetter(updatedName.trim()[0].toUpperCase());
      }
    };
    window.addEventListener("studentNameUpdated", handleUpdate);
    return () => window.removeEventListener("studentNameUpdated", handleUpdate);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#080C14] relative overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      
      {/* Ambient glow blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 w-72 h-72 bg-blue-500/4 rounded-full blur-3xl pointer-events-none" />

      {/* Sidebar — hidden on mobile & tablets */}
      <div className="hidden lg:block relative z-20">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(v => !v)}
        />
      </div>

      {/* Mobile/Tablet menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile/Tablet slide-in sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-40 lg:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main content area */}
      <main className="flex-1 relative z-10 overflow-auto">
        {/* Mobile/Tablet top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-[#1E2D45]/60 bg-[#0D1117]/80 backdrop-blur-md sticky top-0 z-20">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-[#0D1220] border border-[#1E2D45] text-[#8BA4C0] hover:text-[#E8F4FD] active:scale-95 transition-all"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          
          <span className="font-display font-bold text-[#E8F4FD] tracking-tight text-lg">LearnOS</span>
          
          {/* Circular avatar links directly to settings */}
          <Link 
            href="/settings" 
            className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white hover:scale-105 active:scale-95 transition-all"
            title="Go to Settings"
          >
            {firstLetter}
          </Link>
        </div>

        <div className="p-4 md:p-6 lg:p-8 max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}
