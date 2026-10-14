import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { COPY, SITE_NAME } from "@/content/site";
import "./globals.css";

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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
