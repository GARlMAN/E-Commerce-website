//Creates a new custom error object for errors
class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;