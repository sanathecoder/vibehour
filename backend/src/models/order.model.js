const mongoose = require('mongoose')

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
                ref: "product"
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        shippingAddress: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: [
                "Pending", "Processing", "Shipping", "Delivered", "Cancelled"
            ],
            default: "Pending"
        }
    },
    { timestamps: true }


)
const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel