'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { TerminalSquare, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { certifications, projects } from '@/lib/data';

interface Line {
  type: 'input' | 'output' | 'error';
  text: string;
}

const PROMPT = 'guest@portfolio:~$';

function help(): string[] {
  return [
    'Available commands:',
    '  whoami          — who you are talking to',
    '  about           — short bio',
    '  ls              — list sections',
    '  projects        — list shipped projects',
    '  cat certs.txt   — list certifications',
    '  contact         — how to reach me',
    '  clear           — clear the screen',
    '  exit            — close this terminal',
  ];
}

function runCommand(raw: string): Line[] {
  const cmd = raw.trim();
  const lower = cmd.toLowerCase();

  if (cmd === '') return [];

  if (lower === 'help') return help().map((text) => ({ type: 'output', text }));

  if (lower === 'whoami') {
    return [
      { type: 'output', text: 'Software Developer & Project Leader.' },
      { type: 'output', text: 'Certified in Cyber Threat Monitoring (TESDA / Radenta Academy).' },
    ];
  }

  if (lower === 'about') {
    return [
      {
        type: 'output',
        text: 'I build scalable applications and lead the teams that ship them —',
      },
      {
        type: 'output',
        text: 'C#, cross-platform mobile, offline-first systems — and bring a SOC',
      },
      { type: 'output', text: "mindset to how I think about a system's attack surface." },
    ];
  }

  if (lower === 'ls') {
    return [{ type: 'output', text: 'about  projects  skills  certifications  contact' }];
  }

  if (lower === 'projects') {
    return projects.map((p) => ({
      type: 'output',
      text: `${p.name.padEnd(14)} — ${p.tagline} [${p.role}]`,
    }));
  }

  if (lower === 'cat certs.txt') {
    return certifications.map((c) => ({ type: 'output', text: `✔ ${c.name} — ${c.issuer}` }));
  }

  if (lower === 'contact') {
    return [
      { type: 'output', text: 'Scroll to the Contact section, or run the form there —' },
      { type: 'output', text: 'raw email is intentionally not printed to this console.' },
    ];
  }

  if (lower.startsWith('sudo')) {
    return [{ type: 'error', text: 'Permission denied: nice try.' }];
  }

  if (lower === 'exit') {
    return [{ type: 'output', text: '__EXIT__' }];
  }

  return [{ type: 'error', text: `command not found: ${cmd}` }];
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: 'Terminal Mode — type "help" to get started.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === '`' && !open) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = input;
    if (cmd.trim().toLowerCase() === 'clear') {
      setLines([]);
      setInput('');
      setHistory((h) => [...h, cmd]);
      setHistoryIdx(null);
      return;
    }

    const result = runCommand(cmd);
    const isExit = result.some((l) => l.text === '__EXIT__');

    setLines((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      ...(isExit ? [] : result),
    ]);
    setHistory((h) => [...h, cmd]);
    setHistoryIdx(null);
    setInput('');

    if (isExit) setOpen(false);
  }

  function onKeyDownInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === null) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(null);
        setInput('');
      } else {
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx] ?? '');
      }
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open terminal mode"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-accent/40 bg-bg-surface px-4 py-3 text-accent shadow-lg transition hover:border-accent hover:shadow-[0_0_20px_rgba(0,255,163,0.3)]"
      >
        <TerminalSquare size={18} />
        <span className="hidden text-xs font-mono sm:inline">Terminal Mode</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-accent/30 bg-black font-mono text-sm shadow-2xl sm:rounded-xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="Interactive terminal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-accent/20 bg-bg-surface px-4 py-2">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-danger/70" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                  <span className="h-3 w-3 rounded-full bg-accent/70" />
                </div>
                <span className="text-xs text-slate-400">guest@portfolio</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close terminal"
                  className="text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-3 text-accent">
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.type === 'input'
                        ? 'text-slate-200'
                        : line.type === 'error'
                          ? 'text-danger'
                          : 'text-accent/90'
                    }
                  >
                    {line.type === 'input' ? `${PROMPT} ${line.text}` : line.text}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={submit} className="flex items-center gap-2 border-t border-accent/20 px-4 py-3">
                <span className="text-accent">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDownInput}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent text-slate-100 outline-none"
                  aria-label="Terminal command input"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
