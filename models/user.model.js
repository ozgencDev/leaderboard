const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
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

  static async getIdAndValue() {
    return await User.find({}).select("_id value");
  }

  static async deleteUser(username) {
    return await User.deleteOne({ username });
  }

  static async addCoin(id, value) {
    const user = await User.findOne({ _id: id });
    user.value += +value;
    return await user.save();
  }
  static async getTopUsers(users) {
    const arr = users.map(async (user) => {
      const { username, country } = await User.findOne({ _id: user.id });
      //console.log({ username, country });
      return { username, country };
    });

    return arr;
  }

  static async getCount() {
    return await User.countDocuments({});
  }
}

module.exports = UserModel;
