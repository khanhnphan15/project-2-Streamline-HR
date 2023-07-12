const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const employeesCtrl = require('../controllers/employees');

// GET /employees
router.get('/', employeesCtrl.index);
router.post('/', employeesCtrl.create);
router.get('/:id', employeesCtrl.show);
router.put('/:id', employeesCtrl.update);
router.delete('/:id', employeesCtrl.delete);

// this is a presentational route that is used only to render the 'edit' version of the show page
router.get('/:id/edit', employeesCtrl.edit);

module.exports = router;
