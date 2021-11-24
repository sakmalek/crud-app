const {Schema, model} = require("mongoose");

const nftAssetsSchema = new Schema(
        {
            token_id: {
                type: String,
                unique: true,
            },
            name: String,
            description: String,
            asset_contract: {
                address: String,
                name: String,
            },
            image_url: String,
        },
        {
            timestamps: true
        }
    )
;

module.exports = model("NFTAssets", nftAssetsSchema);
