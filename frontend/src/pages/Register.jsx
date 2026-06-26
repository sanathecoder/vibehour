import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Context API integration
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Local states for clean handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "", // Fixed: Changed from 'name' to 'username' to match backend
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      
      // Call register function from our Context
      await register(form.username, form.email, form.password);
      
      // Successfully registered -> Send to login page
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white">
      <div className="max-w-sm w-full bg-white p-8 border border-gray-100 rounded-lg shadow-sm">
        
        <h2 className="text-2xl font-light tracking-widest text-center uppercase mb-8 text-gray-900">
          Create Account
        </h2>

        {/* Error Message Alert */}
        {error && (
          <p className="text-xs text-red-500 text-center mb-4 font-light bg-red-50 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* USERNAME */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. JohnDoe"
              className="w-full px-4 py-3 border border-gray-200 text-sm font-light focus:outline-none focus:border-black rounded transition-colors"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-200 text-sm font-light focus:outline-none focus:border-black rounded transition-colors"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 text-sm font-light focus:outline-none focus:border-black rounded transition-colors"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-xs font-medium uppercase tracking-widest py-4 hover:bg-gray-900 transition-colors rounded disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6 font-light">
          Already have an account?{" "}
          <Link to="/login" className="underline font-normal text-black">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;