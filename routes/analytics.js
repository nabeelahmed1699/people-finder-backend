const express = require('express');
const router = express.Router();

const {getAnalytics} = require('../controllers/analytics');

router.get('/', getAnalytics); //get analytics

module.exports = router;
