import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Software Developer & Project Leader | Certified in Cyber Threat Monitoring',
    template: '%s · Portfolio',
  },
  description:
    'Portfolio of a Software Developer & Project Leader specializing in scalable applications and offline-first architectures, with formal training in Cyber Threat Monitoring (TESDA / Radenta Academy).',
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    jobTitle: 'Software Developer & Project Leader',
    knowsAbout: [
      'Software Development',
      'Project Leadership',
      'Cyber Threat Monitoring',
      'DevSecOps',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sans.variable} ${mono.variable} bg-bg font-sans text-slate-200 antialiased`}>
        {children}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
