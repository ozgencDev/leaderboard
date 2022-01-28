const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  prize: {
    type: Number,
    required: true,
  },
});

const PrizePoolModel = mongoose.model("PrizePool", schema);

class PrizePool {
  static async addPrize(prize) {
    const prizePool = await PrizePoolModel.findOne({});
    if (!prizePool) {
      const newPrizePool = new PrizePoolModel({
        prize,
      });
      return await newPrizePool.save();
    }
    prizePool.prize += prize;
    return await prizePool.save();
  }

  static async calcPercent(value) {
    const prizePool = await PrizePoolModel.findOne({});

    const weeklyPrize = (await prizePool.prize) * (value / 100);
    return await weeklyPrize;
  }

  static async deletePrize() {
    const prizePool = await PrizePoolModel.findOne({});
    prizePool.prize = 0;
    return await prizePool.save();
  }
}

module.exports = PrizePool;
