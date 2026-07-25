import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LanguageGuru - JLPT & EPS-TOPIK Learning Platform",
  description: "Master Japanese (JLPT N5-N1) and Korean (EPS-TOPIK) with SM-2 Spaced Repetition, SVG Stroke Order animations, and Offline PWA support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
