const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db successfully :)");
  } catch (error) {
    console.log(`Connected to db failed :( ${error}`);
    return error;
  }
};

module.exports = connectToDB;
