import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: "$0",
    pendingOrders: "0",
    totalProducts: "0"
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("admin/stats");
        setStats(res.data);
      } catch (err) {
        toast.error("Failed to load dashboard stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-light tracking-widest uppercase text-gray-900 mb-12">
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-8 border border-gray-100 rounded-sm">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">Total Revenue</p>
            <h2 className="text-3xl font-light text-gray-900">{stats.totalRevenue}</h2>
          </div>
          <div className="bg-gray-50 p-8 border border-gray-100 rounded-sm">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">Pending Orders</p>
            <h2 className="text-3xl font-light text-gray-900">{stats.pendingOrders}</h2>
          </div>
          <div className="bg-gray-50 p-8 border border-gray-100 rounded-sm">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">Total Products</p>
            <h2 className="text-3xl font-light text-gray-900">{stats.totalProducts}</h2>
          </div>
        </div>

        {/* Admin Quick Actions - Yahan dono sections majood hain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Manage Products Section */}
          <Link 
            to="/admin/manage-products" 
            className="block p-8 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300 rounded-sm"
          >
            <h3 className="text-lg font-normal mb-2 uppercase tracking-wide">Manage Products</h3>
            <p className="text-sm font-light text-gray-500">Add, edit, or remove watches from your collection.</p>
          </Link>

          {/* Manage Orders Section */}
          <Link 
            to="/admin/manage-orders" 
            className="block p-8 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-300 rounded-sm"
          >
            <h3 className="text-lg font-normal mb-2 uppercase tracking-wide">Manage Orders</h3>
            <p className="text-sm font-light text-gray-500">Check pending orders and update shipment status.</p>
          </Link>
          
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;