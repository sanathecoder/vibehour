import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import API from "../api/axios"; // Hamara banaya hua custom Axios instance

const Home = () => {
  // Redux states ki jagah local clean states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Custom Axios call single-store products ke liye
        const res = await API.get("/products");
        setProducts(res.data.products);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load luxury collection");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section - Upgraded to Clean Luxury Aesthetic */}
      <section className="h-[60vh] flex flex-col items-center justify-center bg-gray-50 border-b border-gray-100">
        <h1 className="text-5xl md:text-6xl font-extralight tracking-widest uppercase text-gray-900 mb-4">
          VibeHour
        </h1>
        <p className="text-gray-400 font-light tracking-widest uppercase text-xs md:text-sm">
          Premium Luxury Collection
        </p>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-light tracking-wider uppercase text-gray-800 mb-12 text-center md:text-left">
          Latest Timepieces
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-sm font-light text-red-500 bg-red-50 inline-block px-6 py-2 rounded">
              {error}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

        {/* Empty Collection Fallback */}
        {!loading && !error && products?.length === 0 && (
          <p className="text-center text-gray-400 font-light py-12">
            No watches available in the collection right now.
          </p>
        )}
      </section>
    </MainLayout>
  );
};

export default Home;