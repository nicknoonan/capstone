const express = require('express');
const { post_agency, get_agency } = require('./controllers/Agency');
const { post_property } = require('./controllers/Property');
const router = express.Router();
const { get_sample_model, post_sample_model } = require('./controllers/sampleroute');

router.post('/', post_sample_model);
router.get('/', get_sample_model);

router.post('/agency', post_agency);
router.get('/agency', get_agency);

router.post('/property', post_property);
router.get('/property', get_property);

module.exports = { router };