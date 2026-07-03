import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { toast } from 'react-toastify';


const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Initial state mein category aur featured add kar diye
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "men",
        featured: false
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Data Fetching
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/products/${id}`)
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((err) => console.error("Error loading product:", err));
        }
    }, [id]);

    // Submit Logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("stock", formData.stock);
        data.append("category", formData.category);
        data.append("featured", formData.featured);

        if (image) {
            data.append("image", image);
        }

        try {
            await axios.put(
                `http://localhost:3000/api/products/${id}`,
                
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Product updated successfully!");
            navigate("/admin/manage-products");
        } catch (err) {
            console.error(err);
            toast.error("Error updating product");
        } finally {
        setLoading(false); // Loading khatam
    }
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto py-16 px-6">
                <h1 className="text-xl uppercase mb-10">Edit Product</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="text-xs text-gray-500">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            className="w-full border p-3"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Price, Stock, Category */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs text-gray-500">Price</label>
                            <input type="number" value={formData.price} className="w-full border p-3" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Stock</label>
                            <input type="number" value={formData.stock} className="w-full border p-3" onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Category</label>
                            <select
                                value={formData.category}
                                className="w-full border p-3 bg-white"
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs text-gray-500">Description</label>
                        <textarea
                            value={formData.description}
                            className="w-full border p-3 h-32"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    {/* Image update  */}
                    <div>
                        <label className="text-xs text-gray-500">Product Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border p-3"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Preview"
                                className="w-32 h-32 object-cover mt-3"
                            />
                        ) : (
                            formData.image && (
                                <img
                                    src={`http://localhost:3000/uploads/${formData.image}`}
                                    alt="Product"
                                    className="w-32 h-32 object-cover mt-3"
                                />
                            )
                        )}
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        />
                        <label className="text-xs">Mark as Featured Product</label>
                    </div>

                    <button 
    type="submit" 
    disabled={loading} 
    className={`w-full py-4 text-xs uppercase tracking-widest ${loading ? "bg-gray-400" : "bg-black text-white"}`}
>
    {loading ? "Updating..." : "Update Product"}
</button>
                </form>
            </div>
        </MainLayout>
    );
};

export default ProductForm;