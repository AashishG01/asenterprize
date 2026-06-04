import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-32 bg-marble-light text-charcoal flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-4xl"
      >
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.3em] mb-4 text-gold">
          Aashish Enterprises
        </h2>
        <h3 className="text-4xl md:text-5xl font-serif mb-12">
          आशीष एंटरप्राइजेज
        </h3>
        
        <p className="text-lg md:text-2xl font-light leading-relaxed mb-8 max-w-2xl mx-auto">
          Serving customers with premium tile solutions. We believe that every space deserves the touch of luxury and perfection that our curated tiles provide.
        </p>
        
        <div className="w-px h-16 bg-gold mx-auto"></div>
        
        <p className="mt-8 text-sm uppercase tracking-widest text-charcoal-light">
          Located in Belthara, Uttar Pradesh
        </p>
      </motion.div>
    </section>
  );
}
