const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({  
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    walletAddress: {
      type: String,
      required: [true, "walletAddress is required"],
    },  
    fee : {
      type: Number,
      required: [true, "fee is required"],
    }, 
    specialization : {
      type: String,
      required: [true, "specialization is required"],
    },  
    experience : {
      type: Number,
      required: [true, "experience is required"],
    },  
    description : {
      type: String,
      required: [true, "description is required"],
    },  
    image : {
      type: String,
      required: [true, "image is required"],
    },
    patients:{
      type: Array,
      default: [],
    }
  },{timestamps: true});
  const Doctor = mongoose.model("Doctor", doctorSchema);
  module.exports = Doctor