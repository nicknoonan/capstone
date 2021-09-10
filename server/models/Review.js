const mongoose = require('mongoose');
const review = new mongoose.Schema({
  name: String
});

const Review = mongoose.model('review',review);
module.exports = Review;

