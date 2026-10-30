import { headers } from 'next/headers';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import SkillsCertifications from '@/components/sections/SkillsCertifications';
import ResumeRequest from '@/components/sections/ResumeRequest';
import Contact from '@/components/sections/Contact';
import Terminal from '@/components/ui/Terminal';

export default async function Home() {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <SkillsCertifications />
        <ResumeRequest nonce={nonce} />
        <Contact nonce={nonce} />
      </main>
      <Footer />
      <Terminal />
    </>
  );
}
