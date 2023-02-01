const ErrorHandler = require("../utils/errorhandler.js");


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal Error";

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path} (cast error)`;
        err = new ErrorHandler(message, 400);
      }

    //Mongoose dublicate key Error
    if(err.code === 11000){
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }  
  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

    res.status(err.statusCode).json({
        success:false, 
        error: `${err.message}`
    });
};