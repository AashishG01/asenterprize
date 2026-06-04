import { useRef, useState, useEffect } from 'react';
import { View } from '@react-three/drei';
import VirtualRoom from '../canvas/VirtualRoom';
// @ts-ignore
import manifest from '../../utils/manifest.json';

export default function VirtualRoomUI() {
  const viewRef = useRef<any>(null);
  
  // Extract unique concept prefixes from manifest
  const concepts = manifest.concepts;
  const prefixes = Array.from(new Set(concepts.map((c: string) => c.split('-')[0])));

  const floors = manifest.floors;

  const [selectedFloor, setSelectedFloor] = useState<string>(floors[0]);
  const [selectedConcept, setSelectedConcept] = useState<string>(prefixes.includes('10370') ? '10370' : prefixes[0]);

  // Sync state with 3D Canvas via CustomEvent
  useEffect(() => {
    const validLT = concepts.find((c: string) => c.includes(`${selectedConcept}-LT`)) || concepts.find((c: string) => c.includes(`${selectedConcept}`));
    const validDK = concepts.find((c: string) => c.includes(`${selectedConcept}-DK`)) || validLT;
    const validHL = concepts.find((c: string) => c.includes(`${selectedConcept}-HL`)) || validLT;

    const event = new CustomEvent('update-virtual-room', { 
      detail: { 
        floor: selectedFloor, 
        lt: validLT,
        dk: validDK,
        hl: validHL
      } 
    });
    window.dispatchEvent(event);
  }, [selectedFloor, selectedConcept]);

  const formatName = (str: string) => str.split('/').pop()?.replace('.jpg', '').replace(/-/g, ' ') || 'Luxury Tile';

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col font-sans">
      
      {/* TOP 70%: 3D Canvas Dedicated Space (Zero UI Overlap with Floor) */}
      <div ref={viewRef} className="w-full h-[70vh] relative z-0 pointer-events-auto cursor-grab active:cursor-grabbing border-b border-white/10">
        <View track={viewRef} className="w-full h-full">
          <VirtualRoom />
        </View>

        {/* Floating Brand Header */}
        <div className="absolute top-6 left-6 z-10 pointer-events-auto bg-black/40 backdrop-blur-xl px-6 py-4 rounded-sm border border-white/10 shadow-2xl">
          <h1 className="text-xl md:text-2xl font-serif text-marble-light uppercase tracking-widest leading-none">
            Aashish Enterprises
          </h1>
          <p className="text-[9px] text-gold uppercase tracking-[0.4em] mt-2">Interior Visualization Studio</p>
        </div>

        {/* Material Inspection Panel */}
        <div className="absolute bottom-6 right-6 z-10 pointer-events-auto bg-black/80 backdrop-blur-xl px-5 py-4 rounded-sm border border-white/10 shadow-2xl min-w-[240px]">
          <h3 className="text-[10px] text-gold uppercase tracking-[0.3em] border-b border-white/10 pb-2 mb-3">Material Inspection</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-marble-dark uppercase tracking-wider">Floor</span>
              <span className="text-[10px] text-marble-light font-bold truncate max-w-[120px]">{formatName(selectedFloor)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-marble-dark uppercase tracking-wider">Wall</span>
              <span className="text-[10px] text-marble-light font-bold truncate max-w-[120px]">{selectedConcept} Series</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
              <span className="text-[10px] text-marble-dark uppercase tracking-wider">Finish</span>
              <span className="text-[10px] text-marble-light">Premium Satin</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-marble-dark uppercase tracking-wider">Material</span>
              <span className="text-[10px] text-marble-light">Vitrified Porcelain</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM 30%: Control Panel */}
      <div className="w-full h-[30vh] bg-[#0a0a0a] relative z-10 p-6 flex flex-col justify-center">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full justify-center gap-6">
            
          {/* Right Controls: Tile Collections (Now Full Width) */}
          <div className="w-full flex flex-col gap-6">
            
            {/* Floors */}
            <div>
              <p className="text-[10px] text-marble-dark uppercase tracking-[0.3em] mb-3">Floor Surface (600x1200)</p>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {floors.map((url: string, i: number) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedFloor(url)}
                    className={`shrink-0 snap-start relative group transition-all duration-300 ${selectedFloor === url ? 'ring-1 ring-gold ring-offset-2 ring-offset-black scale-105 shadow-2xl z-10' : 'hover:ring-1 hover:ring-white/30 hover:scale-105 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={url} alt={`Floor ${i}`} className="h-24 w-auto object-cover rounded-sm" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors pointer-events-none" />
                  </button>
                ))}
              </div>
            </div>

            {/* Walls */}
            <div>
              <p className="text-[10px] text-marble-dark uppercase tracking-[0.3em] mb-3">Feature Wall (300x450)</p>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {prefixes.map((prefix: string, i: number) => {
                  const representativeImg = concepts.find((c: string) => c.includes(prefix + '-LT.jpg')) 
                    || concepts.find((c: string) => c.includes(prefix + '-DK.jpg'))
                    || concepts.find((c: string) => c.includes(prefix));
                  
                  return (
                    <button 
                      key={i}
                      onClick={() => setSelectedConcept(prefix)}
                      className={`shrink-0 snap-start relative group transition-all duration-300 ${selectedConcept === prefix ? 'ring-1 ring-gold ring-offset-2 ring-offset-black scale-105 shadow-2xl z-10' : 'hover:ring-1 hover:ring-white/30 hover:scale-105 opacity-60 hover:opacity-100'}`}
                    >
                      <img src={representativeImg} alt={`Wall ${prefix}`} className="h-28 w-auto object-cover rounded-sm" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors pointer-events-none" />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
