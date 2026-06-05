import { useRef, useState, useEffect } from 'react';
import { View } from '@react-three/drei';
import VirtualRoom from '../canvas/VirtualRoom';
// @ts-ignore
import manifest from '../../utils/manifest.json';

export default function VirtualRoomUI() {
  const viewRef = useRef<any>(null);
  
  const concepts = manifest.concepts;
  const prefixes = Array.from(new Set(concepts.map((c: string) => c.split('-')[0])));
  const floors = manifest.floors;

  // Combine into one tile inventory
  const wallTiles = prefixes.map((prefix: string) => {
    return concepts.find((c: string) => c.includes(prefix + '-LT.jpg')) 
      || concepts.find((c: string) => c.includes(prefix + '-DK.jpg'))
      || concepts.find((c: string) => c.includes(prefix));
  });

  const allTiles = [...floors, ...wallTiles].filter(Boolean) as string[];

  const [selectedTile, setSelectedTile] = useState<string>(allTiles[0] || "");

  // Sync state with 3D Canvas via CustomEvent
  useEffect(() => {
    const event = new CustomEvent('update-virtual-room', { 
      detail: { wall: selectedTile } 
    });
    window.dispatchEvent(event);
  }, [selectedTile]);

  const formatName = (str: string) => str.split('/').pop()?.replace('.jpg', '').replace(/-/g, ' ') || 'Luxury Tile';

  // Determine tile size label based on path
  const getTileSize = (url: string) => {
    if (url.includes('/floors/')) return '600 × 1200 mm  ·  Floor Tile';
    return '300 × 450 mm  ·  Wall Tile';
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col font-sans">
      
      {/* TOP BAR: Logo left, Tile Info right */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-6 md:px-10 pt-5 pointer-events-none">
        
        {/* Logo */}
        <div className="pointer-events-auto bg-black/50 backdrop-blur-xl px-6 py-4 rounded-sm border border-white/10 shadow-2xl">
          <h1 className="text-lg md:text-xl font-serif text-marble-light uppercase tracking-widest leading-none">
            Aashish Enterprises
          </h1>
          <p className="text-[9px] text-gold uppercase tracking-[0.4em] mt-1.5">Interior Visualization Studio</p>
        </div>

        {/* Tile Info Card */}
        <div className="pointer-events-auto bg-black/50 backdrop-blur-xl px-5 py-4 rounded-sm border border-white/10 shadow-2xl min-w-[220px]">
          <h3 className="text-[10px] text-gold uppercase tracking-[0.3em] border-b border-white/10 pb-2 mb-3">Material Inspection</h3>
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-marble-dark uppercase tracking-wider">Tile</span>
              <span className="text-[10px] text-marble-light font-bold truncate max-w-[120px]">{formatName(selectedTile)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-marble-dark uppercase tracking-wider">Size</span>
              <span className="text-[10px] text-marble-light">{getTileSize(selectedTile)}</span>
            </div>
            <div className="flex justify-between items-center mt-1 pt-1.5 border-t border-white/5">
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

      {/* CENTER: 3D Canvas - tile display takes most of the screen */}
      <div ref={viewRef} className="flex-1 w-full relative z-0 pointer-events-auto">
        <View track={viewRef} className="w-full h-full">
          <VirtualRoom />
        </View>
      </div>

      {/* BOTTOM STRIP: Tile Thumbnails */}
      <div className="w-full bg-black/80 backdrop-blur-lg relative z-10 border-t border-white/10 py-3 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-marble-dark uppercase tracking-[0.2em] shrink-0 hidden md:block">Tile Collection</span>
          <div className="flex-1 overflow-x-auto flex gap-3 scrollbar-hide snap-x px-1">
            {allTiles.map((url: string, i: number) => (
              <button 
                key={i}
                onClick={() => setSelectedTile(url)}
                className={`shrink-0 snap-start relative group transition-all duration-300 rounded-sm overflow-hidden ${
                  selectedTile === url 
                    ? 'ring-2 ring-gold ring-offset-2 ring-offset-black scale-105 shadow-xl shadow-gold/20 z-10' 
                    : 'hover:ring-1 hover:ring-white/30 opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img src={url} alt={`Tile ${i}`} className="h-16 md:h-20 w-auto object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
