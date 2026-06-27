import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MainLayout from "../layouts/MainLayout";

const Cart = () => {
  // Redux ki jagah Context ka use
  const { cart, removeFromCart } = useCart();

  // Cart mein majood products ki array
  const cartItems = cart?.products || [];

  // Total price calculate karna
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  // Agar cart khali ho toh yeh minimalist empty state show hoga
  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
          <h1 className="text-2xl font-light tracking-widest uppercase mb-6 text-gray-900">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-gray-500 mb-8 font-light">
            You haven't added any luxury timepieces yet.
          </p>
          <Link
            to="/"
            className="bg-black text-white px-8 py-3 text-xs font-medium uppercase tracking-widest hover:bg-gray-900 transition-colors rounded-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-light tracking-widest uppercase mb-12 text-gray-900">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDE: Cart Items List */}
          <div className="lg:col-span-8">
            <div className="border-t border-gray-200">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex py-6 border-b border-gray-200 items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-sm">
                      <img
                        src={item.product?.image}
                        alt={item.product?.title}
                        className="w-16 h-16 object-contain mix-blend-multiply"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div>
                      <Link 
                        to={`/product/${item.product?._id}`} 
                        className="text-lg font-normal text-gray-900 hover:text-gray-600 transition-colors"
                      >
                        {item.product?.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1 font-light">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Price & Remove Action */}
                  <div className="text-right">
                    <p className="text-lg font-normal text-gray-900 mb-2">
                      ${(item.product?.price * item.quantity).toFixed(2)}
                    </p>
                    {/* Remove button (agar context me function hai, warna ise abhi static rakh sakti hain) */}
                    {removeFromCart && (
                      <button 
                        onClick={() => removeFromCart(item.product?._id)}
                        className="text-xs text-red-500 hover:text-red-700 font-light underline tracking-wide"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-8 rounded-sm">
              <h2 className="text-lg font-normal uppercase tracking-wider mb-6">
                Order Summary
              </h2>
              
              <div className="flex justify-between items-center mb-4 text-sm font-light text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6 text-sm font-light text-gray-600 pb-6 border-b border-gray-200">
                <span>Shipping</span>
                <span className="text-black uppercase tracking-wider text-xs">Free</span>
              </div>
              
              <div className="flex justify-between items-center mb-8 text-xl font-normal text-gray-900">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-black text-white text-center px-6 py-4 text-xs font-medium uppercase tracking-widest hover:bg-gray-900 transition-colors rounded-sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;