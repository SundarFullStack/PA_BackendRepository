const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    LocationNo: {
        type: String,
        required: true
    }
},
    {
    collection:"QualityLocation"
})

module.exports = mongoose.model("QualityLocation", locationSchema);
