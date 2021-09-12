const mongoose = require('mongoose');
const unit = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  agency_name: {
    type: String,
    required: true
  },
  property_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Unit = mongoose.model('Unit',unit);
module.exports = Unit;

