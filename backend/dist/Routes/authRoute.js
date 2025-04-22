"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../Controllers/authController");
const router = express_1.default.Router();
router.post('/register', authController_1.registerRoute);
router.post('/login', authController_1.login);
exports.default = router;
// This code defines an Express router for handling authentication routes. It imports the necessary modules, including the Express library and a controller function for user registration. The router is created using `express.Router()`, and a POST route is defined for user registration, which calls the `registerRoute` function when a request is made to "/register". Finally, the router is exported for use in other parts of the application.
