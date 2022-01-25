const UserModel = require("../models/user.model");
const LeaderBoardModel = require("../models/board.model");

const boardModel = new LeaderBoardModel();

exports.getTopUsers = async (req, res) => {
  const id = req.params.id;
  const query = await UserModel.getIdAndValue();
  boardModel.addUsersForLeaderboard(query);
  if (!id) {
    const leaderboard = await boardModel.getTopUsers(100);
    res.json(leaderboard);
    return;
  }
  const leaderboard = await boardModel.getTopUsers(100);
  const around = await boardModel.getArounds(id);
  const concatted = leaderboard.concat(around);

  res.send(concatted);
};
