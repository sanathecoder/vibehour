import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";

import {
  getProducts,
} from "../features/products/productSlice";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Home = () => {

  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
  } = useSelector(
    (state) => state.products
  );

  useEffect(() => {

    dispatch(getProducts());

  }, [dispatch]);

  return (
    <MainLayout>

      {/* Hero Section */}
      <section className="h-[60vh] flex flex-col items-center justify-center bg-gray-100">

        <h1 className="text-6xl font-bold mb-4">
          Luxury Watches
        </h1>

        <p className="text-gray-600 text-lg">
          Premium Collection
        </p>

      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold mb-10">
          Latest Watches
        </h2>

        {loading && <Loader />}

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      </section>

    </MainLayout>
  );
};

export default Home;