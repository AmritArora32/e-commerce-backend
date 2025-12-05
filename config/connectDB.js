import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");

        // Drop the unique index on price if it exists (to fix existing database)
        try {
            const indexes = await Product.collection.indexes();
            const priceIndex = indexes.find(idx => idx.name === "price_1");
            if (priceIndex) {
                await Product.collection.dropIndex("price_1");
                console.log("Dropped unique index on price field");
            }
        } catch (indexError) {
            // Index doesn't exist or already dropped, ignore error
            console.log("Note: Could not remove price index (may not exist):", indexError.message);
        }

    }
    catch (error) {
        console.log("Error in Database Connection");
    }
}