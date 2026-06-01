import type { Metadata, Viewport } from "next";
// @ts-ignore: side-effect CSS import without type declarations
import './globals.css';

export const metadata: Metadata = {
  title: 'LearnOS — Student Dashboard',
  description: 'Next-generation learning platform with real-time progress tracking',
};

export const viewport: Viewport = {
  themeColor: '#080C14',
  width: 'device-width',
  initialScale: 1,
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
