const admin = (req, res, next) => {
  // Agar AuthMiddleware ne req.user set kar diya hai aur uska role admin hai
  if (req.user && req.user.role === "admin") {
    next(); // To aglay function (controller) par jane do
  } else {
    res.status(403).json({
      message: "Admin Access Only",
    });
  }
};

module.exports = admin;