const mongoose = require('mongoose');
const review = new mongoose.Schema({
  name: String
});

const review = mongoose.model('review',review);
module.exports = review;

