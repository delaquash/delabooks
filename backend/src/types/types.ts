import { Types } from "mongoose";

export interface IBookSchema {
    title: string;
    caption: string;
    description: string;
    rating: number;
    price: number;
    image: string;
    user: Types.ObjectId;
}

export interface IUSER {
  username: string;
  password: string;
  email: string;
  profileImage: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
}

export interface IUserRequest extends Request {
  user?: {
    _id: string;
    isAdmin: boolean;
  };
}

export interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}