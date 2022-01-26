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
  static async getUser(username) {
    return await User.findOne({ username });
  }

  static async getUsers() {
    return await User.find({});
  }

  static async getUserInfo() {
    return await User.find({}).select("-_id id value country");
  }

  static async deleteUser(username) {
    return await User.deleteOne({ username });
  }

  static async addCoin(id, value) {
    const user = await User.findOne({ id: id });
    user.value += +value;
    return await user.save();
  }
  static async getTopUsers(users) {
    const arr = users.map(async (user) => {
      const { country } = await User.findOne({ id: user.id });
      //console.log({ username, country });
      return { country };
    });

    return arr;
  }

  static async getCount() {
    return await User.countDocuments({});
  }
}

module.exports = UserModel;
