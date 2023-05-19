import express from 'express';
const router=express.Router();
import {login, getUserProfile, register, updateUserProfile, getUsers} from '../controllers/userController.js';
import protect, {isAdmin} from '../middleware/authMiddleware.js';


router
    .route('/')
    .post(register)
    .get(protect, isAdmin, getUsers)
    
router  
    .route('/login')
    .post(login)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router;