const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    joinedOn: {
        type: Date,
        default:Date.now(),
    },
    forgotPassword: {
        time: Date,
        option:String,
    },
    token: {
        type: String,
        required:true,
    }

}, {
    collection:"User"
})

module.exports = mongoose.model("User",userSchema );