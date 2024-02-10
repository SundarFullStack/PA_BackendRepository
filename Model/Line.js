const mongoose = require("mongoose");

const lineSchema = new mongoose.Schema({
    Line: {
        type: String,
        required:true
    }
}, {
    collection:"Line"
})

module.exports = mongoose.model("Line",lineSchema)