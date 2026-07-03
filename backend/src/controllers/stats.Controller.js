const productModel = require("../models/product.model")
const orderModel = require("../models/order.model")

const getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await productModel.countDocuments();
        const pendingOrders = await orderModel.countDocuments({ orderStatus: "Pending" });
        
        // Total Revenue calculation
        const orders = await orderModel.find({ orderStatus: "Delivered" });
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.status(200).json({
            totalProducts,
            pendingOrders,
            totalRevenue: `$${totalRevenue.toLocaleString()}`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {getDashboardStats}