import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-semibold">
          {product.title}
        </h2>

        <p className="text-gray-500 mt-2">
          ${product.price}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="mt-4 inline-block bg-black text-white px-4 py-2 rounded"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;