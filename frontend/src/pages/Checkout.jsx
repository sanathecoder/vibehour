import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCartState } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    phone: "",
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    // 1. Calculate Total Amount
    const calculatedAmount = cart.products.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    // 2. Prepare Payload (Match this with your DB schema)
    const orderData = {
      shippingAddress: `${formData.address}, ${formData.city}`, // Combine karke string bana di
      phone: formData.phone,
      products: cart.products,
      totalAmount: calculatedAmount, // Backend 'totalAmount' expect kar raha hai
      orderStatus: "Pending"
    };

    try {
      // 3. Request send karein
      await axios.post("http://localhost:3000/api/orders", orderData, { 
        withCredentials: true 
      });

      alert("Order placed successfully!");
      clearCartState(); // Cart clear karein
      navigate("/orders");
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Failed to place order. Check console for error details.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-light tracking-widest uppercase mb-10 text-gray-900">
          Checkout
        </h1>
        
        <form onSubmit={handleCheckout} className="space-y-6">
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2">Shipping Address</label>
            <input 
              required
              className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none"
              placeholder="House #, Street name"
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2">City</label>
              <input 
                required
                className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none"
                placeholder="Multan"
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-2">Phone</label>
              <input 
                required
                className="w-full border border-gray-200 p-3 rounded-sm focus:outline-none"
                placeholder="0300xxxxxxx"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-900 transition-colors rounded-sm"
          >
            Place Order
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Checkout;