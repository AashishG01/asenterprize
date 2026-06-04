export default function Footer() {
  return (
    <footer className="bg-charcoal text-marble-dark border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-serif text-gold mb-4">Aashish Enterprises</h4>
            <p className="font-light text-sm max-w-xs leading-relaxed">
              Premium tile showroom delivering luxury architectural solutions for modern spaces.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-serif text-white mb-4">Explore</h4>
            <ul className="space-y-2 font-light text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Virtual Gallery</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-serif text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all text-xs font-bold">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all text-xs font-bold">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all text-xs font-bold">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-charcoal hover:border-gold transition-all text-xs font-bold">
                LI
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-light tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Aashish Enterprises. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed for Luxury</p>
        </div>
      </div>
    </footer>
  );
}
