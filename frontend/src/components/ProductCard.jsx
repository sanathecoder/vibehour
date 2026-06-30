import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    // 1. Perspective container: Isse 3D depth milti hai
    <div className="group h-[400px] w-full [perspective:1000px]">
      
      {/* 2. The Flipping Container */}
      <motion.div
        whileHover={{ rotateY: 180, rotateX: 5 }} // 3D Tilt + Flip
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d]"
      >
        
        {/* FRONT FACE (Image Side) */}
        <div className="absolute inset-0 [backface-visibility:hidden] border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
            <h2 className="font-light tracking-widest">{product.title}</h2>
          </div>
        </div>

        {/* BACK FACE (Details Side) */}
        <div className="absolute inset-0 h-full w-full bg-white p-8 [backface-visibility:hidden] [transform:rotateY(180deg)] border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl">
          <h2 className="text-xl font-light uppercase tracking-widest mb-4">
            {product.title}
          </h2>
          <p className="text-gray-500 font-light mb-6">
            Luxury craftsmanship for the modern era.
          </p>
          <p className="text-xl font-bold mb-8">${product.price}</p>
          
          <Link
            to={`/product/${product._id}`}
            className="bg-black text-white px-8 py-3 rounded-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default ProductCard;