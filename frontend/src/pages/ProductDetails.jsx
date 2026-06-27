import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Context for Cart
  const { addToCart } = useCart();

  // Local States ki madad se Redux ko replace kiya
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Button feedback state
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Direct backend call without Redux
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        // Ensure you match this with your backend response structure (e.g., response.data.product)
        setProduct(response.data?.product || response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      // CartContext function calling
      await addToCart(product._id, 1); 
      setAdded(true);
      
      // 2 seconds baad button wapas normal state me
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setIsAdding(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
           <Loader /> 
        </div>
      </MainLayout>
    );
  }

  // Error State
  if (error) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <p className="text-red-500 font-light text-sm">{error}</p>
          <button onClick={() => navigate("/")} className="text-xs uppercase tracking-widest underline">
            Return to Collection
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {product && (
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* PRODUCT IMAGE */}
            <div className="bg-gray-50 p-8 flex justify-center items-center rounded-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-md object-contain mix-blend-multiply"
              />
            </div>

            {/* PRODUCT INFO */}
            <div className="flex flex-col">
              
              {/* Category / Brand tags if you have them, else static */}
              <span className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4">
                {product.brand || "Exclusive Collection"}
              </span>

              <h1 className="text-4xl font-light text-gray-900 mb-6 uppercase tracking-wider">
                {product.title}
              </h1>
              
              <p className="text-2xl font-normal text-black mb-8">
                ${product.price}
              </p>

              <div className="w-full h-px bg-gray-100 mb-8"></div>

              <p className="text-sm font-light leading-relaxed text-gray-500 mb-10">
                {product.description}
              </p>

              {/* ACTION BUTTON */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full md:w-auto px-10 py-4 text-xs font-medium uppercase tracking-widest transition-colors rounded-sm
                  ${added 
                    ? 'bg-green-600 text-white border border-green-600' 
                    : 'bg-black text-white hover:bg-gray-900'
                  } 
                  ${isAdding ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {isAdding ? "Adding..." : added ? "Added to Cart ✓" : "Add To Cart"}
              </button>

            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ProductDetails;