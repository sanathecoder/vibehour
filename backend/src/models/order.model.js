const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: { // Fix: Model me price field missing thi, wo add ki
                type: Number,
                required: true
            }
        }],
        shippingAddress: {
            type: String,
            required: true
        },
        phone: { // Fix: Number se String kiya taake 03xxxx format barqarar rahe
            type: String,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Processing", "Shipping", "Delivered", "Cancelled"],
            default: "Pending"
        }
    },
    { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;