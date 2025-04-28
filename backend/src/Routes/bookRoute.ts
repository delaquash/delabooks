import express from 'express';
import { deleteBooks, editBook, getBooks, getBookUserById, RegNewBook } from '../Controllers/bookController';
import authMiddleware from '../utils/authMiddleware';

const router = express.Router();

router.post('/register-book', authMiddleware, RegNewBook);
router.get('/get-book',authMiddleware, getBooks);
router.put("/update-book/:id", authMiddleware, editBook);
router.get("/user/:useId", authMiddleware, getBookUserById);

router.delete("/delete-book/:id", authMiddleware, deleteBooks);
// router.get('/get-book', authMiddleware, GetBook as RequestHandler);

export default router;