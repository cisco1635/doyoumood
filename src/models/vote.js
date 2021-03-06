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
    comment: {
      type: String
    },
    mood: {
      type: String
    }
  });

mongoose.model('Vote', Vote);