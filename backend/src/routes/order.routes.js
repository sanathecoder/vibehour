const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const orderController = require('../controllers/order.controller');

// Customer Routes
router.post('/', authMiddleware, orderController.placeOrder);
router.get('/', authMiddleware, orderController.getmyOrder);

// Admin Dashboard Route
router.get('/all-order', authMiddleware, admin, orderController.getAllOrder);

module.exports = router;