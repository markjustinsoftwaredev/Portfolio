'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { EAlertoDiagram, SukiLinkDiagram } from './ArchitectureDiagrams';

interface ProjectModalProps {
  slug: string | null;
  name: string;
  onClose: () => void;
}

const diagrams: Record<string, () => React.ReactElement> = {
  sukilink: SukiLinkDiagram,
  ealerto: EAlertoDiagram,
};

export default function ProjectModal({ slug, name, onClose }: ProjectModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!slug) return;
    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [slug, onClose]);

  const Diagram = slug ? diagrams[slug] : null;

  return (
    <AnimatePresence>
      {slug && Diagram && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} architecture diagram`}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-bg-surface p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-mono text-lg text-accent">{name} — System Architecture</h3>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close architecture diagram"
                className="rounded-full p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="rounded-xl border border-white/10 bg-bg p-4">
              <Diagram />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
