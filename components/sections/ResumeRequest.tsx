'use client';

import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import TurnstileWidget from '@/components/ui/Turnstile';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ResumeRequest({ nonce }: { nonce?: string }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setMessage('Please complete the verification challenge first.');
      return;
    }
    setStatus('submitting');
    setMessage(null);

    try {
      const res = await fetch('/api/request-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken: token }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong.');
        return;
      }

      setStatus('success');
      window.open(data.url, '_blank', 'noopener,noreferrer');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

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
          <p className="mt-3 text-xl font-semibold text-white">Request Resume Access</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            The resume link isn&apos;t exposed anywhere in this page&apos;s HTML — verifying below
            unlocks a direct download, which keeps it out of reach of static scrapers.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-bg px-4 py-3 text-sm text-white outline-none focus:border-accent"
            />

            <div className="flex justify-center">
              <TurnstileWidget onVerify={setToken} onExpire={() => setToken(null)} nonce={nonce} />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-medium text-black transition hover:bg-accent-dim disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              Get Resume
            </button>

            {message && (
              <p
                className={`text-center text-sm ${
                  status === 'error' ? 'text-danger' : 'text-accent'
                }`}
              >
                {message}
              </p>
            )}
            {status === 'success' && (
              <p className="text-center text-sm text-accent">
                Verified — your download should have opened in a new tab.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
