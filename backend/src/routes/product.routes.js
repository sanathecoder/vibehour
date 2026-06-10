const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })


const productController = require('../controllers/product.controller')
const authMiddleware = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')

// public Routes

router.get('/',productController.getAllProduct)
router.get( "/featured",productController.getFeaturedProducts)
router.get('/:id',productController.getSingleProduct)


// admin Routes 

router.post('/',authMiddleware,admin,upload.single("image"),productController.createProduct)
router.put('/:id',authMiddleware,admin,upload.single("image"),productController.updateProduct)
router.delete('/:id',authMiddleware,admin,productController.deleteProduct)


module.exports = router