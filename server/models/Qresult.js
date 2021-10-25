const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');


// Create Schema
const QresultSchema = new Schema({
  qmodel_id: {
    type: mongoose.ObjectId,
    required: true
  },
  user_id: {
    type: mongoose.ObjectId,
    required: true
  },
  review_of_id: {
    type: mongoose.ObjectId,
    required: true
  },
  review_of_name: {
    type: String,
    required: true
  },
  survey_result: {
    type: Object,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Qresult = model('qresult', QresultSchema);

module.exports = Qresult;