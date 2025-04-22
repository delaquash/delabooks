"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});
const Books = mongoose_1.default.model("Books", BookSchema);
exports.default = Books;
