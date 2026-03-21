"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const QUESTIONS = [
  "Where should I stay in Canggu?",
  "Is it safe to rent a scooter?",
  "Best coworking spaces with fast wifi?",
  "How much should a villa cost per month?",
  "What is Nyepi and should I plan around it?",
  "Where do locals actually eat in Ubud?",
];

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Real prices",
    desc: "What things actually cost, not tourist markup",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: "Area guides",
    desc: "Honest vibes, not marketing fluff",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: "Scam alerts",
    desc: "Know what to avoid before you arrive",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Book stays",
    desc: "Find and book accommodation directly",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const q = QUESTIONS[currentQ];
    if (typing) {
      if (displayed.length < q.length) {
        const t = setTimeout(() => setDisplayed(q.slice(0, displayed.length + 1)), 45);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 18);
        return () => clearTimeout(t);
      } else {
        setCurrentQ((p) => (p + 1) % QUESTIONS.length);
        setTyping(true);
      }
    }
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
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full animate-pulse-soft"
          style={{
            background: "radial-gradient(circle, #5C7A62 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full animate-pulse-soft"
          style={{
            background: "radial-gradient(circle, #8FB996 0%, transparent 70%)",
            animationDelay: "1.5s",
          }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full animate-pulse-soft"
          style={{
            background: "radial-gradient(circle, #d4c5a9 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center text-center max-w-3xl px-6 py-16">
        {/* Status badge */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: "0s" }}
        >
          <Badge
            variant="outline"
            className="mb-10 px-4 py-1.5 text-sm font-normal border-sage/30 text-sage bg-sage/5 rounded-full"
          >
            <span className="relative flex h-1.5 w-1.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sage" />
            </span>
            Now in early access
          </Badge>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up font-display text-7xl sm:text-[110px] leading-[0.9] tracking-tight text-foreground mb-8"
          style={{ animationDelay: "0.1s" }}
        >
          Bali<span className="text-sage">GPT</span>
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-up text-xl sm:text-2xl text-muted-foreground font-light max-w-lg mb-6 leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          Your local friend in Bali, powered by AI.
        </p>

        <p
          className="animate-fade-up text-base text-muted-foreground/70 max-w-md mb-12 leading-relaxed"
          style={{ animationDelay: "0.3s" }}
        >
          Real prices. Honest area guides. Scams to avoid. Restaurants locals
          love. Like texting someone who&apos;s lived here for years.
        </p>

        {/* Chat preview card */}
        <div
          className="animate-fade-up w-full max-w-lg mb-12"
          style={{ animationDelay: "0.4s" }}
        >
          <Card className="overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm shadow-xl shadow-sage/5">
            {/* Chat header bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/50">
              <div className="w-7 h-7 rounded-full bg-sage flex items-center justify-center">
                <span className="text-white text-[10px] font-bold tracking-tight">
                  BG
                </span>
              </div>
              <span className="text-sm font-medium text-foreground/80">
                BaliGPT
              </span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
              </div>
            </div>
            {/* Chat input area */}
            <div className="p-4">
              <div className="bg-muted/50 rounded-xl px-4 py-3.5 flex items-center min-h-[52px]">
                <span className="text-muted-foreground text-[15px]">
                  {displayed}
                  <span className="inline-block w-[2px] h-[18px] bg-sage ml-0.5 animate-blink align-text-bottom" />
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Waitlist form */}
        <div
          className="animate-fade-up w-full max-w-md mb-16"
          style={{ animationDelay: "0.5s" }}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-sage"
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
              <p className="text-xl font-medium text-foreground">
                You&apos;re on the list
              </p>
              <p className="text-muted-foreground">
                We&apos;ll let you know when it&apos;s your turn.
              </p>
            </div>
          ) : (
            <>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 h-13 px-5 rounded-2xl border-border/60 bg-card text-base shadow-sm focus-visible:ring-sage/30 focus-visible:border-sage"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="h-13 px-8 rounded-2xl bg-sage text-white font-semibold text-base hover:bg-sage-dark active:scale-[0.98] transition-all shadow-md shadow-sage/20 cursor-pointer"
                >
                  {loading ? "Joining..." : "Join waitlist"}
                </Button>
              </form>
              <p className="mt-4 text-sm text-muted-foreground/60">
                Free early access. No spam, ever.
              </p>
            </>
          )}
        </div>

        {/* Feature grid */}
        <div
          className="animate-fade-up grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl"
          style={{ animationDelay: "0.6s" }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/40 hover:border-sage/30 hover:bg-sage/5 transition-all duration-300"
            >
              <div className="text-sage/70">{f.icon}</div>
              <span className="text-sm font-medium text-foreground/80">
                {f.title}
              </span>
              <span className="text-xs text-muted-foreground/60 leading-snug">
                {f.desc}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-8 text-sm text-muted-foreground/40">
        Built for people who actually live in Bali.
      </footer>
    </div>
  );
}
