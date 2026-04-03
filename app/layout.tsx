import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SomnaFlow — Professional Sleep Care, Delivered to Your Doorstep",
  description:
    "Stop tracking bad sleep. Fix it. AI-powered sleep medicine, physician-reviewed prescriptions, delivered to your door in 24 hours. Starting at $79/mo.",
  keywords: [
    "sleep medicine",
    "telehealth",
    "sleep treatment",
    "insomnia",
    "sleep doctor",
    "online prescription",
  ],
  openGraph: {
    title: "SomnaFlow — Professional Sleep Care",
    description: "Don't just track bad sleep. Fix it in 15 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
