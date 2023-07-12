const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const employeesCtrl = require('../controllers/employees');

// GET /employees
router.get('/', employeesCtrl.index);
router.get('/:id', employeesCtrl.show);
router.get('/:id/edit', employeesCtrl.edit);
router.put('/:id/update', employeesCtrl.update);
router.post('/create', employeesCtrl.create);
router.delete('/:id/delete', employeesCtrl.delete);

module.exports = router;
