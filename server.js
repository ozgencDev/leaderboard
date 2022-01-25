const express = require("express");
const { connectRedis } = require("./config/redis.config");
const connectMongo = require("./config/mongo.config");
const apiRouter = require("./router/api.route");
const app = express();

connectMongo();
connectRedis();

app.use("/api", apiRouter);

app.listen(3000, function () {
  console.log("Server listening port 3000");
});
