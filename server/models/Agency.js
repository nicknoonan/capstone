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
  url: {
    type: String,
    required: true
  },
  phone_office: {
    type: String,
    required: true
  },
  phone_cell: {
    type: String,
    required: true
  },
  fax: {
    type: String,
    required: false
  },
  date_est: {
    type: Date,
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
  },
  rating: {
    type: Number,
    required: false
  }
});

const Agency = mongoose.model('Agency',agency);
module.exports = Agency;
