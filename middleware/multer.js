import multer from "multer";

const storage = multer.diskStorage({  
    destination: "uploads",
    filename: (req,file,callback) =>{
        return callback(null, `${Date.now()}${file.originalname}`);
    },
});
export const upload = multer({storage: storage});
