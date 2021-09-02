const mongoose = require('mongoose');
const testmodel = new mongoose.Schema({
    myproperty: String
});

const TestModel = mongoose.model('TestModel',testmodel);

export { TestModel };
