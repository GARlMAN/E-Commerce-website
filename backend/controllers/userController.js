const User = require("../schema/userSchema");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncError = require("../middlewear/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middlewear/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const { now } = require("mongoose");
const crypto = require("crypto");

//Register user
exports.registerUser = CatchAsyncError (async (req, res) => { 
    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avtar:{
            publicID: "this is a sample id",
            url: "this is a sample url"
        }

    });
    sendToken(user, 201, res);
})




//Login User
exports.loginUser = CatchAsyncError(async(req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email ID and password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email ID and password", 401));
    }

    const isPassword = await user.comparePassword(password);

    if(!isPassword){
        return next(new ErrorHandler("Invalid email ID and password", 401));
    }

    sendToken(user, 200, res);
})


// Logout User
 exports.logoutUser = CatchAsyncError(async (req, res)=>{

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out succesfully"
    })
 })


 //function for forgot password
 exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return new ErrorHandler("User not found", 404);
    }
   
    
    // Get Reset password token
    const restPasswordToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});
    console.log(restPasswordToken)
    const resetPasswordURL  = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${restPasswordToken}`;
    const message = `Your reset token is :- \n\n ${resetPasswordURL}\n\n if you have not requested this email then please ignore it`;

    try{
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Reset",
            message
        })

        return res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} succesfully`

        })

    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        user.save({validateBeforeSave: false})
        return next(new ErrorHandler(err.message, 500));
    }
 })


 //reset the given password 
    exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
        //creating Token hash
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()},

        })

        if(!user){
            return next(new ErrorHandler("Reset password token is invalid or has been expired ", 401));
        }

        if(req.body.password !=req.body.confirmPassword){
            return next(new ErrorHandler("Passwords doesn't match ", 401));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        //send token to login to the given account
        sendToken(user, 200, res);
    })


    //get user details
    exports.getUser = catchAsyncErrors(async (req, res, next) => { 
        const user = await User.findById(req.user.id)

        res.status(200).json({
            success: true,
            user
        })
    })

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  });


  // update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email
    }

    //we will add cloudniary later

    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,

    })
  });



  //admin get all users in the server

//--------------admin------------------------get user//
exports.getallUsers = CatchAsyncError (async (req, res) => { 
    const user = await User.find();
    res.status(201).json({
        success: true,
        user
    })
})

// get deatils of a single user by ID
exports.adminGetUserID = CatchAsyncError (async (req, res, next) => { 
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler($`User does not exist with id ${req.params.id}`), 400)
    }
    res.status(201).json({
        success: true,
        user
    });
})


//update roles of user
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //we will add cloudniary later
    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,

    });
  });

  // delete User 

    exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(`User does not exist with id ${req.params.id}`), 400)
        }
        user.remove();
        res.status(200).json({
            success: true,
            message: "User has been deleted"
    
        }); 
    })