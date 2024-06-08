const mongoose = require("mongoose");

const connectMongoDB = async () => {
  mongoose.set("strictQuery", true);
  const conb = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Connected to MongoDB: ${conb.connection.host}`);
};

module.exports = connectMongoDB;