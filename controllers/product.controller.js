import Product from '../models/product.model.js'

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json(error);
    }
};

export const addProduct = async (req,res)=>{
    try{
        // Check if file was uploaded
        if(!req.file){
            return res
            .status(400)
            .json({message:"Image file is required", success:false});
        }

        const {name, category, price, description} = req.body;
        
        // Validate required fields
        if(!name || !category || !price || !description){
            return res
            .status(400)
            .json({message:"All fields are required", success:false});
        }

        const image_filename = `${req.file.filename}`;

        const product = await Product.create({
            name,
            category,
            price,
            description,
            image: image_filename,
        });
        res
        .status(201)
        .json({product, message:"Product added successfully", success:true});
    }catch(error){
        console.error("Error adding product:", error);
        res
        .status(500)
        .json({message:error.message || "Failed to upload product", success:false});
    }
};