const prize = require("../models/prize-pool.model");

exports.taxTwoPercent = async (req, res, next) => {
  const id = req.params.id;
  const value = req.params.value;
  const tax = value * (2 / 100);
  prize.addPrize(tax);
  next();
};
