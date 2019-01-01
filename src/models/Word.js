const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  engWord: {
    type: String,
    required: true,
    unique: true
  },
  plWord: {
    type: String,
    required: true,
    unique: true
  },
  synonym: {
    type: Array
  },
  additionalNote: {
    type: String
  },
  addedBy: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Word", wordSchema);
