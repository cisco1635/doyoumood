const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for report
let Report = new Schema({
    nbVote: {
      type: Number
    },
    moyenne: {
      type: String
    },
    imgmoyenne: {
      type: String
    },
    repart: {
      type: Array
    },
    trend: {
      type: Array
    },
    comments: {
      type: Array
    }
  });

mongoose.model('Report', Report);