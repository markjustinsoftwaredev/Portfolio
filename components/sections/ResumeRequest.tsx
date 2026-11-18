'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';

export default function ResumeRequest({ nonce: _nonce }: { nonce?: string }) {
  return (
    <section id="resume" className="relative py-20">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-bg-surface p-8 text-center"
        >
          <h2 className="text-sm font-mono uppercase tracking-widest text-accent">
            For Recruiters
          </h2>
          <p className="mt-3 text-xl font-semibold text-white">Resume & Credentials</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Download a copy of my latest resume covering my software development leadership,
            cross-platform builds, and cyber threat monitoring certifications.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/Portfolio/resume.pdf"
              download="Mark_Justin_Alzona_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-black transition hover:bg-accent-dim"
            >
              <Download size={16} />
              Download Resume (PDF)
            </a>

            <a
              href="/Portfolio/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 font-medium text-slate-200 transition hover:border-accent/50 hover:text-accent"
            >
              <ExternalLink size={16} />
              Open in Browser
            </a>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-xs text-slate-500">
            <FileText size={12} />
            PDF format • Direct access
          </p>
        </motion.div>
      </div>
    </section>
  );
}