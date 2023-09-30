const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://Bashir00219:Bashir%40321@cluster0.qdp9bbt.mongodb.net/your_database?retryWrites=true&w=majority";

// Function to connect with MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB  successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;
