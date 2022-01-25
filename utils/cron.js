const cron = require("node-cron");
const axios = require("axios");
const User = require("../models/user.model");
const _ = require("lodash");

const PrizePool = require("../models/prize-pool.model");

const task = cron.schedule("* * * * *", async () => {
  const prize20 = await PrizePool.calcPercent(20);
  const prize15 = await PrizePool.calcPercent(15);
  const prize10 = await PrizePool.calcPercent(10);
  const prize55 = (await PrizePool.calcPercent(55)) / 97;
  console.log(prize20, Math.ceil(prize15), prize10, Math.ceil(prize55));
  const leaderboard = await axios.get(`http://localhost:3000/api/leaderboard`);
  User.addCoin(await leaderboard.data[0].id, Math.ceil(prize20));
  User.addCoin(await leaderboard.data[1].id, Math.ceil(prize15));
  User.addCoin(await leaderboard.data[2].id, Math.ceil(prize10));
  const smallPrizeArr = await leaderboard.data.slice(3, 100);
  smallPrizeArr.forEach(async (user) => {
    User.addCoin(user.id, Math.ceil(prize55));
  });
  PrizePool.deletePrize();
});

module.exports = task;
