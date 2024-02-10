const mongoose = require("mongoose");

const palletSchema = new mongoose.Schema({
    PalletNo: {
        type: String,
        required: true
    }
},
    {
    collection:"QualityPallets"
})

module.exports = mongoose.model("QualityPallets", palletSchema);
