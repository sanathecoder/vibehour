const productModel = require('../models/product.model')

// Create Product 

async function createProduct(req, res) {

    try {

        const product = await productModel.create(req.body)

        res.status(201).json({
            message: " Product Created",
            product
        })

    } catch (error) {
        res.status(500).json({
            message: " Server Error",
            error: error.message
        })

    }


}

// Get ALl Product 

async function getAllProduct(req, res) {

    try {

        const product = await productModel.find()
        res.status(200).json({
            message: "fetch All product",
            product
        })

    } catch (error) {

        res.status(500).json({
            message: " Server Error",
            error: error.message
        })

    }


}


// get single product

async function getSingleProduct(req, res) {

    try {

        const product = await productModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        }

        res.status(201).json({
            message: "product fetch",
            product
        })


    } catch (error) {

        res.status(500).json({
            message: " Server Error",
            error: error.message
        })

    }
}


// update product 

async function updateProduct(req, res) {

    try {

        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(201).json({
            mesage: "Product Updated",
            product
        })

    } catch (error) {
        res.status(500).json({
            message: " Server Error",
            error: error.message
        })
    }
}


// delete product 

async function deleteProduct(req, res) {
    try {

        const product = await productModel.findByIdAndDelete(
            req.params.id
        )

        res.json({ message: "product delete" })

    } catch (error) {

        res.status(500).json({
            message: " Server Error",
            error: error.message
        })
    }
}


module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}