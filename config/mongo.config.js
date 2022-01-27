const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoConnection = mongoose.connection;

const connectMongo = () => {
  mongoConnection.on("error", (err) => {
    console.log(err);
  });
  mongoConnection.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectMongo;
