import express, { RequestHandler } from 'express';
import { login, registerRoute } from '../Controllers/authController';

const router = express.Router();
router.post('/register', registerRoute as RequestHandler);
router.post('/login', login as RequestHandler);

export default router;
// This code defines an Express router for handling authentication routes. It imports the necessary modules, including the Express library and a controller function for user registration. The router is created using `express.Router()`, and a POST route is defined for user registration, which calls the `registerRoute` function when a request is made to "/register". Finally, the router is exported for use in other parts of the application.
