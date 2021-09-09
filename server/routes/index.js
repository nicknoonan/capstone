const express = require('express');
const router = express.Router();
const sample_route_handler = require('./sampleroute');

router.get('/', sample_route_handler);

module.exports = router;