const {Schema, model} = require("mongoose");

const dashboardSchema = new Schema(
    {
        name: String
        ,
        description: String
        ,
        type: {
            enum: ['Crypto', 'NFT'],
        },
        image_url: String,
    },
    {
        timestamps: true
    }
);

module.exports = model("User", dashboardSchema);
