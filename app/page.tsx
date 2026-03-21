"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6">
      <main className="flex flex-col items-center text-center max-w-2xl">
        {/* Logo */}
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[#1a1a1a] mb-4">
          BaliGPT
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-zinc-500 font-light mb-3">
          Your local friend in Bali.
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-md mb-12 leading-relaxed">
          The AI that actually knows Bali. Prices, areas, scams to avoid, where
          to eat, what to do. Like texting a friend who&apos;s lived here for
          years.
        </p>

        {/* Waitlist form */}
        {submitted ? (
          <div className="flex items-center gap-2 text-[#5C7A62] font-medium text-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 h-12 px-4 rounded-xl border border-zinc-200 bg-white text-base text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-[#5C7A62] focus:ring-1 focus:ring-[#5C7A62] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-12 px-6 rounded-xl bg-[#5C7A62] text-white font-medium text-base hover:bg-[#4a6350] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Joining..." : "Join waitlist"}
            </button>
          </form>
        )}

        {/* Social proof hint */}
        <p className="mt-6 text-sm text-zinc-400">
          Early access for the first 500 signups.
        </p>
      </main>
    </div>
  );
}
