var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var photoController = require('../controllers/photoController.js');

//GET
router.get('/', photoController.list);
router.get('/:id', photoController.show);

//POST
router.post('/', upload.single('image') ,photoController.create);

//PUT
router.put('/:id', photoController.update);

//DELETE
router.delete('/:id', photoController.remove);

module.exports = router;
