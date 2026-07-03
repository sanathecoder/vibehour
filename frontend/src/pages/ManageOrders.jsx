import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from 'react-toastify';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status options jo aapke model mein hain
  const statusOptions = ["Pending", "Processing", "Shipping", "Delivered", "Cancelled"];

  useEffect(() => {
    fetchOrders();
  }, []);

const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/orders/all-order", { withCredentials: true });
      
      // Ye logic new orders ko top par layega
      const sortedOrders = (res.data.orders || res.data).sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Status update karne ka function
 const handleStatusChange = async (orderId, newStatus) => {
  try {
    await axios.put(`http://localhost:3000/api/orders/${orderId}`, 
      { orderStatus: newStatus }, 
      { withCredentials: true }
    );
    
    toast.success("Order status updated!"); // Professional alert
    fetchOrders(); 
  } catch (err) {
    toast.error("Failed to update status"); // Professional error
    console.error(err);
  }
};

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-light uppercase tracking-widest mb-12">Manage Orders</h1>
        
        <div className="space-y-6">
           {loading ? <p>Loading...</p> : orders.map(o => (
             <div key={o._id} className="border border-gray-100 p-6 rounded-sm flex justify-between items-center bg-white shadow-sm hover:border-gray-300 transition-all">
               
               <div>
                 <p className="text-xs text-gray-400 uppercase tracking-widest">Order #{o._id.slice(-6)}</p>
                 <p className="text-sm font-medium mt-1">Address: {o.shippingAddress}</p>
                 <p className="text-xs text-gray-500">Phone Number: {o.phone}</p>
               </div>

               {/* Status Controller */}
               <div className="flex items-center gap-4">
                 <p className="text-sm font-light">${o.totalAmount}</p>
                 <select 
                    value={o.orderStatus}
                    onChange={(e) => handleStatusChange(o._id, e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-xs uppercase p-2 focus:outline-none cursor-pointer rounded-sm"
                 >
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                 </select>
               </div>

             </div>
           ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageOrders;