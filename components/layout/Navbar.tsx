'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-30 w-full border-b border-white/5 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm text-accent">
          &gt; mark.alzona()
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#resume"
            className="rounded-lg border border-accent/40 px-4 py-2 text-sm text-accent transition hover:bg-accent/10"
          >
            Request Resume
          </a>
        </div>

        <button
          className="text-slate-300 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/5 bg-bg px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#resume"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg border border-accent/40 px-2 py-2.5 text-center text-sm text-accent"
          >
            Request Resume
          </a>
        </div>
      )}
    </header>
  );
}
