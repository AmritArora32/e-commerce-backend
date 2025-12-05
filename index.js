import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
dotenv.config();
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// connect to db
connectDB();

app.use(cors());
app.use(express.json());

// API endpoints
app.use("/images", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/product",productRoutes);

// app.use("/", (req, res)=>{
//     res.send("Response is Send");
// })

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});

