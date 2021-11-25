const Dashboard = require("../models/Dashboard.model")

const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    next();
};

const isOwner = (req, res, next) => {
    console.log(req.params.dashboardId)
    Dashboard
        .findById(req.params.dashboardId)
        .then(dashboard => {
            console.log(req.session.user._id, dashboard.owner.toString())
            if (req.session.user._id !== dashboard.owner.toString()) {
                return res.redirect("/");
            }
            next();
        })
        .catch(err => console.log(err))
};
module.exports = {
    isLoggedIn,
    isLoggedOut,
    isOwner,
};
