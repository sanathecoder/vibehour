const express = require('express');
const authController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', authController.Register);
router.post('/login', authController.Login);
router.post('/logout', authController.LogOut); // Added logout route

// Protected route to get current user data info
router.get("/me", AuthMiddleware, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;