import { Github, Linkedin } from 'lucide-react';
import SecurityStatusWidget from '@/components/ui/SecurityStatusWidget';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-mono text-sm text-accent">&gt; Mark Justin Alzona</p>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            Software Developer & Project Leader, certified in Cyber Threat Monitoring.
          </p>
          <div className="mt-4 flex justify-center gap-4 md:justify-start">
            <a
              href="https://github.com/markjustinsoftwaredev"
              aria-label="GitHub profile"
              className="text-slate-400 transition hover:text-accent"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mark-justin-alzona-57a9aa418/"
              aria-label="LinkedIn profile"
              className="text-slate-400 transition hover:text-accent"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <SecurityStatusWidget />
      </div>

      <div className="border-t border-white/5 px-6 py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()}. Built with Next.js, hardened with a strict CSP.
      </div>
    </footer>
  );
}
