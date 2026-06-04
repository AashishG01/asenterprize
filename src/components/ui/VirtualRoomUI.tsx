import { useRef, useState, useEffect } from 'react';
import { View } from '@react-three/drei';
import VirtualRoom from '../canvas/VirtualRoom';
// @ts-ignore
import manifest from '../../utils/manifest.json';

export type RoomType = 'Living' | 'Bathroom' | 'Kitchen' | 'Commercial' | 'Patio';

export default function VirtualRoomUI() {
  const viewRef = useRef<any>(null);
  
  // Extract unique concept prefixes from manifest
  const concepts = manifest.concepts;
  const prefixes = Array.from(new Set(concepts.map((c: string) => {
    const filename = c.split('/').pop()?.replace('.jpg', '') || '';
    return filename.split('-')[0];
  })));

  const floors = manifest.floors;

  const [activeRoom, setActiveRoom] = useState<RoomType>('Living');
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
        hl: validHL,
        room: activeRoom
      } 
    });
    window.dispatchEvent(event);
  }, [selectedFloor, selectedConcept, activeRoom]);

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
        <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row gap-8 items-center h-full">
            
          {/* Left Controls: Room */}
          <div className="w-full md:w-1/5 flex flex-col h-full justify-center">
            <p className="text-[10px] text-marble-dark uppercase tracking-[0.3em] mb-4">Architecture</p>
            <div className="flex flex-col gap-2">
              {['Living', 'Bathroom', 'Kitchen', 'Commercial', 'Patio'].map((room) => (
                <button 
                  key={room}
                  onClick={() => setActiveRoom(room as RoomType)}
                  className={`py-2 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 rounded-sm ${activeRoom === room ? 'border-gold text-gold bg-gold/10' : 'border-white/5 text-marble-light bg-[#111] hover:border-white/20'}`}
                >
                  {room === 'Commercial' ? 'Lobby' : room}
                </button>
              ))}
            </div>
          </div>

          {/* Right Controls: Sliders */}
          <div className="w-full md:w-4/5 flex flex-col gap-6 h-full justify-center">
            
            {/* Floor Slider */}
            <div>
              <p className="text-[10px] text-marble-dark uppercase tracking-[0.3em] mb-3">Floor Surface (600x1200)</p>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar items-center">
                {floors.map((floor: string) => (
                  <button 
                    key={floor}
                    onClick={() => setSelectedFloor(floor)}
                    className={`flex-shrink-0 w-32 h-20 md:w-40 md:h-24 snap-start relative overflow-hidden rounded-sm border-2 transition-all duration-300 shadow-xl ${selectedFloor === floor ? 'border-gold scale-105 shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-transparent hover:border-white/30'}`}
                  >
                    <img src={floor} alt="Floor" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Wall Slider */}
            <div>
              <p className="text-[10px] text-marble-dark uppercase tracking-[0.3em] mb-3">Feature Wall (300x450)</p>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar items-center">
                {prefixes.map((concept: string) => {
                  const previewUrl = concepts.find((c: string) => c.includes(`${concept}-LT`)) || concepts.find((c: string) => c.includes(`${concept}-DK`)) || concepts.find((c: string) => c.includes(`${concept}`));
                  return (
                    <button 
                      key={concept}
                      onClick={() => setSelectedConcept(concept)}
                      className={`flex-shrink-0 w-20 h-28 md:w-24 md:h-32 snap-start relative overflow-hidden rounded-sm border-2 transition-all duration-300 shadow-xl ${selectedConcept === concept ? 'border-gold scale-105 shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-transparent hover:border-white/30'}`}
                    >
                      <img src={previewUrl} alt="Wall" className="w-full h-full object-cover" />
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
