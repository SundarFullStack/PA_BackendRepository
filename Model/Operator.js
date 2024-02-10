const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
    OperatorName: {
        type: String,
        required:true
    }
}, {
    collection:"ShiftOperator"
})

module.exports = mongoose.model("ShiftOperator",operatorSchema)