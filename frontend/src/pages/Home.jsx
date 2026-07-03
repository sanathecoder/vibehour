import React from 'react'
import { motion, useScroll, useTransform } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import heroImg from "../assets/imge-watch.jpg";
import About from "./About";
import ProductSection from "./ProductSection";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api/axios";
import { useNavigate } from 'react-router-dom';





const Home = () => {

    const Navigate = useNavigate()
    const { scrollYProgress } = useScroll();
  // Jab scroll hoga, about section thoda chota (scale) hoga
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]); 
  // const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

 

  return (
    <MainLayout>
  {/* 1. Hero Section */}
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative h-[70vh] flex flex-col items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: `url(${heroImg})` }}
  >
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 text-center text-white">
      <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase mb-6">VibeHour</h1>
      <p className="text-gray-200 font-light tracking-[0.3em] uppercase text-sm md:text-base">Elegance Defined</p>
      <button onClick={()=>Navigate('/shop')} className="mt-8 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs">Shop Collection</button>
    </div>
  </motion.section>

  {/* 2. About Section (Sticky Layer) */}
  <motion.div 
        style={{ scale }} 
        className="sticky top-0 h-screen z-10"
      >
        <About />
      </motion.div>

      {/* 3. Products Section (This will scroll OVER the About section) */}
  {/* IMPORTANT: Removed h-screen and sticky here */}
 <motion.div 
  initial={{ y: 200, opacity: 0 }} // Shuru mein niche hoga aur invisible
  whileInView={{ y: 0, opacity: 1 }} // Jab scroll ho to upar aayega aur visible ho jayega
  transition={{ 
    duration: 1, 
    ease: [0.22, 1, 0.36, 1] // Ye "smooth slide" ke liye best easing hai
  }}
  className="relative z-20 bg-white shadow-[-10px_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[50px] pt-10"
>
  <ProductSection/>
</motion.div>
  


</MainLayout>
  );
};

export default Home;