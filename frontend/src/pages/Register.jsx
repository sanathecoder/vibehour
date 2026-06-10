import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // 👈 DEFAULT ROLE
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(register(form));

    if (result?.payload?.user) {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded w-96"
      >

        <h2 className="text-2xl mb-4">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 mb-2">
            {error}
          </p>
        )}

        {/* NAME */}
        <input
          placeholder="Full Name"
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        {/* EMAIL */}
        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        {/* PASSWORD */}
        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {/* ROLE SELECT */}
        <select
          className="border p-2 w-full mb-3"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="customer">
            Customer
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full p-2"
        >
          {loading
            ? "Creating account..."
            : "Register"}
        </button>

      </form>

    </div>
  );
};

export default Register;