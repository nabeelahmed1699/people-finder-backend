const express = require('express');
const router = express.Router();

const {getAllPersons,createPerson,getPerson,updatePerson,deletePerson,recoverPerson} = require('../controllers/foundPerson');

router.get('/', getAllPersons); //get all tasks
router.get('/:id', 	getPerson); // get single task
router.patch('/:id', updatePerson); // update single task
router.delete('/:id', deletePerson); // delete single task
router.post('/', createPerson); // create single task
router.put('/:id', recoverPerson); // create single task

module.exports = router;
