import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: 'Premium', label: 'Collection' },
  { value: 'Latest', label: 'Designs' },
  { value: 'Expert', label: 'Guidance' },
  { value: 'Reliable', label: 'Delivery' }
];

export default function Statistics() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "center center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={container} className="py-32 bg-marble-light text-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            style={{ y, opacity }}
            className="text-4xl md:text-5xl font-serif mb-4 text-charcoal"
          >
            Why Choose Aashish Enterprises
          </motion.h2>
          <div className="w-24 h-[1px] bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 group"
            >
              <div className="text-3xl md:text-4xl font-serif text-charcoal transition-colors duration-500 group-hover:text-gold">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-charcoal-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
