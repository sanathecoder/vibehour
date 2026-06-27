const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');

// Place Order
async function placeOrder(req, res) {
    try {
        const { shippingAddress, phone } = req.body;

        const cart = await cartModel.findOne({
            user: req.user._id
        }).populate("products.product");

        if (!cart || cart.products.length === 0) {
            return res.status(404).json({
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;
        const orderProducts = cart.products.map((item) => {
            totalAmount += item.product.price * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            };
        });

        // Check stock and deduct inventory
        for (const item of cart.products) {
            const product = item.product;
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.title} is out of stock`
                });
            }
            product.stock -= item.quantity;
            await product.save();
        }

        const order = await orderModel.create({
            user: req.user._id,
            products: orderProducts,
            shippingAddress,
            phone, 
            totalAmount,
        });

        // Empty user cart after order placement
        cart.products = [];
        await cart.save();

        res.status(201).json({
            message: "Order placed successfully",
            order,
        });

    } catch (error) {
        console.error("SERVER ERROR DETAILS:", error);
        res.status(500).json({
            message: error.message,
        });
    }
}

// Get Logged-In User Orders (Order History)
async function getmyOrder(req, res) {
    try {
        // Fix: findOne se badal kar find() kiya taake user ke saare orders milein
        const orders = await orderModel.find({
            user: req.user._id,
        }).populate("products.product").sort({ createdAt: -1 });

        res.status(200).json({
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Get All Orders (Admin Dashboard Only)
async function getAllOrder(req, res) {
    try {
        const orders = await orderModel.find()
            .populate("user", "username email")
            .populate("products.product");
        res.status(200).json({
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
 // Update Status of Mange order
 async function OrderStatus(req,res){
    const { orderStatus } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
        req.params.id, 
        { orderStatus }, 
        { new: true }
    );
    res.json(updatedOrder);
 }

module.exports = { placeOrder, getmyOrder, getAllOrder , OrderStatus };