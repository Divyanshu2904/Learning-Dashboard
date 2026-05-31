'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#080C14] relative overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      
      {/* Ambient glow blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 w-72 h-72 bg-blue-500/4 rounded-full blur-3xl pointer-events-none" />

      {/* Sidebar — hidden on mobile */}
      <div className="hidden md:block relative z-20">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(v => !v)}
        />
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile slide-in sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 relative z-10 overflow-auto">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b border-[#1E2D45]/60">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-[#0D1220] border border-[#1E2D45] text-[#8BA4C0] hover:text-[#E8F4FD] transition-colors"
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="font-display font-bold text-[#E8F4FD] tracking-tight text-lg">LearnOS</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">A</div>
        </div>

        <div className="p-4 md:p-6 lg:p-8 max-w-[1400px]">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-[#0D1220]/95 backdrop-blur-xl border-t border-[#1E2D45]/80">
        <div className="flex items-center justify-around px-2 py-3">
          {[
            { icon: '⊞', label: 'Home' },
            { icon: '◫', label: 'Courses' },
            { icon: '◈', label: 'Progress' },
            { icon: '◉', label: 'Profile' },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-[#4A6785] hover:text-[#00D4FF] transition-colors group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
