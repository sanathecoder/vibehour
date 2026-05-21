const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller')
const authMiddleware = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')

// public Routes

router.get('/',productController.getAllProduct)
router.get('/:id',productController.getSingleProduct)


// admin Routes 

router.post('/',authMiddleware,admin,productController.createProduct)
router.put('/:id',authMiddleware,admin,productController.updateProduct)
router.delete('/:id',authMiddleware,admin,productController.deleteProduct)


module.exports = router