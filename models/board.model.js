const { client } = require("../config/redis.config");
const { Leaderboard } = require("redis-rank");

class LeaderBoardModel {
  constructor() {
    this.leaderboard = new Leaderboard(client, "leaderboard", {
      sortPolicy: "high-to-low",
      updatePolicy: "best",
    });
  }
  async addUsersForLeaderboard(users) {
    await this.leaderboard.update(users);
  }
  async getLeaderboard(count) {
    return await this.leaderboard.top(count);
  }

  async getArounds(id) {
    try {
      const { rank } = await this.leaderboard.find(id);
      const threeLess = rank - 3;
      const twoMore = rank + 2;
      const around = await this.leaderboard.list(threeLess, twoMore);
      return around;
    } catch (e) {
      console.log("error", "getArounds");
    }
  }
  async getTopUsers() {
    return await this.leaderboard.top(100);
  }
}

module.exports = LeaderBoardModel;
