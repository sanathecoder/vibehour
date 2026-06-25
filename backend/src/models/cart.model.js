const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Fix: Match kiya aapke user model name 'user' se
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product', // Correct: Match ho raha hai aapke product model 'product' se
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true });

// Agar pehle se compiled hai toh use karein warna naya banayein
const cartModel = mongoose.models.Cart || mongoose.model('cart', cartSchema);

module.exports = cartModel;