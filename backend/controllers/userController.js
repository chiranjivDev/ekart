import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async(req, res) => {

        const {email, password}=req.body;

        const user = await User.findOne({email});
        
        if(user && (await user.matchPassword(password))){
            res.json({
                id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
        })
        }else{
            res.status(401)
            throw new Error('Invalid credentials')
        }
       

    }
)

// @desc    Register user
// @route   POST /api/users
// @access  Public
export const register = asyncHandler(async(req, res) => {

        const {name, email, password}=req.body;

        const userExists = await User.findOne({email});
        
        if(userExists){
            res.status(400)
            throw new Error('User already exists!')
        }
       
        const user = await User.create({name, email, password});

        if(user){
            res.status(201).json({
                id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)})
        }else{
            res.status(400)
            throw new Error('Invalid user data!')
        }

    }
)

// @desc    Get logged in user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async(req, res) => {
   
    const user=await User.findById({_id:req.user._id}).select("-password");
    if(user){
        console.log(user)
        res.json(user)
    }else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
}
)

// @desc    Update logged in user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async(req, res) => {
   
    const user=await User.findById({_id:req.user._id}).select("-password");

    if(user){
        console.log(user)
       user.name=req.body.name || user.name;
       user.email=req.body.email || user.email;
       if(req.body.password){
        user.password = req.body.password
       }

       const updatedUser = await user.save();
       res.json({
        id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        token:generateToken(updatedUser._id)
        })  

    }else{
        res.status(404)
        throw new Error('User not found!')
    }
}
)

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async(req, res)=>{
    const users= await User.find({});
    res.json(users);
})


// @desc    Get user by ID 
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async(req, res)=>{
    const user= await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user);
    }else{
        res.status(404)
        throw new Error('User not found!')
    }
})

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private/admin
export const updateUser = asyncHandler(async(req, res) => {
   
    const user=await User.findById(req.params.id)

    if(user){
       user.name=req.body.name || user.name;
       user.email=req.body.email || user.email;
       user.isAdmin = req.body.isAdmin; 

       const updatedUser = await user.save();
       res.json({
        id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        })  

    }else{
        res.status(404)
        throw new Error('User not found!')
    }
}
)


// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async(req, res)=>{
    const user= await User.findById(req.params.id);
    if(user){
        await user.deleteOne();
        res.json({
            message: 'User removed!'
        })
    }else{
        res.status(404)
        throw new Error('User not found!')
    }
    
})