const mongoose = require('mongoose');
const sample_model = new mongoose.Schema({
    my_property: String
});

const SampleModel = mongoose.model('SampleModel',sample_model);
module.exports = SampleModel;

