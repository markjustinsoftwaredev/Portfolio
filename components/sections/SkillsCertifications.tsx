'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useMemo, useState } from 'react';
import { certifications, skills } from '@/lib/data';
import type { SkillCategory } from '@/types';

const CATEGORIES: Array<SkillCategory | 'All'> = [
  'All',
  'Software Development',
  'Security & Networking',
  'Leadership',
];

export default function SkillsCertifications() {
  const [filter, setFilter] = useState<SkillCategory | 'All'>('All');

  const filteredSkills = useMemo(
    () => (filter === 'All' ? skills : skills.filter((s) => s.category === filter)),
    [filter]
  );
  const filteredCerts = useMemo(
    () => (filter === 'All' ? certifications : certifications.filter((c) => c.category === filter)),
    [filter]
  );

  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-sm font-mono uppercase tracking-widest text-accent">
            Skills &amp; Certifications
          </h2>
          <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Three disciplines, one profile.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filter === category
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">
              Skills
            </h3>
            <div className="space-y-4">
              {filteredSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-300">{skill.name}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-accent-dim to-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">
              Certifications
            </h3>
            <div className="space-y-3">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-bg-surface p-4"
                >
                  <Award size={18} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-white">{cert.name}</p>
                    <p className="text-xs text-slate-500">{cert.issuer}</p>
                  </div>
                </div>
              ))}
              {filteredCerts.length === 0 && (
                <p className="text-sm text-slate-500">No certifications in this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
