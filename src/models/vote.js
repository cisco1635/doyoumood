const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for votes
let Vote = new Schema({
  date: {
    type: Date
  },
  vote5: {
    type: Number
  },
  vote4: {
    type: Number
  },
  vote3: {
    type: Number
  },
  vote2: {
    type: Number
  },
  vote1: {
    type: Number
  }
},{
    collection: 'votes'
});

module.exports = mongoose.model('Vote', Vote);