"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../Model/User"));
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'Authorization header missing or invalid format'
            });
            return;
        }
        /* The line `const token = authHeader.split(" ")[1]` is splitting the authorization header value
        to extract the token. */
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: 'No token provided, access denied!!!'
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // find user
        const user = await User_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(401).json({
                message: 'User not found, access denied!!!'
            });
        }
        // Check if user is admin
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: 'Invalid token',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return;
    }
};
exports.default = authMiddleware;
const isAdmin = (req, res, next) => {
    try {
        // Check if user exists in request
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
                error: 'No user found in request'
            });
        }
        // Check if user is admin
        if (!req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Access denied, admin only',
                error: 'User does not have admin privileges'
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while checking admin status',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.isAdmin = isAdmin;
