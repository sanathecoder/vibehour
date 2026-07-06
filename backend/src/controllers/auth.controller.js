const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
async function Register(req, res) {
    try {
        // Fix: Destructuring me 'role' ko add kiya
        const { username, email, password, role } = req.body;

        const userExist = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (userExist) {
            return res.status(400).json({
                message: "User Already Exist"
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashpassword,
            role: role || "customer" // Agar postman se role nahi bhejenge toh default customer banega
        });

        res.status(201).json({
            message: "Register Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

// Login
async function Login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Production me automatic true ho jayega
            secure: true, 
    sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Security Patch: Response bhejne se pehle password object se delete kiya
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: "Login Successfully",
            token,
            user: userResponse
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

// Logout
async function LogOut(req, res) {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.json({ message: "Logged out successfully" });
}

module.exports = { Register, Login, LogOut };