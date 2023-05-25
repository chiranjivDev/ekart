import express from 'express';

import {getProduct, getProducts, createProduct, updateProduct, deleteProduct} from '../controllers/productController.js';
import protect, {isAdmin} from '../middleware/authMiddleware.js';
const router = express.Router();


router
    .route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct)


router
    .route('/:id')
    .get(getProduct)
    .put(protect, isAdmin, updateProduct)
    .delete(protect, isAdmin, deleteProduct)

export default router;