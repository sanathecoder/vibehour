import React from 'react'
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";



import API from "../api/axios";

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
  )
}

export default ProductSection
