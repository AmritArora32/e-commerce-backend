import User from './../models/user.model.js';
import bcrypt from "bcryptjs";

export const register = async(req,res) =>{
    try{
        const {firstName, lastName, email, password} = req.body;
        // console.log(firstName, lastName, email, password);
        const image_filename = `${req.file.filename}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: image_filename,
        });
        console.log("user" , user);
        return res
        .status(201)
        .json({message: "user created Succesfully", success: true, user});
    }
    catch(error){
        return res
        .status(500)
        .json({message: "internal server error", success: false});
    }
}

export const login = async(req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res
            .status(404)
            .json({message: "user not found", success: false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res
            .status(401)
            .json({message: "invalid credentials", success: false});
        }
        return res
        .status(200)
        .json({message: "Login successful", success: true, user});
    }
    catch(error){
        return res
        .status(500)
        .json({message: "internal server error", success: false});
    }
}
