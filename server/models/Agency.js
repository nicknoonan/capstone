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
  website: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date_est: {
    type: Date,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

const Agency = mongoose.model('Agency',agency);
module.exports = Agency;
