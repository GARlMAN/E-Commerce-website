const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter product name"],
        trim: true
        
    },
    discription:{
        type:String,
        required:[true, "Please Enter Discription"],
    },
    price:{
        type:Number,
        required:[true, "Please Enter Price"],
        maxLength:[8, "Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[
        {
            publicID:{
                type: String,
                required:true
            },
            url:{
                type: String,
                required:true
            }
        }
    ],
    category:{
        type: String,
        required: [true, "Please Enter category"],
    
    },
    Stock:{
        type: Number,
        required: [true, "Please Enter product stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    }, 
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
              },
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    createAT:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Products", productsSchema);