const mongoose = require('mongoose');
const unit = new mongoose.Schema({
  name: String,
  agency: String,
  agencyID: mongoose.Schema.Types.ObjectId,
  property: String,
  propertyID: mongoose.Schema.Types.ObjectId,
  address: String
});

const Unit = mongoose.model('Unit',unit);
module.exports = Unit;

