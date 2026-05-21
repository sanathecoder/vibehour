const authController = require('../controllers/auth.controller')
const AuthMiddleware = require('../middleware/auth.middleware')
const express = require('express')

const router = express.Router()



router.post('/register',authController.Register)
router.post('/login',authController.Login)



module.exports = router