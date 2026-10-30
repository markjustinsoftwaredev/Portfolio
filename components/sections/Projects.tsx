'use client';

import { motion } from 'framer-motion';
import { Boxes, Layers } from 'lucide-react';
import { useState } from 'react';
import { projects } from '@/lib/data';
import ProtectedImage from '@/components/ui/ProtectedImage';
import ProjectModal from '@/components/ui/ProjectModal';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<{ slug: string; name: string } | null>(
    null
  );

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-sm font-mono uppercase tracking-widest text-accent">Projects</h2>
          <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Shipped, led, and still running.
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid gap-6 rounded-2xl border border-white/10 bg-bg-surface p-6 md:grid-cols-5 md:gap-8 md:p-8"
            >
              <div className="md:col-span-2">
                <ProtectedImage
                  src={project.image}
                  alt={`${project.name} system diagram preview`}
                  width={640}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="md:col-span-3">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-accent">
                    {project.role}
                  </span>
                </div>
                <p className="mb-4 text-sm text-slate-400">{project.tagline}</p>

                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wide text-slate-500">
                      Problem
                    </dt>
                    <dd className="mt-1 text-slate-300">{project.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wide text-slate-500">
                      Action
                    </dt>
                    <dd className="mt-1 text-slate-300">{project.action}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs uppercase tracking-wide text-slate-500">
                      Result
                    </dt>
                    <dd className="mt-1 text-slate-300">{project.result}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-white/10 px-2 py-1 text-xs text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.hasArchitecture && (
                  <button
                    onClick={() => setActiveProject({ slug: project.slug, name: project.name })}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg border border-accent/40 px-4 py-2 text-sm text-accent transition hover:bg-accent/10"
                  >
                    <Layers size={16} />
                    View Architecture
                  </button>
                )}
                {!project.hasArchitecture && (
                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-slate-500">
                    <Boxes size={16} />
                    Internal system — diagram not public
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal
        slug={activeProject?.slug ?? null}
        name={activeProject?.name ?? ''}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
