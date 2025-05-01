// app/layout.tsx (or layout.js)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StartupAnimation } from "@/components/motion/startup-animation";
import { MusicPlayer } from "@/components/ui/music-player";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AJ Portfolio",
  description: "Portfolio Website",
  icons: {
    icon: '/best.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StartupAnimation />
        {children}
        <MusicPlayer />
      </body>
    </html>
  );
}
