const mongoose = require("mongoose");

const InChargeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    }
},
    {
    collection:"StoreInCharges"
})

module.exports = mongoose.model("StoreInCharges", InChargeSchema);
