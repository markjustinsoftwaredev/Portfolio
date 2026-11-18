import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://engralzona.github.io/Portfolio'),
  title: {
    default: 'Mark Justin Alzona | Portfolio',
    template: '%s · Portfolio',
  },
  description:
    'Portfolio of a Software Developer & Project Leader specializing in scalable applications and offline-first architectures, with formal training in Cyber Threat Monitoring (TESDA / Radenta Academy).',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}