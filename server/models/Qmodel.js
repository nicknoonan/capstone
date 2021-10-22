const { Schema, model } = require('mongoose');

// Create Schema
const QmodelSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  survey_json: {
    type: Object,
    required: true
  }
});

const Qmodel = model('qmodel', QmodelSchema);

module.exports = Qmodel;