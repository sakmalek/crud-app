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
    },
    {
        timestamps: true
    }
);

module.exports = model("Dashboard", dashboardSchema);
