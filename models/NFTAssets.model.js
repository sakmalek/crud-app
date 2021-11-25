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
            last_sale: {
                total_price: String,
                payment_token: {
                    image_url: String,
                    name: String,
                    decimals: String,
                    eth_price: String,
                    usd_price: String,
                },
            },

            created_date: String,
            quantity: String,
            image_url: String,
        },
        {
            timestamps: true
        }
    )
;

module.exports = model("NFTAssets", nftAssetsSchema);
