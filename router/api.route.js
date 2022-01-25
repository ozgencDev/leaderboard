const router = require("express").Router();
const { getTopUsers, lookCache } = require("../controller/api.controller");
const prize = require("../models/prize-pool.model");

router.route("/leaderboard/:id").get(getTopUsers);
router.route("/leaderboard").get(getTopUsers);

module.exports = router;
