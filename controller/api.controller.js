const UserModel = require("../models/user.model");
const LeaderBoardModel = require("../models/board.model");

const boardModel = new LeaderBoardModel();

exports.getTopUsers = async (req, res) => {
  const id = req.params.id;
  const query = await UserModel.getIdAndValue();
  boardModel.addUsersForLeaderboard(query);
  if (!id) {
    const leaderboard = await boardModel.getTopUsers(100);
    const arrUsernameAndCountry = await UserModel.getTopUsers(leaderboard);
    Promise.all(arrUsernameAndCountry).then((arr) => {
      const result = arr.map((item, index) => {
        return Object.assign(item, leaderboard[index]);
      });
      res.json(result);
    });
    return;
  }
  const leaderboard = await boardModel.getTopUsers(100);
  const arrUsernameAndCountry = await UserModel.getTopUsers(leaderboard);
  Promise.all(arrUsernameAndCountry).then(async (arr) => {
    const result = arr.map((item, index) => {
      return Object.assign(item, leaderboard[index]);
    });
    const around = await boardModel.getArounds(id);
    const usernameAndCountry = await UserModel.getTopUsers(around);
    Promise.all(usernameAndCountry).then((aroundMongo) => {
      console.log(around);
      const arrAround = aroundMongo.map((item, index) => {
        console.log(item);
        return Object.assign(item, around[index]);
      });
      const concat = result.concat(arrAround);
      res.send(concat);
    });
  });
};
