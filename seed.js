require('dotenv/config');

const mongoose = require('mongoose')
const axios = require("axios");

const NFTAssets = require('./models/NFTAssets.model')
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/crud-app";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });
//https://api.opensea.io/api/v1/assets?order_by=sale_date&order_direction=desc&offset=0&limit=50
axios.get('https://api.opensea.io/api/v1/assets?order_by=sale_date&order_direction=desc&offset=0&limit=50')
    .then(nfts => {
        NFTAssets.insertMany(nfts.data.assets)
            .then((nfts) => {
                console.log(nfts.length)
                mongoose.connection.close();
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));