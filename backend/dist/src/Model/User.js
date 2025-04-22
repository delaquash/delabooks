"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
// hash password before saving to database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    if (this.password.length < 6)
        return next(new Error("Password must be at least 6 characters"));
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
    next();
});
UserSchema.methods.comparePassword = async function (userPassword) {
    return bcryptjs_1.default.compare(userPassword, this.password);
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
