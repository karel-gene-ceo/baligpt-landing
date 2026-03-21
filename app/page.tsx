"use client";

import { useState, useEffect } from "react";

const EXAMPLE_QUESTIONS = [
  "Where should I stay in Canggu?",
  "Is it safe to rent a scooter?",
  "Best coworking spaces with fast wifi?",
  "How much should a villa cost?",
  "What&apos;s Nyepi and should I plan around it?",
  "Where do locals actually eat?",
];

function FloatingOrb({ delay, className }: { delay: number; className: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect for example questions
  useEffect(() => {
    const question = EXAMPLE_QUESTIONS[currentQuestion];
    if (isTyping) {
      if (displayedText.length < question.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(question.slice(0, displayedText.length + 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        setCurrentQuestion((prev) => (prev + 1) % EXAMPLE_QUESTIONS.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentQuestion]);

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
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 overflow-hidden">
      {/* Ambient background orbs */}
      <FloatingOrb delay={0} className="w-96 h-96 bg-[#5C7A62] -top-48 -left-48" />
      <FloatingOrb delay={2} className="w-80 h-80 bg-[#8FB996] -bottom-40 -right-40" />
      <FloatingOrb delay={4} className="w-64 h-64 bg-[#A7C4AA] top-1/4 right-1/4" />

      <main className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C7A62]/10 border border-[#5C7A62]/20 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5C7A62] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5C7A62]" />
          </span>
          <span className="text-sm font-medium text-[#5C7A62]">
            Now in early access
          </span>
        </div>

        {/* Logo */}
        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-[#1a1a1a] mb-6">
          BaliGPT
        </h1>

        {/* Tagline */}
        <p className="text-2xl sm:text-3xl text-zinc-600 font-light mb-4 leading-snug">
          Your local friend in Bali.
        </p>

        {/* Description */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed">
          The AI that actually knows Bali. Real prices, honest area guides,
          scams to avoid, where to eat, what to do. Like texting a friend
          who&apos;s lived here for years.
        </p>

        {/* Interactive chat preview */}
        <div className="w-full max-w-lg mb-10">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-lg shadow-zinc-200/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#5C7A62] flex items-center justify-center">
                <span className="text-white text-xs font-bold">BG</span>
              </div>
              <span className="text-sm font-medium text-zinc-900">BaliGPT</span>
            </div>
            <div className="bg-zinc-50 rounded-xl px-4 py-3 min-h-[48px] flex items-center">
              <span className="text-zinc-500 text-base">
                {displayedText}
                <span className="inline-block w-0.5 h-5 bg-[#5C7A62] ml-0.5 animate-blink align-middle" />
              </span>
            </div>
          </div>
        </div>

        {/* Waitlist form */}
        {submitted ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#5C7A62]/10 flex items-center justify-center mb-2">
              <svg
                className="w-6 h-6 text-[#5C7A62]"
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
            </div>
            <p className="text-xl font-medium text-zinc-900">
              You&apos;re on the list
            </p>
            <p className="text-zinc-500">
              We&apos;ll let you know when it&apos;s your turn.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-14 px-5 rounded-2xl border border-zinc-200 bg-white text-base text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-[#5C7A62] focus:ring-2 focus:ring-[#5C7A62]/20 transition-all shadow-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-14 px-8 rounded-2xl bg-[#5C7A62] text-white font-semibold text-base hover:bg-[#4a6350] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer shadow-sm shadow-[#5C7A62]/25"
              >
                {loading ? "Joining..." : "Join waitlist"}
              </button>
            </form>
            <p className="mt-4 text-sm text-zinc-400">
              Free early access for the first 500 signups. No spam, ever.
            </p>
          </div>
        )}

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          {[
            "Real-time prices",
            "Area guides",
            "Scam alerts",
            "Restaurant recs",
            "Transport costs",
            "Visa info",
          ].map((feature) => (
            <span
              key={feature}
              className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm text-zinc-600 shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-sm text-zinc-400">
        Built for people who actually live in Bali.
      </footer>
    </div>
  );
}
