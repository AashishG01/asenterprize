import { useRef } from 'react';
import { View } from '@react-three/drei';
import HeroEnvironment from '../canvas/HeroEnvironment';
import { motion } from 'framer-motion';

export default function HeroUI() {
  const container = useRef<any>(null);

  return (
    <section 
      ref={container} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D View container (position absolute to fill section, but behind text) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <View track={container} className="w-full h-full">
          <HeroEnvironment />
        </View>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-32 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-marble-light leading-tight drop-shadow-2xl max-w-5xl"
        >
          Transform Spaces With Premium Tiles
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-xl md:text-2xl text-marble-dark font-light max-w-2xl drop-shadow-lg uppercase tracking-[0.2em]"
        >
          Luxury Floor & Wall Tile Solutions
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row gap-6 pointer-events-auto"
        >
          <button className="px-10 py-4 bg-marble-light text-charcoal font-medium text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-500 rounded-sm">
            Visit Showroom
          </button>
          <button className="px-10 py-4 border border-marble-dark text-marble-light font-medium text-sm tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-500 rounded-sm backdrop-blur-sm">
            Call Now
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none gap-2 text-marble-dark uppercase text-xs tracking-widest"
      >
        <span>Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-marble-dark to-transparent"></div>
      </motion.div>
    </section>
  );
}
