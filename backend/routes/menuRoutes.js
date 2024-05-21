var express = require('express');
var router = express.Router();
var menuController = require('../controllers/menuController.js');

var JWTAuthenticate = require('../middleware/cookieJWTAuth');
var isRestaurantOwner = require('../middleware/isRestaurantOwner');


function checkOwnership(req, res, next){
    try {
        if(req.user.userType === "admin" || req.user.restaurants.includes(req.body.restaurantId)) {
            next();
        } else {
            res.status(401).json({ error: "You must be the owner of this restaurant to edit it" });
        }
    } catch(error) {
        res.status(500).json({ error: 'Server error' });
    }
}

//GET
router.get('/', menuController.list);
router.get('/:id', menuController.show);

//POST
router.post('/', JWTAuthenticate, isRestaurantOwner, menuController.create);

//PUT
router.put('/:id', JWTAuthenticate, isRestaurantOwner, menuController.update);

//DELETE
router.delete('/:id', JWTAuthenticate, isRestaurantOwner, menuController.remove);

module.exports = router;
