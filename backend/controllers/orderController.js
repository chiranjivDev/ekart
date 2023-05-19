import Order from '../models/OrderModel.js';
import asyncHandler from 'express-async-handler';


// @desc    Create new Order
// @route   POST /api/orders/
// @access  Private
export const createOrder = asyncHandler( async(req, res)=> {
    const {
            orderItems,  
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body;

    if(!orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No Order items!');
    }else {
        const order = new Order({
            orderItems,
            user : req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
    }
})


// @desc    Get Order By Id
// @route   GET /api/orders/:id
// @access  Private
export const getOrderbyId = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order){
        res.json(order);
    }else{
        res.status(404)
        throw new Error('Order not found');
    }
})



// @desc    Update Order To Paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export  const updateOrderToPaid= asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email:req.body.payer.email_address,
        }

        const updatedOrder = await order.save();


    }else{
        res.status(404)
        throw new Error('Order not found');
    }
})