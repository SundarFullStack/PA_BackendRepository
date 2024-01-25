const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema({
  ProfileCode: {
    type: Number,
    required: true,
  },
  ProfileDesc: {
    type: String,
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
  }
}, {
    collection:"ProdCollection"
});

module.exports = mongoose.model("ProdCollection",prodSchema)