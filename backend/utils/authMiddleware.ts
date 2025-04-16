import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from "jsonwebtoken";
import User from "../Model/User";

const protectedMiddleware = async (req: Request, res: Response, next: NextFunction) => {

}