import express, { RequestHandler } from 'express';
import { RegNewBook } from '../Controllers/bookController';


const router = express.Router();

router.post('/register', RegNewBook as RequestHandler);