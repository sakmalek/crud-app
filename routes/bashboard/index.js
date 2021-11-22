const router = require("express").Router();
const {isLoggedIn} = require("../../middleware/route-guard.js");

router.get("/dashboards", isLoggedIn, (req, res) => {
    res.render("dashboard/index");
});
module.exports = router;