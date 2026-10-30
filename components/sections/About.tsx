'use client';

import { motion } from 'framer-motion';
import { Code2, ShieldCheck, Users } from 'lucide-react';

const PILLARS = [
  {
    icon: Code2,
    title: 'Builds scalable systems',
    body: 'C#, cross-platform mobile, and offline-first architectures designed to stay reliable under real-world conditions, not just in a demo.',
  },
  {
    icon: Users,
    title: 'Leads the team shipping them',
    body: 'Project Manager / Project Leader on every featured project — owning scope, coordinating developers, and keeping delivery on track end to end.',
  },
  {
    icon: ShieldCheck,
    title: 'Thinks in a SOC mindset',
    body: 'Formal training in Cyber Threat Monitoring (NC1, Radenta Academy / TESDA TTSP) shapes how I evaluate risk and attack surface while building — the goal is bridging development with proactive cyber defense, DevSecOps rather than security bolted on after.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-sm font-mono uppercase tracking-widest text-accent">About</h2>
          <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            A developer who leads, trained to think like defense.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-bg-surface p-6"
            >
              <pillar.icon className="mb-4 text-accent" size={28} />
              <h3 className="mb-2 font-semibold text-white">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{pillar.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
