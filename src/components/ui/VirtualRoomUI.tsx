import { useRef, useState, useEffect } from 'react';
import { View } from '@react-three/drei';
import VirtualRoom from '../canvas/VirtualRoom';
import { motion } from 'framer-motion';
// @ts-ignore
import manifest from '../../utils/manifest.json';

export default function VirtualRoomUI() {
  const container = useRef<any>(null);
  
  // Extract unique concept prefixes from manifest
  const concepts = manifest.concepts;
  const prefixes = Array.from(new Set(concepts.map((c: string) => {
    const filename = c.split('/').pop()?.replace('.jpg', '') || '';
    return filename.split('-')[0];
  })));

  const [activeFloorPage, setActiveFloorPage] = useState(0);
  const [activeConceptPage, setActiveConceptPage] = useState(0);
  
  const floors = manifest.floors;
  const floorsPerPage = 5;
  const conceptsPerPage = 5;

  const currentFloors = floors.slice(activeFloorPage * floorsPerPage, (activeFloorPage + 1) * floorsPerPage);
  const currentConcepts = prefixes.slice(activeConceptPage * conceptsPerPage, (activeConceptPage + 1) * conceptsPerPage);

  const [selectedFloor, setSelectedFloor] = useState<string>(floors[0]);
  const [selectedConcept, setSelectedConcept] = useState<string>(prefixes.includes('10370') ? '10370' : prefixes[0]);
  
  useEffect(() => {
    const event = new CustomEvent('update-virtual-room', { 
      detail: { floor: selectedFloor, concept: selectedConcept } 
    });
    window.dispatchEvent(event);
  }, [selectedFloor, selectedConcept]);

  return (
    <section 
      ref={container} 
      className="relative w-full min-h-screen py-32 text-marble-light flex flex-col md:flex-row items-center overflow-hidden"
    >
      {/* 3D Canvas View on the left/top */}
      <div className="w-full md:w-2/3 h-[50vh] md:h-screen relative z-0 pointer-events-auto cursor-grab active:cursor-grabbing">
        <View track={container} className="w-full h-full">
          <VirtualRoom />
        </View>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/50 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
          Drag to look around
        </div>
      </div>

      {/* Controls on the right/bottom */}
      <div className="w-full md:w-1/3 h-[50vh] md:h-screen bg-charcoal-light/50 backdrop-blur-lg border-l border-white/10 p-8 flex flex-col justify-center overflow-y-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-2 text-gold">Experience Center</h2>
          <p className="text-sm text-marble-dark mb-10">Select premium floors and signature wall concepts to visualize your space.</p>
          
          {/* Floor Selection */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <h3 className="uppercase tracking-widest text-sm font-medium border-b border-gold/30 pb-2 flex-grow">1. Select Floor</h3>
              <div className="flex gap-2 ml-4">
                <button onClick={() => setActiveFloorPage(p => Math.max(0, p - 1))} className="text-xl px-2 opacity-50 hover:opacity-100">&larr;</button>
                <button onClick={() => setActiveFloorPage(p => Math.min(Math.floor(floors.length/floorsPerPage), p + 1))} className="text-xl px-2 opacity-50 hover:opacity-100">&rarr;</button>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {currentFloors.map((floor: string) => {
                const isSelected = selectedFloor === floor;
                return (
                  <button 
                    key={floor}
                    onClick={() => setSelectedFloor(floor)}
                    className={`aspect-square relative overflow-hidden border-2 transition-all duration-300 ${isSelected ? 'border-gold scale-105' : 'border-transparent hover:border-white/20'}`}
                  >
                    <img src={floor} alt="Floor preview" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wall Concept Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-4">
              <h3 className="uppercase tracking-widest text-sm font-medium border-b border-gold/30 pb-2 flex-grow">2. Select Wall Concept</h3>
              <div className="flex gap-2 ml-4">
                <button onClick={() => setActiveConceptPage(p => Math.max(0, p - 1))} className="text-xl px-2 opacity-50 hover:opacity-100">&larr;</button>
                <button onClick={() => setActiveConceptPage(p => Math.min(Math.floor(prefixes.length/conceptsPerPage), p + 1))} className="text-xl px-2 opacity-50 hover:opacity-100">&rarr;</button>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {currentConcepts.map((concept: string) => {
                const isSelected = selectedConcept === concept;
                // Preview using LT or DK if available
                const previewUrl = concepts.find((c: string) => c.includes(`${concept}-LT`)) || concepts.find((c: string) => c.includes(`${concept}-DK`)) || concepts.find((c: string) => c.includes(`${concept}`));
                return (
                  <button 
                    key={concept}
                    onClick={() => setSelectedConcept(concept)}
                    className={`aspect-[2/3] relative overflow-hidden border-2 transition-all duration-300 ${isSelected ? 'border-gold scale-105' : 'border-transparent hover:border-white/20'}`}
                  >
                    <img src={previewUrl} alt="Concept preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold tracking-wider">{concept}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 p-4 bg-charcoal/50 border border-white/5 rounded-lg">
             <p className="text-xs text-marble-dark">Wall Concepts automatically map Dark (DK), Highlighter (HL), and Light (LT) tiles to create a perfect luxury composition.</p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
