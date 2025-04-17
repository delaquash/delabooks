import express from 'express';
import { editBook, getBooks, getBookUserById, RegNewBook } from '../Controllers/bookController';
import authMiddleware from '../utils/authMiddleware';

const router = express.Router();

router.post('/register-book', authMiddleware, RegNewBook);
router.get('/get-book',authMiddleware, getBooks);
router.put("/update-book/:id", authMiddleware, editBook);
router.get("/user/:id", authMiddleware, getBookUserById);

router.delete("/delete-book/:id", authMiddleware, RegNewBook);
// router.get('/get-book', authMiddleware, GetBook as RequestHandler);

export default router;