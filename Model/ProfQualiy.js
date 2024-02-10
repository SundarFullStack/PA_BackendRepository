const mongoose = require("mongoose");

const qualitySchema = new mongoose.Schema({
    ProfileCode: {
        type: String,
        required:true,
    },
    ProfileCode: {
        type: String,
        required:true,
    },
    HoldReason: {
        type: String,
        required:true,
    },
    Status: {
        type: String,
        required:true,
    },
    HoldedDate: {
        type: Date,
        default:new Date(),
        required:true,
    },
    Quantity: {
        type: Number,
        required:true,
    },
    HoldedBy: {
        type: String,
        required:true,
    },
    PalletNo: {
        type: Number,
        required:true,
    },
    Location: {
        type: String,
        required:true,
    },
    Shift: {
        type: String,
        required:true,
    },
}, {
    collection:"ProfileQuality"
})

module.exports =  mongoose.model("ProfileQuality", qualitySchema);
