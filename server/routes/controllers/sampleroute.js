const express = require('express');
const SampleModel = require('../../models/samplemodel');
const router = express.Router();

get_sample_model = async (req, res) => {
  try {
    const sample_models = await SampleModel.find();
            
    res.status(200).json(sample_models);
  } 
  catch (error) {
      res.status(404).json({ message: error.message });
  }
}

post_sample_model = async (req, res) => {
  const { my_property } = req.body;
  const new_sample_model = new SampleModel({ my_property });
  //const new_sample_model_res = { "myproperty" : my_property };
  console.log('saving samplemodel...');
  try {
    await new_sample_model.save();
    res.status(201).json(new_sample_model);
    console.log('saved to db');
  }
  catch (error) {
    res.status(409).json({ message: error.message });
    console.log('faild to save to db');
  }
}

module.exports = { post_sample_model, get_sample_model };