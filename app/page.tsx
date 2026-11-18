import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import SkillsCertifications from '@/components/sections/SkillsCertifications';
import ResumeRequest from '@/components/sections/ResumeRequest';
import Contact from '@/components/sections/Contact';
import Terminal from '@/components/ui/Terminal';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <SkillsCertifications />
        <ResumeRequest />
        <Contact />
      </main>
      <Footer />
      <Terminal />
    </>
  );
}