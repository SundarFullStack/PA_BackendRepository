const mongoose = require("mongoose");

const InchargeSchema = new mongoose.Schema({
    Name: {
        type: String,
        required:true
    }
}, {
    collection:"ShiftIncharge"
})

module.exports = mongoose.model("ShiftIncharge",InchargeSchema)