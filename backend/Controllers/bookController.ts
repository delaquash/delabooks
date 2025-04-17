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

export const getBooks = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit
        const books = await Books.find()
                            .sort({ createdAt: -1 })
                            .skip(skip)
                            .limit(limit)
                            .populate('user', 'username profileImage')

        const totalBooks = await Books.countDocuments()
        const totalPages = Math.ceil(totalBooks / limit)|| 1
        const currentPage = page > totalPages ? totalPages : page
        const hasNextPage = currentPage < totalPages
        res.status(200).json({
            success: true,
            books,
            totalBooks,
            totalPages,
            currentPage,
            // hasNextPage
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const deleteBooks = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // first you get the book by ID
        const book = await Books.findById(req.params.id);
        if (!book) res.status(404).json({ message: 'Book not found' });

        // check if the book belongs to the user who is deleting it
        if(book?.user.toString() !== req.user?._id.toString()) res.status(401).json({ message: 'Unauthorized' });
        
        // delete from cloudinary
        if(book?.image && book.image.includes("cloudinary")) {
            try {
                const imagePublicId = book?.image.split("/").pop()?.split(".")[0]
                await cloudinary.uploader.destroy(imagePublicId!) 
            } catch (deleteError) {
                console.log("Delete error", deleteError)
            }
        }
        // delete
        await book?.deleteOne()

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    }
}