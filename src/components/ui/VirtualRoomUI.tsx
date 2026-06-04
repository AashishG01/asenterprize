import { useRef, useState, useEffect } from 'react';
import { View } from '@react-three/drei';
import VirtualRoom from '../canvas/VirtualRoom';

// @ts-ignore
import manifest from '../../utils/manifest.json';

export type RoomType = 'Living' | 'Bathroom' | 'Kitchen' | 'Commercial';
export type MoodType = 'Modern' | 'Luxury' | 'Minimal' | 'Classic';

export default function VirtualRoomUI() {
  const container = useRef<any>(null);
  
  // Extract unique concept prefixes from manifest
  const concepts = manifest.concepts;
  const prefixes = Array.from(new Set(concepts.map((c: string) => {
    const filename = c.split('/').pop()?.replace('.jpg', '') || '';
    return filename.split('-')[0];
  })));

  const floors = manifest.floors;

  const [activeRoom, setActiveRoom] = useState<RoomType>('Living');
  const [activeMood, setActiveMood] = useState<MoodType>('Luxury');
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
        room: activeRoom,
        mood: activeMood
      } 
    });
    window.dispatchEvent(event);
  }, [selectedFloor, selectedConcept, activeRoom, activeMood]);

  return (
    <section 
      ref={container} 
      className="relative w-full h-screen overflow-hidden flex flex-col font-sans"
    >
      {/* 3D Canvas Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <View track={container} className="w-full h-full">
          <VirtualRoom />
        </View>
      </div>

      {/* Top Header - Luxury Studio Style */}
      <div className="relative z-10 w-full p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto bg-black/40 backdrop-blur-xl px-8 py-5 rounded-sm border border-white/10 shadow-2xl">
          <h1 className="text-xl md:text-3xl font-serif text-marble-light uppercase tracking-widest leading-none">
            Aashish Enterprises
          </h1>
          <p className="text-[10px] text-gold uppercase tracking-[0.4em] mt-2">Design Studio</p>
        </div>
        
        <div className="hidden md:flex pointer-events-auto gap-4">
          <button className="px-8 py-3 bg-marble-light text-charcoal font-bold text-xs tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-500 rounded-sm shadow-xl">
            Save Design
          </button>
          <button className="px-8 py-3 bg-black/40 border border-marble-light/50 text-marble-light font-bold text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-500 rounded-sm backdrop-blur-xl shadow-xl">
            Get Quote
          </button>
        </div>
      </div>

      {/* Bottom Control Panel */}
      <div className="relative z-10 mt-auto w-full bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-16 pb-4 px-6 pointer-events-none">
        <div className="max-w-[1400px] mx-auto pointer-events-auto">
          
          <div className="flex flex-col md:flex-row gap-8 items-end">
            
            {/* Left Controls: Room & Mood */}
            <div className="w-full md:w-1/4 flex flex-col gap-4">
              
              <div>
                <p className="text-[10px] text-marble-dark uppercase tracking-[0.3em] mb-2">Room Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Living', 'Bathroom', 'Kitchen', 'Commercial'].map((room) => (
                    <button 
                      key={room}
                      onClick={() => setActiveRoom(room as RoomType)}
                      className={`py-2 text-[9px] font-bold uppercase tracking-widest border transition-all duration-500 rounded-sm shadow-lg ${activeRoom === room ? 'border-gold text-gold bg-gold/10' : 'border-white/10 text-marble-light bg-black/40 backdrop-blur-md hover:border-white/30'}`}
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Controls: Sliders */}
            <div className="w-full md:w-3/4 flex flex-col gap-4">
              
              {/* Floor Slider */}
              <div>
                <p className="text-[10px] text-marble-dark uppercase tracking-[0.3em] mb-2">Floor Collection</p>
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                  {floors.map((floor: string) => (
                    <button 
                      key={floor}
                      onClick={() => setSelectedFloor(floor)}
                      className={`flex-shrink-0 w-24 h-16 snap-start relative overflow-hidden rounded-sm border-2 transition-all duration-500 shadow-xl ${selectedFloor === floor ? 'border-gold scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] z-10' : 'border-transparent hover:border-white/30'}`}
                    >
                      <img src={floor} alt="Floor" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Wall Slider */}
              <div>
                <p className="text-[10px] text-marble-dark uppercase tracking-[0.3em] mb-2">Wall Collection</p>
                <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar">
                  {prefixes.map((concept: string) => {
                    const previewUrl = concepts.find((c: string) => c.includes(`${concept}-LT`)) || concepts.find((c: string) => c.includes(`${concept}-DK`)) || concepts.find((c: string) => c.includes(`${concept}`));
                    return (
                      <button 
                        key={concept}
                        onClick={() => setSelectedConcept(concept)}
                        className={`flex-shrink-0 w-16 h-24 snap-start relative overflow-hidden rounded-sm border-2 transition-all duration-500 shadow-xl ${selectedConcept === concept ? 'border-gold scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] z-10' : 'border-transparent hover:border-white/30'}`}
                      >
                        <img src={previewUrl} alt="Wall" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center pb-2 opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-[8px] font-bold text-marble-light uppercase tracking-widest">{concept}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
