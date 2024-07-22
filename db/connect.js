const mongoose = require("mongoose");

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in .env file");
}

function connectDB() {
  const mongoURI = process.env.MONGO_URI;
  return mongoose.connect(mongoURI);
}

module.exports = connectDB;
