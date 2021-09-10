const express = require('express');
const router = express.Router();
const { get_sample_model, post_sample_model } = require('./controllers/sampleroute');

router.post('/', post_sample_model);
router.get('/', get_sample_model);

module.exports = { router };