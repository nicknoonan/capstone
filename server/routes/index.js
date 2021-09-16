//modules from other files
const express = require('express');
const { post_agency, get_agency, delete_agency } = require('./controllers/Agency');
const { post_property, get_property, delete_property } = require('./controllers/Property');
const { post_unit, get_unit, delete_unit } = require('./controllers/Unit');
const { post_new_user, get_user, post_login, delete_user } = require('./controllers/User');
const { post_review, get_review, delete_review } = require('./controllers/Review');
const { get_sample_model, post_sample_model } = require('./controllers/sampleroute');
const auth = require('../middleware/auth');
const admin_auth = require('../middleware/admin_auth');
const router = express.Router();

// / is currently the sample route
router.post('/', post_sample_model);
router.get('/', get_sample_model);

//router handles agency post, delete, get request
router.post('/agency', auth, post_agency);
router.get('/agency', auth, get_agency);
router.delete('/agency/id:id', admin_auth, delete_agency);

//router handles property post, delete, get request
router.post('/property', auth, post_property);
router.get('/property', auth, get_property);
router.delete('/property/id:id', admin_auth, delete_property);

//router handles unit post, delete, get request
router.post('/unit', auth, post_unit);
router.get('/unit', auth, get_unit);
router.delete('/unit/id:id', admin_auth, delete_unit);

//router handles review post, delete, get request
router.post('/review', auth, post_review);
router.get('/review', auth, get_review);
router.delete('/review/id:id', admin_auth, delete_review);

//router handles new user, get user, delete user, user login requests
router.post('/newuser', post_new_user);
router.get('/user', auth, get_user);
router.post('/login', post_login);
router.delete('/user/id:id', admin_auth, delete_user);

module.exports = { router };