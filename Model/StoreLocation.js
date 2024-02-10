const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    LocationNo: {
        type: String,
        required: true
    }
},
    {
    collection:"StoreLocation"
})

module.exports = mongoose.model("StoreLocation", locationSchema);
