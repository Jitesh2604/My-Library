import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; 
import requireAuth from '../middleware/requireAuth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(user) {
            return res.status(409).json({
                message: "User already exist!",
                success: false
            });
        };
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({
            message: 'Register successfully!',
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: `Internal Serever Error ${err.message}`
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password ){
            return res.status(400).json({
                message: 'Email and password are required.',
                success: fasle
            });
        };

        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: 'Invalid email or password',
                success: false
            });
        };

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            res.status(401).json({
                message: 'Invalid email or password.',
                success: false
            });
        };

        const token = jwt.sign({email: user.email, _id: User._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
          })
          .status(200).json({
            message: 'Login Successfully!',
            success: true,
            Token: token
        });
    } catch (err) {
        res.status(500).json({
            message: `Internal Serever Error ${err.message}`
        });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ 
        message: "Logged out successfully",
        success: true 
    });
});

router.get('/me', requireAuth, (req, res) => {
    res.status(200).json(req.user);
})

export default router;
