'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { useState } from 'react';

const EMAIL = 'markjustinsoftwaredev.gmail.com';

const contacts = [
  {
    name: 'Gmail',
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    description: 'Best for job opportunities, project inquiries, and direct messages.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    handle: '@markjustinsoftwaredev',
    href: 'https://github.com/markjustinsoftwaredev',
    description: 'Explore my repositories, source code, and active builds.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'Mark Justin Alzona',
    href: 'https://www.linkedin.com/in/mark-justin-alzona-57a9aa418/',
    description: 'Connect with me professionally and view my career background.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'Mark Justin Alzona',
    href: 'https://www.facebook.com/markjustin.alzona.3511/',
    description: 'Reach out via Messenger or follow my updates.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    ),
  },
];

export default function Contact({ nonce: _nonce }: { nonce?: string }) {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">Contact</h2>
          <p className="mt-3 text-3xl font-bold text-white sm:text-4xl">Let's connect.</p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Open to software engineering, project leadership, and cybersecurity roles. Reach out
            through any of the channels below.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-bg-surface px-4 py-2 font-mono text-xs text-slate-300 transition hover:border-accent/50 hover:text-accent"
            >
              {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
              {copied ? 'Copied Gmail address!' : `Copy Gmail: ${EMAIL}`}
            </button>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {contacts.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-bg-surface p-6 transition hover:border-accent/50 hover:bg-white/[0.03]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="font-mono text-xs text-accent">{item.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
                <p className="mt-4 text-sm text-slate-400">{item.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}