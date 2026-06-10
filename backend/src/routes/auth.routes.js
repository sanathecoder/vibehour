const authController = require('../controllers/auth.controller')
const AuthMiddleware = require('../middleware/auth.middleware')
const express = require('express')

const router = express.Router()



router.post('/register',authController.Register)
router.post('/login',authController.Login)

router.get("/me", AuthMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router