const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Products ko explicit square brackets [] mein rakha hai taake yeh array hi bane
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true });

// Agar pehle se 'cart' model compiled hai, toh use reuse karein warna naya banayein
const cartModel = mongoose.models.Cart || mongoose.model('cart', cartSchema);

module.exports = cartModel;