const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    enum: ["doctor", "patient"],
    required: [true, "role is required"],
  },
  notifcation: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  pastPriscriptions: {
    type: Array,
    default: [],
  },
  walletAddress: {
    type: String,
    unique: true,
    required: [true, "walletAddress is required"],
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
