const router = require("express").Router();
const { getTopUsers, lookCache } = require("../controller/api.controller");

router.route("/leaderboard/:id").get(getTopUsers);

module.exports = router;
