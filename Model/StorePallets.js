const mongoose = require("mongoose");

const palletSchema = new mongoose.Schema({
    PalletNo: {
        type: String,
        required: true
    }
},
    {
    collection:"StoreProfilePallets"
})

module.exports = mongoose.model("StoreProfilePallets", palletSchema);
