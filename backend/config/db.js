// config/db.js
const mongoose = require("mongoose");

// const db = process.env.MONGO_URI;
const db = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/myapp", {
    // await mongoose.connect("mongodb://192.168.49.2:32194/myapp", {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
