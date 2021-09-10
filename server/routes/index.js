//modules from other files
const express = require('express');
const { post_agency, get_agency } = require('./controllers/Agency');
const { post_property } = require('./controllers/Property');
const { post_unit, get_unit } = require('./controllers/Unit');
const { get_sample_model, post_sample_model } = require('./controllers/sampleroute');
const router = express.Router();

// / is currently the sample route
router.post('/', post_sample_model);
router.get('/', get_sample_model);

//router handles agency post and get request
router.post('/agency', post_agency);
router.get('/agency', get_agency);

//router handles property post and get request
router.post('/property', post_property);
router.get('/property', get_property);

//router handles unit post and get request
router.post('/unit', post_unit);
router.get('/unit', get_unit);

module.exports = { router };