const router = require("express").Router();
const {isLoggedIn} = require("../../middleware/route-guard.js");
const Dashboard = require("../../models/Dashboard.model")

router.get("/dashboards", isLoggedIn, (req, res, next) => {
    Dashboard.find()
        .then(dashboards => {
            res.render("dashboard/index", {dashboards})
        })
        .catch(err => next(err))
});

router.get("/dashboard", isLoggedIn, (req, res, next) => {
    res.render("dashboard/addDashboard");
});

router.get("/dashboard/:dashboardId", isLoggedIn, (req, res, next) => {
    Dashboard.findById(req.params.dashboardId)
        .then(dashboard => {
            res.render("dashboard/show", {dashboard})
        })
        .catch(err => next(err));
});
router.get("/dashboard/:dashboardId/edit", isLoggedIn, (req, res, next) => {
    Dashboard.findById(req.params.dashboardId)
        .then(dashboard => {
            res.render("dashboard/edit", {dashboard})
        })
        .catch(err => next(err));
});
router.get("/dashboard/:dashboardId/delete", isLoggedIn, (req, res, next) => {
    Dashboard.findByIdAndDelete(req.params.dashboardId)
        .then(() => {
            res.redirect("/dashboards")
        })
        .catch(err => next(err));
});
router.post("/dashboard", isLoggedIn, (req, res, next) => {
    const {name, description, type, image_url} = req.body;

    Dashboard.create({name, description, type, image_url})
        .then(() => {
            res.redirect("/dashboards")
        })
        .catch(err => next(err))
});
module.exports = router;