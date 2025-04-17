import express, { RequestHandler } from 'express';
import { RegNewBook } from '../Controllers/bookController';
import authMiddleware from '../utils/authMiddleware';

const router = express.Router();

router.post('/register-book', authMiddleware, RegNewBook);
// router.get('/get-book', authMiddleware, GetBook as RequestHandler);

export default router;