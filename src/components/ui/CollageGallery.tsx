import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CollageGallery({ items }: { items: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // A pattern to create varied sizes for that true 'collage' look
  const getSpanClasses = (index: number) => {
    const patterns = [
      'md:col-span-2 md:row-span-2', // Large square
      'col-span-1 row-span-1',       // Small square
      'md:col-span-1 md:row-span-2', // Tall rectangle
      'col-span-1 row-span-1',       // Small square
      'md:col-span-2 md:row-span-1', // Wide rectangle
      'col-span-1 row-span-1',       // Small square
      'md:col-span-2 md:row-span-2', // Large square
      'md:col-span-1 md:row-span-2', // Tall rectangle
      'col-span-1 row-span-1',       // Small square
      'md:col-span-2 md:row-span-1', // Wide rectangle
      'col-span-1 row-span-1',       // Small square
      'col-span-1 row-span-1',       // Small square
    ];
    return patterns[index % patterns.length];
  };

  return (
    <>
      <motion.div 
        layout
        className="w-full max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 grid-flow-row-dense gap-4 auto-rows-[150px] md:auto-rows-[250px]"
      >
        {items.map((url, idx) => (
          <motion.div
            key={url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className={`relative overflow-hidden rounded-xl cursor-pointer group shadow-lg ${getSpanClasses(idx)}`}
            onClick={() => setSelectedImage(url)}
          >
            <img 
              src={url} 
              alt="Tile Concept" 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-serif tracking-widest text-sm uppercase">
                View Details
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
            
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
