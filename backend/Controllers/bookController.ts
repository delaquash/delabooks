import { NextFunction, Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import { IBookSchema } from '../types/types';
import Books from '../Model/Book';

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

export const RegNewBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { caption, description, image, price,rating,  title } = req.body as IBookSchema

        if(!caption || !description || !image || !price || !rating || !title) {
             res.status(400).json({ message: "Provide all fields."})
             return
        }

        // Upload to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image)
        const imageUrl = uploadResponse.secure_url

        // save to database
        const newBook = new Books({
            title,
            caption,
            rating,
            description,
            image: imageUrl,
            user: req.user?._id
        })

        await newBook.save()
    } catch (error: any) {
        console.log(error)
         res.status(500).json({ message: error.message })

    }
}