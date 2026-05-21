const express = require("express");
const router = express.Router();

const  authMiddleware = require("../middleware/auth.middleware");
const admin = require('../middleware/admin.middleware')

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile data",
    user: req.user,
  });
});


router.get("/admin-only", authMiddleware, admin, (req, res) => {
  res.json({ message: "Admin access granted" });
});


module.exports = router;