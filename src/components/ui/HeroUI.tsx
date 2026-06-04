import { useRef } from 'react';
import { View } from '@react-three/drei';
import HeroEnvironment from '../canvas/HeroEnvironment';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroUI() {
  const sectionRef = useRef<any>(null);
  const stickyRef = useRef<any>(null);

  // Hook into scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Fade out the main text as we scroll past 20%
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[300vh] bg-[#111111]"
    >
      <div ref={stickyRef} className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* 3D View container */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <View track={stickyRef} className="w-full h-full">
            <HeroEnvironment />
          </View>
        </div>
        
        {/* Animated Overlay Text */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center pointer-events-none"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-marble-light leading-tight drop-shadow-2xl max-w-5xl"
          >
            AASHISH ENTERPRISES
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-xl md:text-2xl text-marble-dark font-light max-w-2xl drop-shadow-lg uppercase tracking-[0.2em]"
          >
            The Living Tile Monument
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-6 pointer-events-auto"
          >
            <button className="px-10 py-4 bg-marble-light text-charcoal font-medium text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-500 rounded-sm shadow-xl">
              Explore Collections
            </button>
            <button className="px-10 py-4 border border-marble-dark text-marble-light font-medium text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-500 rounded-sm backdrop-blur-sm shadow-xl">
              Design Lab
            </button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none gap-2 text-marble-dark uppercase text-xs tracking-widest"
        >
          <span>Scroll to Discover</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-marble-dark to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
