const productModel = require('../models/product.model');
const { uploadFile } = require('../services/storage.service');

// Create Product (Admin Only)
async function createProduct(req, res) {
    try {
        const result = await uploadFile(req.file.buffer);
        if (!result) {
            return res.status(400).json({ message: "Product image is required" });
        }

        // Feature ko boolean mein convert karna zaroori hai
        const isFeatured = req.body.featured === 'true' || req.body.featured === true;

        const product = await productModel.create({
            title: req.body.title,
            description: req.body.description,
            price: Number(req.body.price),
            image: result.url,
            brand: req.body.brand || "VibeHour",
            category: req.body.category, // Yeh aapka new field
            stock: Number(req.body.stock),
            featured: isFeatured // Boolean convert ho gaya
        });

        res.status(201).json({
            message: "Product Created Successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

// Get All Products (With Search, Pagination & Filters)
async function getAllProduct(req, res) {
    try {
        const { keyword, category, brand, minPrice, maxPrice, sort, page = 1, limit = 8 } = req.query;
        let query = {};

        // Search Keyword
        if (keyword) {
            query.title = {
                $regex: keyword,
                $options: "i"
            };
        }

        // Filter by Category
        if (category) {
            query.category = category;
        }

        // Filter by Brand
        if (brand) {
            query.brand = brand;
        }

        // Price Range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let productsQuery = productModel.find(query);

        // Sorting Logic
        if (sort === "price-asc") productsQuery = productsQuery.sort({ price: 1 });
        if (sort === "price-desc") productsQuery = productsQuery.sort({ price: -1 });
        if (sort === "latest") productsQuery = productsQuery.sort({ createdAt: -1 });

        // Pagination 
        const skip = (page - 1) * limit;
        productsQuery = productsQuery.skip(skip).limit(Number(limit));
        
        const products = await productsQuery;
        const totalproducts = await productModel.countDocuments(query);

        res.status(200).json({
            message: "Fetch All Products Successfully",
            totalproducts,
            currentPage: Number(page),
            totalPage: Math.ceil(totalproducts / limit),
            products
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

// Get Single Product
async function getSingleProduct(req, res) {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).json({ message: "Product fetched", product });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Update Product (Admin Only)
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        // 1. Title, Description, Category ke liye Safe Update
        // "undefined" string check karna bohot zaroori hai
        if (req.body.title && req.body.title !== "undefined") {
            product.title = req.body.title;
        }

        if (req.body.description && req.body.description !== "undefined") {
            product.description = req.body.description;
        }

   

        // --- FIXED LOGIC HERE ---
        // Sirf tab update karein agar valid category aayi hai
        if (req.body.category && req.body.category !== "undefined" && req.body.category !== "") {
            product.category = req.body.category;
        }

        // Numbers ke liye
        if (req.body.price && req.body.price !== "" && req.body.price !== "undefined") {
            product.price = Number(req.body.price);
        }
        
        if (req.body.stock && req.body.stock !== "" && req.body.stock !== "undefined") {
            product.stock = Number(req.body.stock);
        }

        // Boolean (Featured)
        if (req.body.featured !== undefined) {
            product.featured = (req.body.featured === 'true' || req.body.featured === true);
        }

        // Image update
        if (req.file) {
            const result = await uploadFile(req.file.buffer);
            product.image = result.url;
        }

        await product.save();
        res.status(200).json({ message: "Product Updated Successfully", product });
        
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
// Delete Product (Admin Only)
async function deleteProduct(req, res) {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json({ message: "Product Deleted Successfully" });
    } catch (error) {
console.log(err);
    console.log(err.response);
    console.log(err.response?.data);    }
}

// Get Featured Products
async function getFeaturedProducts(req, res) {
    try {
        const featuredProducts = await productModel.find({ featured: true });
        res.status(200).json({ featuredProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts
};