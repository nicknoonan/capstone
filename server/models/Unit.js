const mongoose = require('mongoose');
const unit = new mongoose.Schema({
  name: String,
  agency_name: String,
  property_name: String,
  address: String
});

const Unit = mongoose.model('Unit',unit);
module.exports = Unit;

