import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, role } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex items-center justify-between">

      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-bold"
      >
        Vibehour
      </Link>

      {/* LINKS */}
      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/orders">Orders</Link>

        {/* ADMIN LINK */}
        {role === "admin" && (
          <Link to="/admin">
            Admin
          </Link>
        )}

        {/* AUTH SECTION */}
        {user ? (
          <>
            <span className="text-sm text-gray-300">
              {user.name} ({role})
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}

      </div>

    </nav>
  );
};

export default Navbar;