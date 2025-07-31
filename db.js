const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; //hotels is database name and this is for local database which runs on  my computer

//const mongoURI = process.env.MONGO_URI; for deployed database


//setup mongodb connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})

//get the default connection
//mongoose maintains a default connection object representing the mongodb connection

const db = mongoose.connection;

//event listeners
db.on('connected', () => {
  console.log("connected to mongodb server");
});

db.on('disconnected', () => {
  console.log("disconnected from mongodb server");
});

db.on('error', (error) => {
  console.log("error in database", error);
});

module.exports = db;


