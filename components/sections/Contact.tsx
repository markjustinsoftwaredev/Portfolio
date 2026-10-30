'use client';

import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import TurnstileWidget from '@/components/ui/Turnstile';
import ObfuscatedEmail from '@/components/ui/ObfuscatedEmail';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact({ nonce }: { nonce?: string }) {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong.');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '', company: '' });
      setToken(null);
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-sm font-mono uppercase tracking-widest text-accent">Contact</h2>
          <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Let&apos;s talk.</p>
          <div className="mt-5 flex justify-center">
            <ObfuscatedEmail />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="relative space-y-4 rounded-2xl border border-white/10 bg-bg-surface p-8"
        >
          {/* Honeypot: visually hidden off-screen (not display:none) so most
              bots that only check computed visibility still fill it in. Any
              value here causes the API route to silently drop the submission. */}
          <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-slate-400">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-bg px-4 py-3 text-sm text-white outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-slate-400">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-bg px-4 py-3 text-sm text-white outline-none focus:border-accent"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-slate-400">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full resize-none rounded-lg border border-white/10 bg-bg px-4 py-3 text-sm text-white outline-none focus:border-accent"
            />
          </div>

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
              <Send size={16} />
            )}
            Send Message
          </button>

          {message && (
            <p className={`text-center text-sm ${status === 'error' ? 'text-danger' : 'text-accent'}`}>
              {message}
            </p>
          )}
          {status === 'success' && (
            <p className="text-center text-sm text-accent">
              Message sent — thanks for reaching out.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
