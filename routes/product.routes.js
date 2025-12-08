import express from 'express';

import {upload} from '../middleware/multer.js';
import { addProduct, getProducts } from '../controllers/product.controller.js';
import { testConnection } from '../controllers/cloudinary.controller.js';

const router = express.Router();
router.post("/create", upload.single("image"), addProduct);
router.get("/get", getProducts);
router.get("/test-cloudinary", testConnection); // Test Cloudinary connection

export default router;