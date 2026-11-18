'use client';

import { Mail } from 'lucide-react';
import { useState } from 'react';

// The address is never written into the server-rendered HTML as plain text —
// it's assembled client-side from parts that only combine into a valid
// address once a person actually clicks. This stops the simplest class of
// mailto-scraping bots that regex the initial HTML response without
// executing JavaScript.
const USER = ['markjustinsoftwaredev'];
const DOMAIN = ['gmail', 'com'];

export default function ObfuscatedEmail() {
  const [revealed, setRevealed] = useState<string | null>(null);

  function reveal() {
    const address = `${USER.join('.')}@${DOMAIN.join('.')}`;
    setRevealed(address);
    window.location.href = `mailto:${address}`;
  }

  return (
    <button
      onClick={reveal}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-accent/50 hover:text-accent"
    >
      <Mail size={16} />
      {revealed ?? 'Reveal email address'}
    </button>
  );
}
