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

export const RegNewBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
            price,
            rating,
            description,
            image: imageUrl,
            user: req.user?._id
        })

        await newBook.save();
         // Add this response to complete the request
         res.status(201).json({
            success: true,
            message: "Book created successfully",
            book: newBook
        });
    } catch (error: any) {
        console.log(error)
         next(error)

    }
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Retrieves a paginated list of books from the database, sorted by creation date.
 * 
 * This function accepts query parameters to determine the pagination settings:
 * - `limit`: Number of books to return per page. Defaults to 10 if not provided.
 * - `page`: The page number to retrieve. Defaults to 1 if not provided.
 * 
 * The response includes the following details:
 * - `success`: Boolean indicating the operation's success.
 * - `books`: Array of book objects, each populated with the username and profile image of the owner.
 * - `totalBooks`: Total number of books in the database.
 * - `totalPages`: Total number of pages available based on the limit.
 * - `currentPage`: The current page number, adjusted to not exceed `totalPages`.
 * 
 * In case of an error during retrieval, the error is logged and passed to the next middleware.
 * 
 * @param req - Express request object containing query parameters `limit` and `page`.
 * @param res - Express response object used to send the JSON response.
 * @param next - Express next function to pass control to the next middleware.
 */

/*******  8f07c002-cbed-4f87-aeab-2f1dc50743c8  *******/
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
        next(error)
    }
}

// export const getBookUser = async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user?._id
//         const bookUser = await Books.find({ user }).sort({ createdAt: -1 })
//         res.status(200).json({ bookUser })
//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// }

export const getBookUserById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the user ID from the request parameters
        const userID = req.params.userId;
        
        // Check if the user ID is valid (e.g., a valid ObjectId format)
        const authenticatedUserId = req.user?._id; // Get the authenticated user's ID from the request
        
        // Ensure the user is authenticated
        if (userID !== authenticatedUserId.toString()) {
            res.status(403).json({ message: 'Unauthorized to access this user\'s books' });
            return;
        }
          
        // Find the books in the database using the user ID
        const book = await Books.find({user: userID}).sort({ createdAt: -1 })
        if (!book) {
            res.status(404).json({ message: 'Books not found for this user' });
            return;
        }

        // Respond with the found books
        res.status(200).json({ book });
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}


export const editBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.id; // Get the book ID from the request parameters
      const userId = req.user?._id; // Get the authenticated user's ID from the request
  
      // Ensure the user is authenticated
      if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
      }
  
      // Find the book in the database using the ID
      const book = await Books.findById(bookId);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
        return;
      }
  
      // Check that the authenticated user is the owner of the book
      if (book.user.toString() !== userId.toString()) {
        res.status(403).json({ message: 'Unauthorized to edit this book' }); // Use 403 for forbidden
        return;
      }
  
      // Destructure updated fields from the request body
      const { title, caption, rating, description, price, image } = req.body;
  
      // If the image is different and is a Cloudinary image, delete the old one and upload the new one
      if (image && image !== book.image && book.image.includes("cloudinary")) {
        try {
          // Extract the public ID from the existing image URL for Cloudinary deletion
          const urlParts = book.image.split("/");
          const fileNameWithExt = urlParts[urlParts.length - 1]; // Get the last part of the URL (filename)
          const imagePublicId = fileNameWithExt.split(".")[0]; // Remove extension
  
          if (imagePublicId) {
            await cloudinary.uploader.destroy(imagePublicId); // Delete the old image from Cloudinary
          }
  
          // Upload the new image to Cloudinary and set the new URL on the book
          const uploadedImage = await cloudinary.uploader.upload(image);
          book.image = uploadedImage.secure_url;
        } catch (cloudinaryError) {
          // Handle any errors from Cloudinary
          console.error("Cloudinary operation failed:", cloudinaryError);
          res.status(500).json({ message: 'Image processing failed' });
          return;
        }
      }
  
      // Conditionally update book fields only if new values are provided
      if (title !== undefined) book.title = title;
      if (caption !== undefined) book.caption = caption;
      if (rating !== undefined) book.rating = rating;
      if (description !== undefined) book.description = description;
      if (price !== undefined) book.price = price;
  
      // Save the updated book back to the database
      await book.save();
  
      // Respond with success and the updated book data
      res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
      // Pass any unexpected errors to the centralized error handler
      next(error);
    }
  };
  

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
        next(error)
    }
}