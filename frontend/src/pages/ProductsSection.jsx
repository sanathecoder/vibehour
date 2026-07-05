import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import API from "../api/axios";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get("/products");
        setProducts(res.data.products);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load collection");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-light tracking-wider uppercase text-gray-800 mb-12 text-center">
        Latest Timepieces
      </h2>

      {loading && <div className="flex justify-center py-12"><Loader /></div>}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}

      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
         <Swiper
  effect={"coverflow"}
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={"auto"}
  loop={true} // Infinite loop ke liye zaruri hai
  speed={3000} // Speed jitni zyada hogi, movement utni slow hogi (e.g., 3000ms)
  autoplay={{
    delay: 0, // Delay 0 matlab koi break nahi
    disableOnInteraction: false,
    pauseOnMouseEnter: true, // Jab mouse layein toh ruk jaye, best for UX
  }}
  coverflowEffect={{
    rotate: 30,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }}
  modules={[EffectCoverflow, Autoplay]} // Pagination hatayi taake clean lage
  className="mySwiper py-10"
>
  {products?.map((product) => (
    <SwiperSlide key={product._id} style={{ width: "300px" }}>
      <ProductCard product={product} />
    </SwiperSlide>
  ))}
</Swiper>
        </motion.div>
      )}
    </section>
  );
}

export default ProductSection;