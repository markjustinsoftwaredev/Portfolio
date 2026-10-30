'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-grid bg-[size:40px_40px] pt-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/80 to-bg" />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-xs text-accent"
        >
          <ShieldCheck size={14} />
          NC1 Certified — Cyber Threat Monitoring
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Software Developer{' '}
          <span className="text-accent text-glow">&amp; Project Leader</span>
          <br />
          <span className="text-slate-400">| Certified in Cyber Threat Monitoring.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-slate-400 sm:text-lg"
        >
          I lead teams that ship scalable, cross-platform applications — and bring formal SOC
          training to how I think about what I build. This site itself is hardened with the
          practices you&apos;d expect from that training.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-black transition hover:bg-accent-dim"
          >
            View Projects
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </a>
          <a
            href="#resume"
            className="rounded-lg border border-white/15 px-6 py-3 font-medium text-slate-200 transition hover:border-accent/50 hover:text-accent"
          >
            Request Resume
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 font-mono text-xs text-slate-600"
        >
          press <kbd className="rounded border border-white/10 px-1.5 py-0.5">`</kbd> to open
          terminal mode
        </motion.p>
      </div>
    </section>
  );
}
