import { useRef, useState, useEffect } from 'react';
import CollageGallery from './CollageGallery';
import { motion } from 'framer-motion';
// @ts-ignore
import manifest from '../../utils/manifest.json';

export type CategoryType = 'floors' | 'concepts' | 'walls' | 'parking';

export default function TileGalleryUI() {
  const container = useRef<any>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('concepts');
  const [currentPage, setCurrentPage] = useState(0);
  
  const itemsPerPage = 12;
  const items = manifest[activeCategory] || [];
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const handleNext = () => setCurrentPage((p) => (p + 1) % totalPages);
  const handlePrev = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);
  
  const currentItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <section 
      ref={container} 
      className="relative w-full min-h-screen py-32 text-charcoal flex flex-col items-center overflow-hidden"
    >
      <div className="container mx-auto px-6 mb-12 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-serif mb-12"
        >
          Curated Collections
        </motion.h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
          {(['concepts', 'floors', 'walls', 'parking'] as CategoryType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm md:text-base uppercase tracking-widest pb-2 transition-all duration-300 ${activeCategory === cat ? 'border-b-2 border-gold text-gold font-medium' : 'border-b-2 border-transparent text-charcoal-light hover:text-charcoal'}`}
            >
              {cat === 'concepts' ? 'Signature Concepts' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2D Masonry Collage */}
      <div className="w-full relative z-10 px-4 md:px-8">
        <CollageGallery items={currentItems} />
      </div>
      
      {/* Pagination Controls */}
      <div className="relative z-10 mt-8 flex items-center gap-8">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-colors"
        >
          &larr;
        </button>
        <div className="text-sm tracking-widest uppercase text-charcoal-light font-medium">
          Page {currentPage + 1} of {totalPages}
        </div>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-gold hover:text-white hover:border-gold transition-colors"
        >
          &rarr;
        </button>
      </div>
      
      <div className="mt-8 mb-8 text-xs uppercase tracking-widest text-charcoal-light/60">
        Click any tile to expand
      </div>
    </section>
  );
}
