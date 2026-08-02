import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://japankoreaacademy.com'),
  title: "Japan Korea Academy — Nepal's Complete Japanese & Korean Language Learning Platform",
  description: "Official Japan Korea Academy platform (JapanKoreaAcademy.com). Offers JLPT (N5-N1), JFT-Basic, NAT-Test, TOPIK, EPS-TOPIK (Lessons 1-60), Speaking Classes, Visa Interview Preparation, Study in Japan, Work in Japan (SSW 1 & 2), and Work in Korea (EPS E-9).",
  keywords: [
    "Japan Korea Academy", "JapanKoreaAcademy.com",
    "JLPT N5", "JLPT N4", "JLPT N3", "JFT-Basic 250 Marks", "NAT-Test Nepal",
    "TOPIK Korea", "EPS-TOPIK 1-60", "Speaking Classes Nepal", "Visa Interview Preparation",
    "Study in Japan", "Work in Japan SSW 1", "Work in Korea E-9",
    "Japanese Language School Kathmandu"
  ],
  authors: [{ name: "Japan Korea Academy" }],
  creator: "Japan Korea Academy",
  publisher: "Japan Korea Academy Network",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Japan Korea Academy — Nepal's Complete Japanese & Korean Learning Platform",
    description: "Prepare for JLPT, JFT-Basic, NAT-Test, TOPIK, EPS-TOPIK, Visa Interview Prep, Study in Japan & Work in Japan / Korea.",
    url: "https://japankoreaacademy.com",
    siteName: "Japan Korea Academy",
    images: [{ url: "/logo.png", width: 800, height: 800, alt: "Japan Korea Academy Logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Korea Academy — Nepal's Complete Japanese & Korean Platform",
    description: "JLPT, JFT-Basic, NAT-Test, TOPIK, EPS-TOPIK, Speaking Classes & Visa Interview Prep.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://japankoreaacademy.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Japan Korea Academy',
    url: 'https://japankoreaacademy.com',
    logo: 'https://japankoreaacademy.com/logo.png',
    sameAs: ['https://japankoreaacademy.com'],
    description: "Nepal's Complete Japanese & Korean Language Learning Platform",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
