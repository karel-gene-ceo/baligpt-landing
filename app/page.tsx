"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUESTIONS = [
  "Where should I stay in Canggu?",
  "Is it safe to rent a scooter?",
  "Best coworking spaces with fast wifi?",
  "How much should a villa cost per month?",
  "What is Nyepi and should I plan around it?",
  "Where do locals actually eat in Ubud?",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const q = QUESTIONS[currentQ];
    if (typing) {
      if (displayed.length < q.length) {
        const t = setTimeout(
          () => setDisplayed(q.slice(0, displayed.length + 1)),
          45
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyping(false), 2400);
      return () => clearTimeout(t);
    }
    if (displayed.length > 0) {
      const t = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        18
      );
      return () => clearTimeout(t);
    }
    setCurrentQ((p) => (p + 1) % QUESTIONS.length);
    setTyping(true);
  }, [displayed, typing, currentQ]);

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
    } catch {
      // still show success
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#faf9f7]">
      {/* Single subtle gradient wash — top right, barely visible */}
      <div
        className="pointer-events-none absolute -top-[40%] -right-[20%] w-[900px] h-[900px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, #5C7A62 0%, transparent 65%)",
        }}
      />

      {/* Content — generous whitespace, stacked vertically */}
      <main className="relative z-10 flex flex-col items-center px-6 w-full max-w-[560px]">
        {/* Wordmark */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <h1 className="text-[15px] font-semibold tracking-[0.2em] uppercase text-[#1a1a1a]/40 mb-16">
            BaliGPT
          </h1>
        </div>

        {/* Headline — large serif, one clear statement */}
        <div
          className="transition-all duration-700 ease-out delay-100"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "100ms",
          }}
        >
          <h2 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-[#1a1a1a] text-center mb-6">
            Your local friend
            <br />
            <span className="text-[#5C7A62]">in Bali</span>
          </h2>
        </div>

        {/* One-liner */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "200ms",
          }}
        >
          <p className="text-[17px] leading-relaxed text-[#1a1a1a]/50 text-center max-w-[420px] mb-14">
            AI that actually knows Bali. Real prices, honest area guides,
            and the things no one tells you until you&apos;ve already made the mistake.
          </p>
        </div>

        {/* Chat preview — minimal, just the input bar */}
        <div
          className="w-full mb-14 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "300ms",
          }}
        >
          <div className="rounded-2xl border border-[#e8e5e0] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-h-[28px] flex items-center">
                <span className="text-[15px] text-[#1a1a1a]/35">
                  {displayed}
                  <span
                    className="inline-block w-[1.5px] h-[17px] bg-[#5C7A62] ml-[1px] align-text-bottom"
                    style={{ animation: "blink 1.2s step-end infinite" }}
                  />
                </span>
              </div>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#5C7A62] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Waitlist */}
        <div
          className="w-full mb-20 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "400ms",
          }}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-10 h-10 rounded-full bg-[#5C7A62]/8 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#5C7A62]"
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
              <p className="text-[17px] font-medium text-[#1a1a1a]">
                You&apos;re on the list
              </p>
              <p className="text-sm text-[#1a1a1a]/40">
                We&apos;ll reach out when it&apos;s your turn.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <form
                onSubmit={handleSubmit}
                className="flex w-full gap-2.5"
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 h-12 px-4 rounded-xl border-[#e8e5e0] bg-white text-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] placeholder:text-[#1a1a1a]/25 focus-visible:ring-[#5C7A62]/20 focus-visible:border-[#5C7A62]/40"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 px-6 rounded-xl bg-[#1a1a1a] text-white text-[15px] font-medium hover:bg-[#333] active:scale-[0.98] transition-all cursor-pointer"
                >
                  {loading ? "..." : "Get early access"}
                </Button>
              </form>
              <p className="mt-3.5 text-[13px] text-[#1a1a1a]/30">
                Free for the first 500 people. No spam.
              </p>
            </div>
          )}
        </div>

        {/* Minimal feature row — just text, no cards, no icons */}
        <div
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transitionDelay: "500ms",
          }}
        >
          {[
            "Prices",
            "Areas",
            "Stays",
            "Scams",
            "Transport",
            "Food",
          ].map((item, i) => (
            <span
              key={item}
              className="text-[13px] text-[#1a1a1a]/30 tracking-wide uppercase"
            >
              {item}
              {i < 5 && (
                <span className="ml-6 text-[#1a1a1a]/10">·</span>
              )}
            </span>
          ))}
        </div>
      </main>

      {/* Footer — barely there */}
      <footer className="relative z-10 mt-auto pb-8 pt-16">
        <p className="text-[12px] text-[#1a1a1a]/20 tracking-wide">
          Built for people who live in Bali
        </p>
      </footer>
    </div>
  );
}
