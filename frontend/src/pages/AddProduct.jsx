import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { toast } from 'react-toastify';


const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "men", // Default value set kar di
        brand: "VibeHour",
        featured: false,
    });
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("stock", formData.stock);
        data.append("category", formData.category); // Category add ho gayi
        data.append("brand", formData.brand);
        data.append("featured", formData.featured);
        data.append("image", image); 

        try {
            await axios.post("http://localhost:3000/api/products", data, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            toast.success("Product Added Successfully! ✨");
// AddProduct page par
navigate('/admin/manage-products', { state: { refresh: true } });        } catch (err) {
            console.error(err);
            toast.error("Failed to add product. Check console.");
        }
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto py-16 px-6">
                <h1 className="text-xl uppercase tracking-widest mb-10 text-gray-900">Add New Product</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-2">Title</label>
                        <input type="text" className="w-full border border-gray-200 p-3 rounded-sm" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                    </div>

                    {/* Price, Stock & Category (3 grid columns) */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-2">Price</label>
                            <input type="number" className="w-full border border-gray-200 p-3 rounded-sm" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-2">Stock</label>
                            <input type="number" className="w-full border border-gray-200 p-3 rounded-sm" onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-2">Category</label>
                            <select 
                                className="w-full border border-gray-200 p-3 rounded-sm bg-white" 
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                required
                            >
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-2">Description</label>
                        <textarea className="w-full border border-gray-200 p-3 rounded-sm h-32" onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-2">Product Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} required className="text-sm" />
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" onChange={(e) => setFormData({...formData, featured: e.target.checked})} />
                        <label className="text-xs text-gray-500">Mark as Featured Product</label>
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-4 text-xs uppercase tracking-widest hover:bg-gray-900 transition-colors rounded-sm">
                        Save Product
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default AddProduct;