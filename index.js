import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// connect to db
connectDB();

app.use(cors({
    origin: ["https://delicious-e-commerce-site.vercel.app", 
        "http://localhost:5173", 
        "http://localhost:3000"],
    credentials: true
}));
app.use(express.json());
app.get('/',(req,res) =>{
    res.send({
        activeStatus:true,
        error:false,
    })
});
// API endpoints
app.use("/user", userRoutes);
app.use("/product", productRoutes);

// app.use("/", (req, res)=>{
//     res.send("Response is Send");
// })

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});

