import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import API from "../api/axios";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get(
          `products?page=${currentPage}&limit=12`
        );

        setProducts(res.data.products);
        setTotalPages(res.data.totalPage);
        setProducts(res.data.products);
      } catch (err) {
        setError("Unable to load products at this moment.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [currentPage]);

  return (
    <MainLayout>
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-light uppercase tracking-widest text-center mb-16">
          The Full Collection
        </h1>

        {loading && <div className="flex justify-center py-20"><Loader /></div>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        {!loading && totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-black hover:text-white transition"
    >
      Previous
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-4 py-2 border rounded transition ${
          currentPage === index + 1
            ? "bg-black text-white"
            : "hover:bg-gray-100"
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
      className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-black hover:text-white transition"
    >
      Next
    </button>

  </div>
)}
      </div>
    </MainLayout>
  );
};

export default Shop;