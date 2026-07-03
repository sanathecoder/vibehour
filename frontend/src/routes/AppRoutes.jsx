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
import ManageOrders from "../pages/ManageOrders";
import ManageProducts from "../pages/ManageProducts";
import AddProduct from "../pages/AddProduct";
import ProductForm from "../pages/ProductForm";
import Shop from "../pages/Shop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppRoutes = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
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
      <Route path="/shop" element={<Shop />} />



   
<Route
  path="/admin"
  element={
    <ProtectedRoute roleRequired="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

  
<Route path="/admin/manage-orders" element={<ManageOrders/>} />
<Route path="/admin/manage-products" element={<ManageProducts/>} />
<Route path="/admin/add-product" element={<AddProduct/>} />
<Route path="/admin/edit-product/:id" element={<ProductForm />} />


    </Routes>
    </>
  );
};

export default AppRoutes;