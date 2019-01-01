const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Number,
    required: true
  },
  nick: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  todayAddWordsLeft: {
    type: Number
  },
  todayAnswerLeft: {
    type: Number
  }
});

module.exports = mongoose.model("User", userSchema);
