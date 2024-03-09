const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
 
  ProfileCode: {
    type: Number,
    required: true,
  },
  ProdStartTime: {
    type: Date,
    default:new Date()
  },
  ProdEndTime: {
    type: Date,
    default:new Date()
  },
  Line: {
    type: String,
    required: true,
  },
  Scrap: {
    type: Number,
    required: true,
  },
  ProfileLen: {
    type: Number,
    required: true,
  },
  ProdOperator: {
    type: String,
    required: true,
  },
  ProdInCharge: {
    type: String,
    required: true,
  },
  Shift: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
    default:"P"
  },
  UserId: {
    type:String,
    required:true
  }
}, {
    collection:"ProdCollection"
});

module.exports = mongoose.model("ProdCollection",prodSchema)