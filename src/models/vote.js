const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for votes
let Vote = new Schema({
    date: {
      type: Date
    },
    team: {
      type: String
    },
    mood: {
      type: String
    }
  });

module.exports = mongoose.model('Vote', Vote);