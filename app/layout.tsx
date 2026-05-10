import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Spend Auditor — Find Where Your Team Overspends on AI",
  description: "Free audit for startups and dev teams. See exactly which AI tools to downgrade, switch, or cancel. Takes 60 seconds.",
  openGraph: {
    title: "AI Spend Auditor — Find Where Your Team Overspends on AI",
    description: "Free audit for startups and dev teams. See exactly which AI tools to downgrade, switch, or cancel. Takes 60 seconds.",
    url: "https://credex-audit-three.vercel.app",
    siteName: "AI Spend Auditor by Credex",
    type: "website",
    images: [
      {
        url: "https://credex-audit-three.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Spend Auditor — Free audit for your AI tool stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Spend Auditor — Find Where Your Team Overspends on AI",
    description: "Free audit for startups and dev teams. Takes 60 seconds.",
    images: ["https://credex-audit-three.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}