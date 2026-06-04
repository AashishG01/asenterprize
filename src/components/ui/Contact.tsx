import { useRef } from 'react';
import { View } from '@react-three/drei';
import MapMarker from '../canvas/MapMarker';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const markerContainer = useRef<any>(null);

  return (
    <section className="relative py-32 bg-charcoal text-marble-light overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="flex-1 md:pr-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-8 text-gold"
          >
            Visit Our Showroom
          </motion.h2>
          
          <div className="space-y-8 text-lg font-light">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4"
            >
              <MapPin className="text-gold mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-medium text-white text-xl mb-1">Aashish Enterprises</p>
                <p className="text-marble-dark">Near DN Surya Hospital, Ubhav Main Road Chaukia,<br/>Belthara, Uttar Pradesh 221715</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <Phone className="text-gold flex-shrink-0" size={24} />
              <p className="text-xl">+91 99186 94803</p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="tel:+919918694803"
              className="px-8 py-4 bg-gold text-charcoal font-medium tracking-widest uppercase hover:bg-white transition-colors text-center text-sm"
            >
              Call Now
            </a>
            <a 
              href="https://maps.google.com/?q=26.124880839069952,83.86562430937772"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 border border-gold text-gold font-medium tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-colors text-center text-sm"
            >
              Google Maps
            </a>
          </motion.div>
        </div>
        
        {/* 3D Map Marker Visual */}
        <div 
          ref={markerContainer}
          className="flex-1 w-full h-[400px] relative pointer-events-none"
        >
          <View track={markerContainer} className="w-full h-full pointer-events-auto">
            <MapMarker />
          </View>
        </div>
        
      </div>
    </section>
  );
}
