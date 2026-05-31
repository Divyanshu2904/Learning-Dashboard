import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LearnOS — Student Dashboard',
  description: 'Next-generation learning platform with real-time progress tracking',
  themeColor: '#080C14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080C14] text-[#E8F4FD] font-body antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
