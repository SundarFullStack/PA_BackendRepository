const mongoose = require("mongoose");

const InChargeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    }
},
    {
    collection:"QualityInCharge"
})

module.exports = mongoose.model("QualityInCharge", InChargeSchema);
