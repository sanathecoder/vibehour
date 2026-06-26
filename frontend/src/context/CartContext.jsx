import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    try {
      const res = await API.get("/cart");
      setCart(res.data.cart);
    } catch (err) {
      console.log("Cart empty or error fetching");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity) => {
    const res = await API.post("/cart/add", { product: productId, quantity });
    setCart(res.data.cart);
    fetchCart(); // Data refresh karne ke liye taake populates sahi hon
  };

  const removeFromCart = async (productId) => {
    const res = await API.delete(`/cart/${productId}`);
    setCart(res.data.cart);
    fetchCart();
  };

  const clearCartState = () => setCart(null);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart, clearCartState }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);