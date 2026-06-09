const productModel = require('../models/product.model')
const { uploadFile } = require('../services/storage.service');
// Create Product 

async function createProduct(req, res) {
    try {
        const result = await uploadFile(req.file.buffer)
        if (!result) {
            return res.status(400).json({ message: "Product image is required" });
        }

        const product = await productModel.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: result.url,
            brand: req.body.brand,
            category: req.body.category,
            stock: req.body.stock,
            user: req.user.id

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

// Get ALl Product 

async function getAllProduct(req, res) {

    try {

        const {keyword,category,brand,minPrice,maxPrice,sort,page=1,limit=8} = req.query;
        let query = {}
        //Search
        if(keyword){
            query.title = {
                $regex : keyword,
                $options : "i"
            }
        }

        // Catagory
        if(category){
            query.category = category
        }

        //Brand
        if(brand){
            query.brand = brand
        }

        //Price Range

        if(minPrice ||  maxPrice){
            query.price = {}
        }

        if(minPrice){
            query.price.$gte = Number(minPrice)
        }

        if(maxPrice){
            query.price.$lte = Number(maxPrice)
        }

        let productsQuery = productModel.find(query)

        //Sort
        if(sort === "price-asc"){
            productsQuery = productsQuery.sort({
                price: 1
            })
        }

        if(sort === "price-desc"){
            productsQuery = productsQuery.sort({
                price : -1
            })
        }

        if(sort === "latest"){
            productsQuery = productsQuery.sort({
                createdAt : -1
            })
        }

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