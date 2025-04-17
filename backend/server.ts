import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import authRoute from "./Routes/authRoute";
import bookRoute from "./Routes/bookRoute";
import { connectDB } from "./config/db";
import errorHandler from './utils/errorHandler';


const app = express();
const PORT  = process.env.PORT

app.use(express.json())
app.use(cors)
// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/book", bookRoute);

app.get("/", (req, res) => {
    res.send("Hello World!")
})

// Error handling middleware should be last
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB()
})
