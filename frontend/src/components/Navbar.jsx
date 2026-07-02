import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, clearCartState } = useCart();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartCount = cart?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = async () => {
    await logout();
    clearCartState();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="text-xl font-light tracking-widest uppercase text-gray-900">
        VibeHour
      </Link>

      {/* LINKS */}
      <div className="flex gap-8 items-center text-xs font-light uppercase tracking-wider text-gray-700">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <Link to="/cart" className="hover:text-black transition-colors relative">
          Cart <span className="font-normal text-black">({cartCount})</span>
        </Link>
        <Link to="/orders" className="hover:text-black transition-colors">Orders</Link>

        {user?.role === "admin" && (
          <Link to="/admin" className="text-red-500 font-normal hover:underline">Admin</Link>
        )}

        {/* AUTH SECTION / DROPDOWN */}
        {user ? (
          <div className="relative border-l border-gray-200 pl-4">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex cursor-pointer items-center gap-2 text-xs hover:text-black transition-colors"
            >
              <FiUser className="text-sm" />
              {user.username}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-4 w-40 bg-white border border-gray-100 shadow-xl py-2 z-50">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-xs hover:bg-gray-50">
                  <FiSettings /> Profile
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex cursor-pointer items-center gap-3 w-full px-4 py-2 text-xs text-red-500 hover:bg-gray-50"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 items-center border-l border-gray-200 pl-4">
            <Link to="/login" className="hover:text-black transition-colors">Login</Link>
            <Link to="/register" className="bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-900 transition-colors">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;