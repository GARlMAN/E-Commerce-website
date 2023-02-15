const Products = require("../schema/productSchema");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncError = require("../middlewear/catchAsyncErrors");
const apiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middlewear/catchAsyncErrors");



//Create Products -- Admin
exports.createProducts = CatchAsyncError (async (req, res) => {
    req.body.user = req.user.id;


    const product = await Products.create(req.body);
    res.status(201).json({
        success: true,
        product,
    })
});

//CatchAsyncError is try catch block 
//Get Products -- 
exports.getAllProducts = CatchAsyncError (async(req, res, next) => {
    const productsCount = await Products.countDocuments();
    const resultPerPage = 8;


    //make a new object using apiFeatures
    const ApiFeatures = new apiFeatures(Products.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    const products = await ApiFeatures.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    })
});

// Get Product Details
exports.productDeatils = CatchAsyncError (async (req, res, next) => {
    const product = await Products.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        product,
        
    })
});

//Update products -- Admin
exports.updateProducts = CatchAsyncError(async(req, res, next) => {
    let product = await Products.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: false,
        product
    })
});

// Delete Products -- Admin
exports.deleteProducts = CatchAsyncError(async(req, res, next) => {
    let product = await Products.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted"
    })
});


// Create new Review or Update Review
exports.createProductReview = CatchAsyncError(async(req, res, next) => {

    const {rating, comment, productID} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Products.findById(productID);
    const isRevied = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
    if(isRevied){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
               ( rev.rating = rating), (rev.comment = comment);
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    })

    product.rating = avg/product.reviews.length

    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success: true,
    })
})


//get all reviews
exports.getAllReviews = catchAsyncErrors(async(req, res, next)=>{
    const product = await Products.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404))
    }
    res.status(200).json({
        success: true,
        review: product.reviews,
    });
});

//delete review
exports.deleteReviews = catchAsyncErrors(async(req, res, next)=>{
    const product = await Products.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Products.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
});