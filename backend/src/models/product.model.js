const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    catagory: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true,
        default: 0,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


const productModel = mongoose.model('product', productSchema)

module.exports = productModel