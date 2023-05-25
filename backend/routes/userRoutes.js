import express from 'express';
const router=express.Router();
import {login, getUserProfile, register, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} from '../controllers/userController.js';
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

router.route('/:id')
    .get(protect, isAdmin, getUserById)
    .delete(protect, isAdmin,  deleteUser)
    .put(protect, isAdmin, updateUser)

export default router;