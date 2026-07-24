import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Qualification from '@/components/Qualification';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TechStack />
      <Skills />
      <Projects />
      <Qualification />
      <Contact/>
    </main>
  );
}
