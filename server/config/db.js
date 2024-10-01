const { MongoClient } = require('mongodb');
// const dotenv = require('dotenv');


// dotenv.config();

// const uri = process.env.MONGODB_URI;
// console.log('uri', uri);
// let client;
//  const connectDB = async () => {
//   if (client) {
//     console.log('MongoDB is already connected!');
//     return client;
//   }

//   try {

//     client = new MongoClient(uri, {
//       serverSelectionTimeoutMS: 5000, 
//       // connectTimeoutMS: 100000, 
//     });


//     await client.connect();
//     console.log('MongoDB connected successfully');


//     await client.db('admin').command({ ping: 1 });
//     console.log('MongoDB ping successful');

//     return client;
//   } catch (error) {
//     console.log("error connectings");
    
//     handleDBErrors(error);
//     process.exit(1); 
//   }
// };


// const handleDBErrors = (error) => {
//   if (error.name === 'MongoNetworkError') {
//     console.error('Network Error: Unable to connect to MongoDB. Please check your network connection.');
//   } else if (error.name === 'MongoServerSelectionError') {
//     console.error('Server Selection Error: MongoDB server is not available. Please check the server status.');
//   } else if (error.name === 'MongoTimeoutError') {
//     console.error('Timeout Error: Connection attempt to MongoDB timed out.');
//   } else {
//     console.error('MongoDB Error:', error.message);
//   }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
console.log('uri', uri);

const connectDB = async () => {
  try {await mongoose.connect(uri, {});
  console.log('MongoDB connected successfully');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
