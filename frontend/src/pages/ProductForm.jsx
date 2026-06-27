import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const ProductForm = () => {
    const { id } = useParams(); // URL se ID uthana
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "", description: "", price: "", stock: "", category: "Watches"
    });

    // 1. Data Fetching (Page load hote hi purana data lana)
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/products/${id}`)
                .then((res) => {
                    setFormData(res.data); // DB se data laa kar state mein dalna
                })
                .catch((err) => console.error("Error loading product:", err));
        }
    }, [id]);

    // 2. Submit Logic (Update request)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/products/${id}`, formData, { withCredentials: true });
            alert("Product updated successfully!");
            navigate("/admin/manage-products");
        } catch (err) {
            alert("Error updating product");
        }
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto py-16 px-6">
                <h1 className="text-xl uppercase mb-10">Edit Product</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Yahan 'value' property zaroori hai data show karwane ke liye */}
                    <div>
                        <label className="text-xs text-gray-500">Title</label>
                        <input 
                            type="text" 
                            value={formData.title} 
                            className="w-full border p-3" 
                            onChange={(e) => setFormData({...formData, title: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Price</label>
                        <input 
                            type="number" 
                            value={formData.price} 
                            className="w-full border p-3" 
                            onChange={(e) => setFormData({...formData, price: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Description</label>
                        <textarea 
                            value={formData.description} 
                            className="w-full border p-3 h-32" 
                            onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        />
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-4 text-xs uppercase">
                        Update Product
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default ProductForm;