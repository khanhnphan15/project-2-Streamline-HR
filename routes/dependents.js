const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const dependentsCtrl = require('../controllers/dependents');

router.post('/', dependentsCtrl.create);
router.get('/:id', dependentsCtrl.show);
router.put('/:id', dependentsCtrl.update);
router.delete('/:id', dependentsCtrl.delete);

module.exports = router;