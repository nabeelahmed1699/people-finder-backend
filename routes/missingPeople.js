const express = require('express');
const router = express.Router();

const {getAllPersons,createPerson,getPerson,updatePerson,deletePerson,recoverPerson} = require('../controllers/missingPeople');

router.get('/', getAllPersons); //get all tasks
router.get('/:id', 	getPerson); // get single task
router.patch('/:id', updatePerson); // update single task
router.delete('/:id', deletePerson); // delete single task
router.post('/', createPerson); // create single task
router.put('/:id', recoverPerson); // recover
module.exports = router;
