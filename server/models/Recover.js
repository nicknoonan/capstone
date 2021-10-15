const { Schema, model } = require('mongoose');

// Create Schema
const RecoverSchema = new Schema({
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

const Recover = model('recover', RecoverSchema);

module.exports = Recover;