const mongoose = require('mongoose');
const review = new mongoose.Schema({
  review_type: {
    type: String,
    required: true
  },
  review_of: {
    type: mongoose.ObjectId,
    required: true
  },
  review_body: {
    type: Object,
    required: true
  },
  user: {
    type: mongoose.ObjectId,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true
  }
});

const Review = mongoose.model('review',review);
module.exports = Review;
