const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
    ProfileCode: {
        type: String,
        required:true,
    },
    ConsumptionDate: {
        type: Date,
        default:new Date(),
        required:true,
    },
   
    Quantity: {
        type: Number,
        required:true,
    },
    ConsumedBy: {
        type: String,
        required:true,
    },
    PalletNo: {
        type: String,
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
    IssuedDate: {
        type: Date,
        default:new Date(),
        required:true,
    },
    IssuedQty: {
        type: Number,
        required:true,
    },
    IssuedBy: {
        type: String,
        required:true,
    },
    ConsumedQty: {
        type: Number,
        required:true,
    },
}, {
    collection:"ProfileStore"
})

module.exports =  mongoose.model("ProfileStore", StoreSchema);
