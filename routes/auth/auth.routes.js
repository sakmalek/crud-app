const router = require("express").Router();
const mongoose = require("mongoose");

// ℹ️ Handles password encryption
const bcryptjs = require("bcryptjs");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../../models/User.model");

const {isLoggedIn, isLoggedOut} = require("../../middleware/route-guard.js");
const NFTAssets = require("../../models/NFTAssets.model");


// .get() route ==> to display the signup form to users
router.get("/signup", isLoggedOut, (req, res) => res.render("auth/signup"));

// .post() route ==> to process form data
router.post("/signup", isLoggedOut, (req, res, next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.render("auth/signup", {
            errorMessage: "All fields are mandatory"
        });
        return;
    }

    // make sure passwords are strong:
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.status(500).render("auth/signup", {
            errorMessage:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
        });
        return;
    }

    bcryptjs
        .genSalt(saltRounds)
        .then((salt) => bcryptjs.hash(password, salt))
        .then((hashedPassword) => {
            return User.create({
                username,
                email,
                passwordHash: hashedPassword
            });
        })
        .then((userFromDB) => {
            res.redirect("/user");
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render("auth/signup", {errorMessage: error.message});
            } else if (error.code === 11000) {
                res.status(500).render("auth/signup", {
                    errorMessage: "Username and email need to be unique. Either username or email is already used."
                });
            } else {
                next(error);
            }
        });
});

router.get("/login", isLoggedOut, (req, res) => res.render("auth/login"));

router.post("/login", isLoggedOut, (req, res, next) => {
    const {email, password} = req.body;

    if (email === "" || password === "") {
        res.render("auth/login", {
            errorMessage: "Email and password are required"
        });
        return;
    }

    User.findOne({email})
        .then((user) => {
            if (!user) {
                res.render("auth/login", {errorMessage: "Email or password is wrong"});
                return;
            } else if (bcryptjs.compareSync(password, user.passwordHash)) {
                req.session.user = user;
                res.redirect("/user");
            } else {
                res.render("auth/login", {errorMessage: "Email or password is wrong"});
            }
        })
        .catch((error) => next(error));
});


router.post("/logout", isLoggedIn, (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

router.get("/user", isLoggedIn, (req, res) => {
    NFTAssets.find()
        .then(nfts => {
            const index = Math.floor(Math.random() * nfts.length);
            const nft = nfts[index];
            res.render("users/user", {nft});
        })
        .catch(err => next(err))
});

module.exports = router;
