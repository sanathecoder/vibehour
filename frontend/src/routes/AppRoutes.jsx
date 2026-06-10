import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import NotFound from "../pages/NotFound";
import AdminDashboard from '../pages/AdminDashboard'

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/orders" element={<Orders />} />

      <Route path="*" element={<NotFound />} />
<Route
  path="/admin"
  element={
    <ProtectedRoute roleRequired="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRoutes;