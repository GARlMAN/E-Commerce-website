const Orders = require("../schema/orderSchema");0
const Products = require("../schema/productSchema");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncError = require("../middlewear/catchAsyncErrors");
const apiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middlewear/catchAsyncErrors");

//create new order
exports.newOrder = CatchAsyncError(async(req, res, next) => { 
    const {orderItems, shippingInfo, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice} = req.body;
    const order = await Orders.create({
        orderItems, shippingInfo, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });
    res.status(201).json({
        success: true,
        order,
    });
})