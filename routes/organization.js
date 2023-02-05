const express = require('express');
const router = express.Router();

const {
	getAllOrganizations,
	getOrganization,
	updateOrganization,
	deleteOrganization,
	createOrganization,
} = require('../controllers/organization');

router.get('/', getAllOrganizations); //get all tasks
router.get('/:id', getOrganization); // get single task
router.patch('/:id', updateOrganization); // update single task
router.delete('/:id', deleteOrganization); // delete single task
router.post('/', createOrganization); // create single task

module.exports = router;
