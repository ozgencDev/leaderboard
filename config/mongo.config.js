const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/panteon", {
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
