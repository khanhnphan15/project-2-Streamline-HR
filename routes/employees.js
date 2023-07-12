const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const employeesCtrl = require('../controllers/employees');

// GET /employees
router.get('/', employeesCtrl.index);
//GET /employees/new
// router.get('/new', employeesCtrl.new);
//POST/
router.post('/create', employeesCtrl.create);
router.put('/update', employeesCtrl.update);
router.delete('/delete', employeesCtrl.delete);

module.exports = router;
