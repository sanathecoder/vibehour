import React from 'react';
import { motion } from 'framer-motion';
import AboutImage from '../assets/bg-about.png';

const About = () => {
  return (
    <section className="py-24 bg-emerald-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* ... aapka text content waisa hi rahega ... */}
          <h3 className="text-emerald-800 text-sm tracking-[0.3em] uppercase mb-4 font-medium">Our Philosophy</h3>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">Time, Redefined for the <br /> Modern Icon.</h1>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            At VibeHour, we believe that a watch is more than just an instrument to track time—
            it is a reflection of your personality and a testament to your journey.
          </p>
          <button className="border border-emerald-800 text-emerald-800 px-8 py-3 uppercase tracking-widest text-xs hover:bg-emerald-800 hover:text-white transition-all duration-500">
            Discover Our Story
          </button>
        </motion.div>

        {/* Right Side: Professional Reveal Animation */}
        <div className="relative h-[500px] w-full">
          <motion.div
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative"
          >
            <motion.img 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={AboutImage} 
              alt="Luxury Watch" 
              className="w-fit h-full object-cover rounded-sm "
            />
          </motion.div>
          
          {/* Decorative box - isay bhi subtle entry dein */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-100 -z-10"
          ></motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default About;