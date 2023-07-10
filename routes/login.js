const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const loginCtrl = require('../controllers/login');

// GET /home
router.get('/', loginCtrl.index);

module.exports = router;
