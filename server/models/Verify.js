const { Schema, model } = require('mongoose');

// Create Schema
const VerifySchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  }
});

const Verify = model('verify', VerifySchema);

module.exports = Verify;