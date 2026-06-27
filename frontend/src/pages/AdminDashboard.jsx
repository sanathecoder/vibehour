import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Yahan aap backend se stats fetch kar ke state mein rakh sakti hain
  const stats = [
    { title: "Total Revenue", value: "$12,450" },
    { title: "Pending Orders", value: "8" },
    { title: "Total Products", value: "24" },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-light tracking-widest uppercase text-gray-900 mb-12">
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-8 border border-gray-100 rounded-sm">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">{stat.title}</p>
              <h2 className="text-3xl font-light text-gray-900">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Admin Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            to="/admin/manage-products" 
            className="block p-8 border border-gray-200 hover:border-black transition-colors rounded-sm"
          >
            <h3 className="text-lg font-normal mb-2 uppercase tracking-wide">Manage Products</h3>
            <p className="text-sm font-light text-gray-500">Add, edit, or remove watches from your collection.</p>
          </Link>

          <Link 
            to="/admin/manage-orders" 
            className="block p-8 border border-gray-200 hover:border-black transition-colors rounded-sm"
          >
            <h3 className="text-lg font-normal mb-2 uppercase tracking-wide">View Orders</h3>
            <p className="text-sm font-light text-gray-500">Check pending orders and update shipment status.</p>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;