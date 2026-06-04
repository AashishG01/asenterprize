import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const showcases = [
  { title: 'Luxury Living Room', image: '/textures/walls/wall-5.jpg' },
  { title: 'Modern Bathroom', image: '/textures/walls/wall-10.jpg' },
  { title: 'Premium Kitchen', image: '/textures/concepts/10779-KT-1-copy.jpg' },
  { title: 'Commercial Spaces', image: '/textures/parking/parking-2.jpg' },
];

export default function Showcase() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section ref={container} className="w-full bg-charcoal">
      {showcases.map((showcase, index) => {
        const itemRef = useRef<HTMLDivElement>(null);
        const { scrollYProgress } = useScroll({
          target: itemRef,
          offset: ["start end", "end start"]
        });
        
        // Parallax effect on the image
        const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
        
        return (
          <div key={index} ref={itemRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            <motion.div 
              style={{ y }} 
              className="absolute inset-0 w-full h-[140%] -top-[20%] z-0"
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${showcase.image}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
            
            <div className="relative z-10 text-center">
              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-serif text-white uppercase tracking-widest drop-shadow-xl"
              >
                {showcase.title}
              </motion.h3>
            </div>
          </div>
        );
      })}
    </section>
  );
}
