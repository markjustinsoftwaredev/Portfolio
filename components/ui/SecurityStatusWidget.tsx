'use client';

import { ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LogEntry {
  id: number;
  time: string;
  text: string;
}

const EVENT_TEMPLATES = [
  (ip: string) => `Blocked scraper bot from ${ip} — honeypot field triggered`,
  (ip: string) => `Rate limit enforced for ${ip} — exceeded 5 req/10min on /api/contact`,
  (ip: string) => `Rejected request from ${ip} — Turnstile challenge failed`,
  (ip: string) => `Flagged anomalous User-Agent from ${ip}`,
  (ip: string) => `CSP violation report discarded from ${ip} — no policy breach confirmed`,
];

function fakeIp() {
  return `${rand(10, 223)}.${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}`;
}
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let nextId = 1;
function generateEntry(): LogEntry {
  const template = EVENT_TEMPLATES[rand(0, EVENT_TEMPLATES.length - 1)]!;
  return {
    id: nextId++,
    time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    text: template(fakeIp()),
  };
}

export default function SecurityStatusWidget() {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Randomized, client-only content (fake IPs/timestamps) — generated here
    // rather than in the initial render specifically so it never has to match
    // server-rendered output, which avoids a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries([generateEntry(), generateEntry(), generateEntry()]);
    const interval = setInterval(() => {
      setEntries((prev) => [generateEntry(), ...prev].slice(0, 6));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md rounded-xl border border-accent/20 bg-bg-surface/80 p-4 font-mono text-xs">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-accent" />
          <span className="text-slate-300">Live Security Status:</span>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Secure
          </span>
        </div>
        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-500">simulated demo</span>
      </div>
      <div className="scrollbar-thin h-28 space-y-1 overflow-y-auto text-slate-500">
        {entries.map((entry) => (
          <div key={entry.id} className="truncate">
            <span className="text-slate-600">[{entry.time}]</span>{' '}
            <span className="text-danger/70">DROP</span> {entry.text}
          </div>
        ))}
      </div>
    </div>
  );
}
