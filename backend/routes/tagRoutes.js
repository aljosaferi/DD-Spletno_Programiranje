var express = require('express');
var router = express.Router();
var tagController = require('../controllers/tagController.js');

//GET
router.get('/', tagController.list);
router.get('/:id', tagController.show);

//POST
router.post('/', tagController.create);

//PUT
router.put('/:id', tagController.update);

//DELETE
router.delete('/:id', tagController.remove);

module.exports = router;
