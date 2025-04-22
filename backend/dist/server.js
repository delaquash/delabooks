"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./Routes/authRoute"));
const bookRoute_1 = __importDefault(require("./Routes/bookRoute"));
const db_1 = require("./config/db");
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// job.start()
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1/auth", authRoute_1.default);
app.use("/api/v1/book", bookRoute_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Error handling middleware should be last
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    (0, db_1.connectDB)();
});
