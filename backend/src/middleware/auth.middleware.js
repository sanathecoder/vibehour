const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function AuthMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No Token Provided"
            });
        }

        // Fix: jwt.verify se await hata diya kyunki yeh synchronous function hai
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token - Unauthorized"
            });
        }

        // Debugging logs (Aapki asani ke liye barkarar hain)
        console.log("Decoded Token Data:", decode);

        req.user = await userModel.findById(decode.id).select("-password");
        
        console.log("Authenticated User:", req.user);

        if (!req.user) {
            return res.status(401).json({
                message: "User not found in database"
            });
        }

        next();

    } catch (error) {
        res.status(401).json({
            message: "Server Error - Token Verification Failed",
            error: error.message
        });
    }
}

module.exports = AuthMiddleware;