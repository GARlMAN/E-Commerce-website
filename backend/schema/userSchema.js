const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require:[true, "Please Enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email:{
        type: String,
        require:[true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid Email"]
    },
    password:{
        type: String,
        require:[true, "Please Enter your password"],
        minLength: [8, "password should have more than 8 characters"],
        select: false,
    },
    avtar:{
        publicID:{
            type: String,
            required:true
        },
        url:{
            type: String,
            required:true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//stuff to execute just before saving
userSchema.pre("save", async function(next){
    // so it doesn't double hash a password
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({
        id:this._id,
}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE 
})
};

//Compare password methods
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generating Password Password Token
userSchema.methods.getResetPasswordToken =  function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding to user Schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken
}

module.exports = mongoose.model("User", userSchema);