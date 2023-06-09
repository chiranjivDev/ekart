import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public 
export const getProducts = asyncHandler(async(req, res)=>{

    // Pagination
        // Items per page
        const pageSize = 2; 
        // Current page number
        const page = Number(req.query.pageNumber) || 1;


    const keyword = req.query.keyword ? {
        name : {
            $regex : req.query.keyword,
            $options : 'i'
        } 
    } : {}

    // count the number of products
    const count = await Product.count({...keyword});

    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1));
    res.json({products, page, pages:Math.ceil(count / pageSize)});
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
 
   const product = new Product({
        name: 'Sample Product',
        user:req.user._id,
        price : 0,
        image: 'images/sample.jpg',
        brand: 'sample brand',
        category:'sample category',
        countInStock : 0,
        numReviews : 0,
        description : 'sample deacription'
   })

   const createdProduct = await product.save();
   res.status(201).json(createdProduct)

   })



// @desc   Update product
// @route  PUT /api/products/:id
// @access Private 
export const updateProduct = asyncHandler(async(req, res)=>{
    const {
        name, price,image, brand, category, countInStock, description
    } = req.body;

   const product = await Product.findById(req.params.id);

   if(product){
    product.name = name || product.name,
    product.price = price || product.price,
    product.image = image || product.image,
    product.category = category || product.category,
    product.description = description || product.description,
    product.brand = brand || product.brand,
    product.countInStock = countInStock || product.countInStock

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct)
   }else{
    res.status(404)
    throw new Error('Product not found!')
   }

})


// @desc   delete product
// @route  DELETE /api/products/:id
// @access Private 
export const deleteProduct = asyncHandler(async(req, res)=>{
    const product=await Product.findByIdAndDelete(req.params.id);
    if(product){
        await product.deleteOne();
        res.json({message: 'Product removed!'})
    }else{
        res.status(404)
        throw new Error('Product not found!')
    }
})


// desc     Create review
// route    POST /api/products/:id/reviews
// access   PRIVATE
export const createProductReview = asyncHandler(async(req, res)=>{ 
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed');
        }

        const review = {
            name : req.user.name,
            rating : Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, curr)=>{
            return acc += curr.rating
        }, 0) / product.reviews.length

        console.log(product)
        await product.save();
        res.status(201).json({message : 'Review added'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }

})

