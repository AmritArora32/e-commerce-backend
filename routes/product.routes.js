import express from 'express';

import {upload} from '../middleware/multer.js';
import { addProduct, getProducts } from '../controllers/product.controller.js';

const router = express.Router();
router.post("/create", upload.single("image"),addProduct);
router.get("/get", getProducts);

export default router;