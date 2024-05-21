var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController.js');

var JWTAuthenticate = require('../middleware/cookieJWTAuth');
var isRestaurantOwner = require('../middleware/isRestaurantOwner');

function checkOwnership(req, res, next){
    try {
        console.log(req.user)
        console.log(req.user.userType)
        console.log(req.user.restaurants)
        console.log(req.user.restaurants[0])
        console.log(typeof(req.user.restaurants[0]))
        console.log(req.params.id)
        console.log(typeof(req.params.id))
        if(req.user.userType === "admin" || req.user.restaurants.includes(req.params.id)) {
            next();
        } else {
            res.status(401).json({ error: "You must be the owner of this restaurant to edit it" });
        }
    } catch(error) {
        res.status(500).json({ error: 'Server error' });
    }
}

//GET
router.get('/', restaurantController.list);
router.get('/:id', restaurantController.show);

//POST
router.post('/', JWTAuthenticate, isRestaurantOwner, restaurantController.create);
router.post('/:id/rate', JWTAuthenticate, restaurantController.rate);

//PUT
router.put('/:id', JWTAuthenticate, isRestaurantOwner, checkOwnership, restaurantController.update);

//DELETE
router.delete('/:id', JWTAuthenticate, isRestaurantOwner, checkOwnership, restaurantController.remove);

module.exports = router;
