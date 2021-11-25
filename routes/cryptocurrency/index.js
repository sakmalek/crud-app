// const router = require("express").Router();
// const {isLoggedIn} = require("../../middleware/route-guard.js");
// const rp = require('request-promise');
//
// const requestOptions = {
//     method: 'GET',
//     uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//     qs: {
//         'start': '1',
//         'limit': '5000',
//         'convert': 'USD'
//     },
//     headers: {
//         'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY
//     },
//     json: true,
//     gzip: true
// };
//
// router.post("/cryptocurrency", isLoggedIn, (req, res, next) => {
//     rp(requestOptions).then(response => {
//         const {searchWorld} = req.body;
//         const records = response.data.filter(record => record.name.toLowerCase().includes(searchWorld.toLowerCase()))
//
//     }).catch((err) => {
//         console.log('API call error:', err.message);
//     });
// });
// module.exports = router