const mongoose = require('mongoose');
const property = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  agency_name: {
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
  rating: {
    type: Number,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

const Property = mongoose.model('Property',property);
module.exports = Property;
