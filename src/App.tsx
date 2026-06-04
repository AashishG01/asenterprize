import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Scene from './components/canvas/Scene';
import HeroUI from './components/ui/HeroUI';
import About from './components/ui/About';
import Statistics from './components/ui/Statistics';
import Showcase from './components/ui/Showcase';
import Contact from './components/ui/Contact';
import Footer from './components/ui/Footer';
import TileGalleryUI from './components/ui/TileGalleryUI';
import VirtualRoomUI from './components/ui/VirtualRoomUI';

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full bg-charcoal text-marble-light font-sans selection:bg-gold selection:text-charcoal overflow-x-hidden">
      {/* 3D Canvas Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* HTML Overlay Layer */}
      <main className="relative z-10">
        <HeroUI />
        <TileGalleryUI />
        <VirtualRoomUI />
        <Statistics />
        <Showcase />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
