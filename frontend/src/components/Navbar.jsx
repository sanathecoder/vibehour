import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Clean Context integration
import { useCart } from "../context/CartContext";   // Cart counting ke liye

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, clearCartState } = useCart();
  const navigate = useNavigate();

  // Cart me total kitne items hain unka count nikalna
  const cartCount = cart?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = async () => {
    try {
      await logout();
      clearCartState(); // Logout par cart local state ko bhi empty karo
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
      
      {/* LOGO */}
      <Link
        to="/"
        className="text-xl font-light tracking-widest uppercase text-gray-900"
      >
        VibeHour
      </Link>

      {/* LINKS */}
      <div className="flex gap-8 items-center text-xs font-light uppercase tracking-wider text-gray-700">
        
        <Link to="/" className="hover:text-black transition-colors">Home</Link>

        <Link to="/cart" className="hover:text-black transition-colors relative">
          Cart <span className="font-normal text-black">({cartCount})</span>
        </Link>

        <Link to="/orders" className="hover:text-black transition-colors">Orders</Link>

        {/* ADMIN LINK - Fixed role path from user object */}
        {user?.role === "admin" && (
          <Link to="/admin" className="text-red-500 font-normal hover:underline">
            Admin
          </Link>
        )}

        {/* AUTH SECTION */}
        {user ? (
          <div className="flex gap-4 items-center border-l border-gray-200 pl-4">
            <span className="text-xs text-gray-400 normal-case">
              {user.username}
            </span>

            <button
              onClick={handleLogout}
              className="text-xs font-normal underline hover:text-red-500 cursor-pointer transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-900 transition-colors"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
};

export default Navbar;