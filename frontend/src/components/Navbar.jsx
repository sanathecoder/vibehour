import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, clearCartState } = useCart();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount =
    cart?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = async () => {
    await logout();
    clearCartState();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-5">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-light tracking-widest uppercase text-gray-900"
        >
          VibeHour
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-8 text-xs font-light uppercase tracking-wider text-gray-700">

          <Link to="/">Home</Link>

          <Link to="/cart">
            Cart ({cartCount})
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="text-red-500">
              Admin
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2"
              >
                <FiUser />
                <span>{user.username}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-lg rounded-md py-2">

                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">Login</Link>

              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-5 flex flex-col gap-5 text-sm uppercase tracking-wider">

          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
            Cart ({cartCount})
          </Link>

          <Link to="/orders" onClick={() => setIsMenuOpen(false)}>
            Orders
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-red-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="bg-black text-white px-4 py-2 rounded text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;