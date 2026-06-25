const mongoose = require('mongoose');

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
        default: "VibeHour" // Single store hai toh default brand name fix kar diya
    },
    category: { // Fix: Spelling corrected to 'category'
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: { // Fix: String se Number kar diya
        type: Number, 
        required: true,
        default: 0,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);
module.exports = productModel;