"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../Controllers/bookController");
const authMiddleware_1 = __importDefault(require("../utils/authMiddleware"));
const router = express_1.default.Router();
router.post('/register-book', authMiddleware_1.default, bookController_1.RegNewBook);
router.get('/get-book', authMiddleware_1.default, bookController_1.getBooks);
router.put("/update-book/:id", authMiddleware_1.default, bookController_1.editBook);
router.get("/user/:id", authMiddleware_1.default, bookController_1.getBookUserById);
router.delete("/delete-book/:id", authMiddleware_1.default, bookController_1.deleteBooks);
// router.get('/get-book', authMiddleware, GetBook as RequestHandler);
exports.default = router;
