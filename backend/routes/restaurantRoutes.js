var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController.js');

//GET
router.get('/', restaurantController.list);
router.get('/:id', restaurantController.show);

//POST
router.post('/', restaurantController.create);
router.post('/:id/rate', restaurantController.rate);

//PUT
router.put('/:id', restaurantController.update);

//DELETE
router.delete('/:id', restaurantController.remove);

module.exports = router;
