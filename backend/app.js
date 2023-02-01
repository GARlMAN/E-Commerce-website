
const express = require("express");
const cors = require("cors");
//set up express 
const app = express();
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const errorMiddleWear = require("./middlewear/error")
//require body parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

//cookie paser to get cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());


//Route imports
const prodcts = require("./routes/productRoute.js");
const user = require("./routes/userRoutes.js");
const order = require("./routes/orderRoute.js")
app.use("/api/v1", prodcts);
app.use("/api/v1", user);
app.use("/api/v1", order);
//Middle wear for errosr
app.use(errorMiddleWear);

module.exports = app;