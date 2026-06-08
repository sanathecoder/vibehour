const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')

const orderController = require('../controllers/order.controller')

router.post('/',authMiddleware, orderController.placeOrder)
router.get('/',authMiddleware, orderController.getmyOrder)
router.get('/all-order',authMiddleware,admin,orderController.getAllOrder)