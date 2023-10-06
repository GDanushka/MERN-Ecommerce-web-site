const Order = require('../models/orderModel');
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require( "../middleware/catchAsyncError" );

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });
    res.status(201).json({
        success: true,
        order,
    });
});

// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    // Find the order by its ID and populate the "user" field with "name" and "email"
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    // Check if the order exists
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    res.status(200).json({
        success: true,
        order
    });
});


// get Logged in user Orders
exports.getmyOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json({
        success: true,
        orders
    })
});

// get all Orders --admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });
    res.status( 200 ).json( {
        success: true,
        orders
    } );
});

// update order status --admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById( req.params.id );

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("you have already delivered this order", 400));
    }   

    { if ( order.orderStatus === "Shipped" )
        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity);
        });
    }
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    })
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


// delete Order --admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    await order.deleteOne();
    res.status(200).json({
        success: true,
    });
});