import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from "jsonwebtoken";
import User from "../Model/User";

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

        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        req.user = decoded;

        next()
    } catch (error) {
        return res.status(401).json({ 
            message: 'Invalid token',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

export default authMiddleware;
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
}