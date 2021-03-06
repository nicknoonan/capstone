//modules from other files
const express = require('express');
const { post_agency, get_agency, delete_agency } = require('./controllers/Agency');
const { post_property, get_property, delete_property } = require('./controllers/Property');
const { post_unit, get_unit, delete_unit } = require('./controllers/Unit');
const { post_new_user, get_user, post_login, delete_user } = require('./controllers/User');
const { post_review, get_review, delete_review } = require('./controllers/Review');
const { get_sample_model, post_sample_model } = require('./controllers/sampleroute');
const { get_verify_user } = require('./controllers/Verify');
const { post_create_recover, post_update_password } = require('./controllers/Recover');
const { post_qmodel, get_qmodel } = require('./controllers/Qmodel');
const auth = require('../middleware/auth');
const admin_auth = require('../middleware/admin_auth');
const { post_qresult, get_qresult } = require('./controllers/Qresult');
const router = express.Router();

//router handles agency post, delete, get request
router.post('/api/agency', auth, post_agency);
router.get('/api/agency', get_agency);
router.delete('/api/agency/id:id', admin_auth, delete_agency);

//router handles property post, delete, get request
router.post('/api/property', auth, post_property);
router.get('/api/property', get_property);
router.delete('/api/property/id:id', admin_auth, delete_property);

//router handles unit post, delete, get request
router.post('/api/unit', auth, post_unit);
router.get('/api/unit', get_unit);
router.delete('/api/unit/id:id', admin_auth, delete_unit);

//router handles review post, delete, get request
router.post('/api/review', auth, post_review);
router.get('/api/review', auth, get_review);
router.delete('/api/review/id:id', admin_auth, delete_review);

//router handles new user, get user, delete user, user login requests
router.post('/api/newuser', post_new_user);
router.get('/api/user', auth, get_user);
router.post('/api/login', post_login);
router.delete('/api/user/id:id', admin_auth, delete_user);

router.get('/api/verify', get_verify_user);

router.post('/api/recover',post_create_recover);
router.post('/api/update_password',post_update_password);

router.post('/api/qmodel', post_qmodel);
router.get('/api/qmodel', get_qmodel);

router.post('/api/qresult', post_qresult);
router.get('/api/qresult', get_qresult);

module.exports = { router };
