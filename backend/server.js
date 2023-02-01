const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js")
//Handling uncaught Exceptions
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server");

    process.exit(1);

})



// config
dotenv.config({path:"backend/config/config.env"});

// connect database
connectDatabase();



const port = process.env.PORT || 5000;
const server = app.listen(port, ()=>{
    console.log(`Listening to ${port}...`);
})

app.get("/", (req, res) => {
    res.send("<h1>working</h1>")
  })



  //unhandled errors
  process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server");
    server.close(() => {
        process.exit(1);
    })
  })
  