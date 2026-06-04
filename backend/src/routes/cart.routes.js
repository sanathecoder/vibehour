const express = require("express")
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')

const CartController = require('../controllers/cart.controller')

router.post('/add',authMiddleware,CartController.AddtoCart)
router.get('/',authMiddleware,CartController.getUserCart)
router.delete('/:productId',authMiddleware,CartController.removeCart)

module.exports = router