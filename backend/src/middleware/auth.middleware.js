const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function AuthMiddleware(req,res,next){
    try {
        
        const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: " Unauthorize"
        })
    }

    const decode = await jwt.verify(token,process.env.JWT_SECRET)

    if(!decode){
        return res.status(401).json({
            message: "Invalid Token- Unauthorize"
        })
    }
   console.log(decode)
    req.user = await userModel.findById(decode.id).select("-password")
   console.log(req.user)
    next()

    } catch (error) {
        res.status(401).json({
            message: " Server Error - token fail",
            error: error.message
        })
        
    }
}

module.exports = AuthMiddleware