const mongoose = require('mongoose');
const property = new mongoose.Schema({
  name: String,
  agency_name: String,
  agencyID: mongoose.Schema.Types.ObjectId,
  address: String
});

const Property = mongoose.model('Property',property);
module.exports = Property;

