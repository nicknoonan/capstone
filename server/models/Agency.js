const mongoose = require('mongoose');
const agency = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

const Agency = mongoose.model('Agency',agency);
module.exports = Agency;
