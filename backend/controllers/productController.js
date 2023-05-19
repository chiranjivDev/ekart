import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public 
export const getProducts = asyncHandler(async(req, res)=>{
        const products=await Product.find();
        res.json(products);
})

// @desc   Fetch single products
// @route  GET /api/products/:id
// @access Public 
export const getProduct = asyncHandler(async(req, res)=>{
    const product=await Product.findById(req.params.id);
    res.json(product);
})


// @desc   Add product
// @route  POST /api/products/
// @access Private 
export const createProduct = asyncHandler(async(req, res)=>{
    // const product=await Product.create(req.body);
    // res.send(product);
    res.send('add product')
})


// @desc   Update product
// @route  PUT /api/products/:id
// @access Private 
export const updateProduct = asyncHandler(async(req, res)=>{
    // const product=await Product.findByIdAndUpdate(req.params.id, req.body);
    // res.send(product);
    res.send('update product')
})


// @desc   delete product
// @route  DELETE /api/products/:id
// @access Private 
export const deleteProduct = asyncHandler(async(req, res)=>{
    // const product=await Product.findByIdAndDelete(req.params.id);
    // res.send(product);

    res.send('delete product')
})

