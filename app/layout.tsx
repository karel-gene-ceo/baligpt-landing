import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "BaliGPT — Your Local Friend in Bali",
  description:
    "The AI that actually knows Bali. Real prices, honest area guides, scams to avoid, where to eat, what to do. Like texting a friend who's lived here for years.",
  openGraph: {
    title: "BaliGPT — Your Local Friend in Bali",
    description:
      "The AI that actually knows Bali. Real prices, honest area guides, scams to avoid.",
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
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        dmSans.variable,
        instrumentSerif.variable
      )}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
