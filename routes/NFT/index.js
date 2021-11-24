const router = require("express").Router();
const {isLoggedIn} = require("../../middleware/route-guard.js");
const NFTAssets = require("../../models/NFTAssets.model")

router.get("/nft", isLoggedIn, (req, res, next) => {

});

router.get("/nft/:nftId", isLoggedIn, (req, res, next) => {

});
module.exports = router;

