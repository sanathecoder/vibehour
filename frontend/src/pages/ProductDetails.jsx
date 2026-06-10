import { useEffect } from "react";
import { addToCart } from "../features/cart/cartSlice";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getSingleProduct,
} from "../features/products/productSlice";

import Loader from "../components/Loader";


const ProductDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    singleProduct,
    loading,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

const handleAddToCart = () => {
  dispatch(
    addToCart({
      product: singleProduct._id,
      quantity: 1,
    })
  );
};

  if (loading) {
    return <Loader />;
  }

  return (
    <MainLayout>

      {singleProduct && (

        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

          <img
            src={singleProduct.image}
            alt={singleProduct.title}
            className="w-full rounded-xl"
          />

          <div>

            <h1 className="text-5xl font-bold mb-6">
              {singleProduct.title}
            </h1>

            <p className="text-gray-600 mb-6">
              {singleProduct.description}
            </p>

            <p className="text-3xl font-semibold mb-6">
              ${singleProduct.price}
            </p>

            {/* FIXED BUTTON */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-3 rounded-lg"
            >
              Add To Cart
            </button>

          </div>

        </div>

      )}

    </MainLayout>
  );
};

export default ProductDetails;