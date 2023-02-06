const express = require('express');
const router = express.Router();

const {
	
	registerUser,
	updateUser,
	deleteUser,
	
} = require('../controllers/user');

router.post('/', registerUser); //get all tasks
router.patch('/:id', updateUser); // update single task
router.delete('/:id', deleteUser); // delete single task

module.exports = router;
