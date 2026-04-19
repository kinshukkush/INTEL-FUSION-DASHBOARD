import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { IntelProvider } from "@/context/IntelContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intel Fusion Dashboard — Multi-Source Intelligence",
  description:
    "Advanced multi-source intelligence fusion center. Visualize OSINT, HUMINT, and IMINT data across an interactive dark-themed global map.",
  keywords: ["intelligence", "OSINT", "HUMINT", "IMINT", "geospatial", "dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <IntelProvider>{children}</IntelProvider>
      </body>
    </html>
  );
}
