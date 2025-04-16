import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import authRoute from "./Routes/authRoute";
import { connectDB } from "./config/db";


const app = express();
const PORT  = process.env.PORT

app.use(express.json())
// Routes
app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB()
})
