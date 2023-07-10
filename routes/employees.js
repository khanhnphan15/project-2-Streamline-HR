const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const employeesCtrl = require('../controllers/employees');

// GET /employees
router.get('/', employeesCtrl.index);
//GET /employees/new
router.get('/new', employeesCtrl.new);


module.exports = router;
