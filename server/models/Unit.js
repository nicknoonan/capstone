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
  },
  num_bed: {
    type: Number,
    required: true
  },
  num_bath: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  card_img_url: {
    type: String,
    required: false
  },
  page_img_url: {
    type: String,
    required: false
  }
});

const Unit = mongoose.model('Unit',unit);
module.exports = Unit;
