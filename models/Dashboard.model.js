const {Schema, model} = require("mongoose");

const dashboardSchema = new Schema(
    {
        name: String
        ,
        description: String
        ,
        type: {
            type: String,
            enum: ['Crypto', 'NFT'],
            default: 'Crypto'
        },
        image_url: String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        nfts: [{
            type: Schema.Types.ObjectId,
            ref: 'NFTAssets',
        }]
    },
    {
        timestamps: true
    }
);

module.exports = model("Dashboard", dashboardSchema);
