import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const About = () => {

    // Mouse ki position track karne ke liye
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth movement ke liye spring physics
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 10 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 10 });

  // Mouse ke coordinates ko rotation mein convert karna (-10deg se 10deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize values between -0.5 and 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-24 bg-emerald-50/30 ">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-emerald-800 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Our Philosophy
          </h3>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
            Time, Redefined for the <br /> Modern Icon.
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            At VibeHour, we believe that a watch is more than just an instrument to track time—
            it is a reflection of your personality and a testament to your journey. 
            We blend sophisticated design with precision engineering, ensuring that your 
            timepiece stands out whether you’re in a boardroom or at a gala.
          </p>
          
          <button className="border border-emerald-800 text-emerald-800 px-8 py-3 uppercase tracking-widest text-xs hover:bg-emerald-800 hover:text-white transition-all duration-300">
            Discover Our Story
          </button>
        </motion.div>

        {/* Right Side: Image Placeholder */}

<motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d", // 3D effect ke liye
      }}
      className="relative h-[500px] w-full perspective-1000"
    >
      <motion.img 
        src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000" 
        alt="Luxury Watch" 
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(50px)", // Image ko thora "bahar" laane ke liye
        }}
        className="w-full h-full object-cover shadow-2xl rounded-sm"
      />
      
      {/* Aesthetic accent box */}
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-100 -z-10"></div>
    </motion.div>

     
        
      </div>
    </section>
  );
};

export default About;