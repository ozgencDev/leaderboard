const Redis = require("ioredis");

const client = new Redis({
  host: "127.0.0.1",
  port: 6379,
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
