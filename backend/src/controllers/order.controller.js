const orderModel = require('../models/order.model')
const cartModel = require('../models/cart.model')

async function placeOrder(req,res){
 try {
    
       const {shippingAddress,phone} = req.body

    const cart = await cartModel.findOne({
        user: req.user._id
    }).populate("products.product")

    if(!cart || cart.products.length === 0){
        return res.status(404).json({
            message: "cart is empty"
        })
    }

    let totalAmount = 0;
    const orderProducts = cart.products.map((item)=>{
        totalAmount += item.product.price * item.quantity

        return{
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }
        })

        const order = await OrderModel.create({
      user: req.user._id,
      products: orderProducts,
      shippingAddress,
      phone,
      totalAmount,
    });

    cart.products= []
    await cart.save()

     res.status(201).json({
      message: "Order placed successfully",
      order,
    });

 } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    
 }

}

async function getmyOrder(req,res){
    try {
        const order = await orderModel.findOne({
            user: req.user._id,
        }).populate("products.product").sort({createdAt:-1})
        res.status(200).json({
            order
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

async function getAllOrder(req,res){
    try {
        const orders = await orderModel.find()
        .populate("user","username email")
        .populate("products.product")
        req.status(200).json({
            orders
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
}

module.exports ={placeOrder,getmyOrder, getAllOrder}