const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", schema);

class UserModel {
  static async getUserInfo() {
    return await User.find({}).select("-_id id value country");
  }

  static async addCoin(id, value) {
    const user = await User.findOne({ id: id });
    user.value += +value;
    return await user.save();
  }
  static async getTopUsers(users) {
    try {
      const arr = users.map(async (user) => {
        const { country } = await User.findOne({ id: user.id });
        //console.log({ username, country });
        return { country };
      });

      return arr;
    } catch (e) {
      console.log("error", "topUsers");
    }
  }

  static async getCount() {
    return await User.countDocuments({});
  }
}

module.exports = UserModel;
