const mongoose = require("mongoose");

const reasonSchema = new mongoose.Schema({
    Reason: {
        type: String,
        required: true
    }
},
    {
    collection:"QualityReason"
})

module.exports = mongoose.model("QualityReason", reasonSchema);
