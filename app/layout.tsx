import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BaliGPT — Your Local Friend in Bali",
  description:
    "The AI that actually knows Bali. Prices, areas, scams to avoid, where to eat, what to do. Like texting a friend who's lived here for years.",
  openGraph: {
    title: "BaliGPT — Your Local Friend in Bali",
    description:
      "The AI that actually knows Bali. Prices, areas, scams to avoid, where to eat, what to do.",
    url: "https://baligpt.io",
    siteName: "BaliGPT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
