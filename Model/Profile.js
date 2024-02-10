const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    profile_code: {
        type:String,
        required:true
    },
    profile_desc: {
        type: String,
        required:true
    }
}, {
    collection:"Profile"
}) 

module.exports = mongoose.model("Profile",profileSchema)