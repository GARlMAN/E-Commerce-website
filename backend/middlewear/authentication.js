
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");


//check if user is logged in or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next)=> {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to acess this resource",401))
    }
    //Decode the given token from the cookie
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    //give this to the next person
    req.user = await User.findById(decodedData.id);

    next();
})

//this checks if a given USER is an admin or not
exports.authorizeRoles = (...roles) => {
    
    return (req, res, next) => {

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`role: ${req.user.role} is not allowed to access this resource`, 403))
        }
        next();
    }
}