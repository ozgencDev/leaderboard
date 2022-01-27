const Redis = require("ioredis");
require("dotenv").config();

const client = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

function connectRedis() {
  client.on("error", (err) => {
    console.log(err);
  });
  client.once("ready", () => {
    console.log("Connected to Redis");
  });
}

module.exports = { connectRedis, client };
