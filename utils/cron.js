const cron = require("node-cron");
const axios = require("axios");
const User = require("../models/user.model");
const LeaderBoardModel = require("../models/board.model");
const boardModel = new LeaderBoardModel();
const PrizePool = require("../models/prize-pool.model");

const task = cron.schedule("* * * * *", async () => {
  const prize20 = await PrizePool.calcPercent(20);
  const prize15 = await PrizePool.calcPercent(15);
  const prize10 = await PrizePool.calcPercent(10);
  const prize55 = (await PrizePool.calcPercent(55)) / 97;
  const leaderboard = await axios.get(
    `https://panteon-backend.herokuapp.com/api/leaderboard`
  );
  User.addCoin(await leaderboard.data[0].id, Math.ceil(prize20));
  User.addCoin(await leaderboard.data[1].id, Math.ceil(prize15));
  User.addCoin(await leaderboard.data[2].id, Math.ceil(prize10));
  const smallPrizeArr = await leaderboard.data.slice(3, 100);
  smallPrizeArr.forEach(async (user) => {
    User.addCoin(user.id, Math.ceil(prize55));
  });
  PrizePool.deletePrize();
});

const taskUpdateCache = cron.schedule("*/2 * * * * *", async () => {
  addUsers();
});

const addUsers = async () => {
  try {
    const users = await User.getUserInfo();
    await boardModel.leaderboard.redisClient.flushall();
    await boardModel.addUsersForLeaderboard(users);
  } catch (e) {
    console.log("error", "getUsers mw");
  }
};

module.exports = { task, taskUpdateCache };
