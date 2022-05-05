//const { MongoClient } = require('mongodb');


//Import the mongoose module
const mongoose = require('mongoose');
const db = require("../models");

const dbConnection=()=>{
    const connectionString = process.env.MONGO_LOCAL
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,autoIndex: true});
    //Get the default connection
    let dbConnection = mongoose.connection;
    console.log(dbConnection)
    //Bind connection to error event (to get notification of connection errors)
    dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    dbConnection.once("open", function() {
        console.log("MongoDB database connection established successfully");
      });
    
}

const connectDB = async () => {
    const connectionString = process.env.MONGO_LOCAL
    console.log(connectionString)
    db.mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  }); 

};


module.exports = {
  dbConnection,
  connectDB
};