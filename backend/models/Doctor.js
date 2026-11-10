const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  hospital: {
    type: String,
    default: "MediVault Demo Hospital"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);
