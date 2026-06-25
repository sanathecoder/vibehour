const productModel = require('../models/product.model');
const { uploadFile } = require('../services/storage.service');

// Create Product (Admin Only)
async function createProduct(req, res) {
    try {
        const result = await uploadFile(req.file.buffer);
        if (!result) {
            return res.status(400).json({ message: "Product image is required" });
        }

        // Cleaned: Extra user assignment removed for single-store
        const product = await productModel.create({
            title: req.body.title,
            description: req.body.description,
            price: Number(req.body.price),
            image: result.url,
            brand: req.body.brand || "VibeHour",
            category: req.body.category,
            stock: Number(req.body.stock),
            featured: req.body.featured
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
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.status(200).json({ message: "Product Updated Successfully", product });
    } catch (error) {
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
        res.status(500).json({ message: "Server Error", error: error.message });
    }
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