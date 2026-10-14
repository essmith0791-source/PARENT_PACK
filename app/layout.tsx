import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import type { ReactNode } from "react";
import { COPY, SITE_NAME } from "@/content/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Downloaded once at build time and served from this site. Zero requests to Google at runtime.
const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  title: COPY.meta.title,
  description: COPY.meta.description,
  // Pilot mode: reached by flyer, not search.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: COPY.meta.title,
    description: COPY.meta.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Browser bar color: the top of the sky in its final frame.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E4DEF0" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1A2B" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the head script may set data-theme before React loads.
    <html lang="en" className={atkinson.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
