const mongoose = require('mongoose');
const review = new mongoose.Schema({
  name: String,
  date_created: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('review',review);
module.exports = Review;

