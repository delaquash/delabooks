import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from "jsonwebtoken";
import User from "../Model/User";
import { JWTPayload, IUserRequest } from "../types/types"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: 'Authorization header missing or invalid format' 
            });
        }

       /* The line `const token = authHeader.split(" ")[1]` is splitting the authorization header value
       to extract the token. */
        const token = authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({ 
                message: 'No token provided, access denied!!!' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload

        // find user
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).json({ 
                message: 'User not found, access denied!!!' 
            });
        }
        // Check if user is admin
        req.user = user;

        next()
    } catch (error) {
        return res.status(401).json({ 
            message: 'Invalid token',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export default authMiddleware;
export const isAdmin = (req: IUserRequest, res: Response, next: NextFunction) => {
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error while checking admin status',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};