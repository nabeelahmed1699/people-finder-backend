const express = require('express');
const router = express.Router();

const {getAllPersons} = require('../controllers/recovered');

router.get('/', getAllPersons); //get all tasks

module.exports = router;
