import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/orders", {
          withCredentials: true,
        });
        // Backend se aaye huye orders set karna
        setOrders(res.data.orders); 
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-light tracking-widest uppercase mb-12 text-gray-900">
          My Orders
        </h1>

        {loading ? (
          <p className="text-sm text-gray-400">Loading your history...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-gray-500 font-light">No orders found.</p>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <div key={order._id} className="border border-gray-100 p-8 rounded-sm">
                {/* Order Header: Date & Status */}
                <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Order Placed</p>
                    <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-50 text-[10px] uppercase tracking-widest border border-gray-200">
                    {order.orderStatus}
                  </span>
                </div>

                {/* Products List */}
                <div className="space-y-3 mb-6">
                  {order.products.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product?.title || "Product"} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Footer: Address & Total */}
                <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Shipping To</p>
                    <p className="text-sm text-gray-700">{order.shippingAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-lg font-light text-gray-900">${order.totalAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Orders;