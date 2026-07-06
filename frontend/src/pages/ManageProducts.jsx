import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link for routing
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";



const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const location = useLocation()
  useEffect(() => {
    fetchProducts();
}, [location, currentPage]);

   const fetchProducts = async () => {
    try {
        const res = await axios.get(
            `http://localhost:3000/api/products?page=${currentPage}&limit=12`
        );

        setProducts(res.data.products);
        setTotalPages(res.data.totalPage);

    } catch (err) {
        toast.error("Error fetching products");
    }
};

   const deleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(
                `http://localhost:3000/api/products/${id}`,
                { withCredentials: true }
            );

            toast.success("Deleted Successfully");

            fetchProducts();

        } catch (err) {
            toast.error("Failed to delete");
        }
    }
};

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-2xl font-light uppercase tracking-widest">Manage Collection</h1>
                    {/* Add New Product Button */}
                    <Link to="/admin/add-product" className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-gray-800 transition-all">
                        + Add Product
                    </Link>
                </div>

                <div className="border border-gray-100 p-8">
                    {products.length > 0 ? (
                        products.map((p) => (
                           
                            <div key={p._id} className="flex justify-between items-center py-4 border-b border-gray-50">
                                <div className="flex items-center gap-4">
                                    <img src={p.image} className="h-12 w-12 object-cover rounded-sm" alt={p.title} />
                                    <div>
                                        <p className="text-gray-900 font-medium text-sm">{p.title}</p>
                                        <p className="text-gray-400 text-[10px]">${p.price}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Link to={`/admin/edit-product/${p._id}`} className="text-blue-500 underline text-xs">Edit</Link>
                                    <button onClick={() => deleteProduct(p._id)} className="text-red-500 underline text-xs">Delete</button>
                                </div>
                                
                            </div>
                            
                            
                            
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No products found.</p>
                    )}
                </div>
                  <div className="flex justify-center items-center gap-2 mt-8">

    <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-4 py-2 border disabled:opacity-50"
    >
        Previous
    </button>

    {[...Array(totalPages)].map((_, index) => (
        <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border ${
                currentPage === index + 1
                    ? "bg-black text-white"
                    : ""
            }`}
        >
            {index + 1}
        </button>
    ))}

    <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-4 py-2 border disabled:opacity-50"
    >
        Next
    </button>

</div>
            </div>
          
        </MainLayout>
    );
};

export default ManageProducts;