import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const requireAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        res.status(401).json({
            message: 'Unauthorized',
            success:false
        });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid token',
            success: false
        });
    }
};

export default requireAuth;