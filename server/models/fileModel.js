const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    name: String,
    path: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now },
  });
  const File = mongoose.model('File', fileSchema);

  module.exports = File