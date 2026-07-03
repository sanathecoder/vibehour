const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/stats.Controller.js');
const admin = require('../middleware/admin.middleware.js')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/stats', authMiddleware,admin, StatsController.getDashboardStats)

module.exports = router;