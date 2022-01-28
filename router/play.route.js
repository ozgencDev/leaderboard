const router = require("express").Router();
const { addCoin } = require("../controller/play.controller");
const { taxTwoPercent } = require("../middleware/two-percent.middleware");
/* tax middleware is here */
router.route("/add/:id/:value").post(taxTwoPercent, addCoin);

module.exports = router;
