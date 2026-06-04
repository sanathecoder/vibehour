const CartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

// Add To Cart
async function AddtoCart(req, res) {
  try {
    const { product, quantity } = req.body;
    const userId = req.user._id;

    // Validate quantity
    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    // Check if product exists
    const existingProduct = await productModel.findById(product);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Find user's cart
    let cart = await CartModel.findOne({
      user: userId,
    });

    // Create cart if not exists
    if (!cart) {
      cart = await CartModel.create({
        user: userId,
        products: [
          {
            product,
            quantity: Number(quantity),
          },
        ],
      });

      return res.status(201).json({
        message: "Product added to cart",
        cart,
      });
    }

    // Check if product already exists in cart
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === product
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += Number(quantity);
    } else {
      cart.products.push({
        product,
        quantity: Number(quantity),
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Get User Cart
async function getUserCart(req, res) {
  try {
    const cart = await CartModel.findOne({
      user: req.user._id,
    }).populate("products.product");

    if (!cart) {
      return res.status(404).json({
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// Remove Product From Cart
async function removeCart(req, res) {
  try {
    const { productId } = req.params;

    const cart = await CartModel.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  AddtoCart,
  getUserCart,
  removeCart,
};