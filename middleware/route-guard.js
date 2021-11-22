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

const canReadyOnly = (req, res, next) => {
    if (req.session.user.role === '001') {
        return res.redirect("/");
    }
    next();
};

const canReadAndWrite = (req, res, next) => {
    if (req.session.user.role === '011') {
        return res.redirect("/");
    }
    next();
};

const isLoggedUserAdmin = (req, res, next) => {
    if (req.session.user.role === '111') {
        return res.redirect("/");
    }
    next();
};

module.exports = {
    isLoggedIn,
    isLoggedOut,
    isLoggedUserAdmin,
    canReadyOnly,
    canReadAndWrite,
};
