const mongoose = require('mongoose');
const agency = new mongoose.Schema({
  name: String,
  address: String,
  //meta: {
  //  owners: [String],
  //  est: Date
  //}
});

const Agency = mongoose.model('Agency',agency);
module.exports = Agency;

