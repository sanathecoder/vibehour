import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import API from "../api/axios";
import heroImg from "../assets/imge-watch.jpg"; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
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
    <MainLayout>
      {/* 2. Hero Section with Background Image */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="relative h-[70vh] flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }} // Apply the image
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content - Z-index so it sits above the overlay */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase mb-6">
            VibeHour
          </h1>
          <p className="text-gray-200 font-light tracking-[0.3em] uppercase text-sm md:text-base">
            Elegance Defined
          </p>
          <button className="mt-8 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-xs">
            Shop Collection
          </button>
        </div>
      </motion.section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-light tracking-wider uppercase text-gray-800 mb-12 text-center">
          Latest Timepieces
        </h2>

        {loading && <div className="flex justify-center py-12"><Loader /></div>}
        {error && <div className="text-center text-red-500 py-8">{error}</div>}

        {!loading && !error && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {products?.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </MainLayout>
  );
};

export default Home;