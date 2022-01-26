const express = require("express");
const { connectRedis } = require("./config/redis.config");
const connectMongo = require("./config/mongo.config");
const apiRouter = require("./router/api.route");
const playRouter = require("./router/play.route");
const cors = require("cors");
const task = require("./utils/cron");
const app = express();

connectMongo();
connectRedis();

app.use(cors());
app.use("/api", apiRouter);
app.use("/play", playRouter);

task.start();

app.listen(3000, function () {
  console.log("Server listening port 3000");
});
