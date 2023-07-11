const moongose = require("mongoose");



const connectDatabase = () =>{
    moongose.connect(process.env.MONGO_CONNECTION)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log(`Error encountered while connecting to db: ${err}`));
}

module.exports = connectDatabase;


