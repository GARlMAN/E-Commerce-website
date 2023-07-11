
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

//set up express 
const app = express();

// config
dotenv.config({path:"backend/config/config.env"});



const fileUpload = require("express-fileupload");
//cookie paser to get cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(cors({
  origin: 'https://ecommerece-48lm.onrender.com',
  credentials: true,
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(fileUpload());
const errorMiddleWear = require("./middlewear/error")
//require body parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));




//Route imports
const prodcts = require("./routes/productRoute.js");
const user = require("./routes/userRoutes.js");
const order = require("./routes/orderRoute.js");
const payment = require("./routes/paymentRoute");
app.use("/api/v1", prodcts);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
//Middle wear for errosr 
app.use(errorMiddleWear);

module.exports = app;