const UserModel = require("../models/user.model");
const LeaderBoardModel = require("../models/board.model");

const boardModel = new LeaderBoardModel();

exports.getTopUsers = async (req, res) => {
  /* specific user */
  const id = req.params.id;
  const query = await UserModel.getUserInfo();
  /* adds users */
  boardModel.addUsersForLeaderboard(query);
  if (!id) {
    const leaderboard = await boardModel.getTopUsers(100);
    res.json(leaderboard);
    return;
  }
  /* get top user list */
  const leaderboard = await boardModel.getTopUsers(100);
  const countryTopUsers = await UserModel.getTopUsers(leaderboard); //Promise
  /* get countryAroundUsers */
  const around = await boardModel.getArounds(id); //json
  const countryAroundUsers = await UserModel.getTopUsers(around); //Promise

  Promise.all(countryTopUsers)
    .then((topUsers) => {
      const arr = leaderboard.map((user, index) => {
        return Object.assign(user, topUsers[index]);
      });
      return arr;
    })
    .then((arr) => {
      Promise.all(countryAroundUsers).then((aroundUsers) => {
        const arrAround = aroundUsers.map((user, index) => {
          return Object.assign(user, around[index]);
        });
        const resp = arr.concat(arrAround);
        res.json(resp);
      });
    });
  return;
};
