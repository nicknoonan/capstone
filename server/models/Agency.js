const mongoose = require('mongoose');
const agency = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Agency = mongoose.model('Agency',agency);
module.exports = Agency;

