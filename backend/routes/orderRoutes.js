import express from 'express';

const router =express.Router();

import {createOrder, getOrderbyId, updateOrderToPaid} from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'

router
    .route('/')
    .post(protect, createOrder)

router
    .route('/:id')
    .get(protect, getOrderbyId)

router
    .route('/:id/pay')
    .get(protect, updateOrderToPaid)


export default router;