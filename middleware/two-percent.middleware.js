const prize = require("../models/prize-pool.model");
/* Puts 2% of the points earned per game into the prize pool */
exports.taxTwoPercent = async (req, res, next) => {
  const id = req.params.id;
  const value = req.params.value;
  const tax = value * (2 / 100);
  prize.addPrize(tax);
  next();
};
