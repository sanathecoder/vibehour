import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Clean Context API integration
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Local states for clean handling without Redux
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // AuthContext ka login function invoke kiya
      const data = await login(form.email, form.password);

      // 🛡️ Role-Based Smart Redirection
      if (data?.user?.role === "admin") {
        navigate("/admin"); // Admin dashboard par bhejo
      } else {
        navigate("/"); // Customer ko home collection par bhejo
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white">
      <div className="max-w-sm w-full bg-white p-8 border border-gray-100 rounded-lg shadow-sm">
        
        <h2 className="text-2xl font-light tracking-widest text-center uppercase mb-8 text-gray-900">
          Welcome Back
        </h2>

        {/* Error Alert Display */}
        {error && (
          <p className="text-xs text-red-500 text-center mb-4 font-light bg-red-50 py-2 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
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

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-xs font-medium uppercase tracking-widest py-4 hover:bg-gray-900 transition-colors rounded disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6 font-light">
          New to VibeHour?{" "}
          <Link to="/register" className="underline font-normal text-black">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;