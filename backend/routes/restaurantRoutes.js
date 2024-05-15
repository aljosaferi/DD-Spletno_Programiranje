var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController.js');

var RestaurantModel = require('../models/restaurantModel.js');
var UserModel = require('../models/userModel.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

function mustBeRestaurantOwner(req, res, next){
    if(req.session && req.session.userId){
        UserModel.findById(req.session.userId)
            .then(foundUser => {
                if(!foundUser){
                    res.status(404).send();
                }

                if(foundUser.userType && (foundUser.userType == "restaurantOwner" || foundUser.userType == "admin")){
                    next();
                } else {
                    res.status(403).send();
                }
            })
            .catch(err => {
                res.status(404).send();
            })
    } else{
        var err = new Error("You must be logged in to add restaurants");
        err.status = 401;
        return next(err);
    }
}

function checkOwnership(req, res, next){
    if(req.session && req.session.userId) {
        RestaurantModel.findById(req.params.id)
        .then(foundRestaurant => {
            if(!foundRestaurant){
                res.status(404).send();
            }
            UserModel.findById(req.session.userId)
            .then(foundUser => {
                const ObjectId = require('mongoose').Types.ObjectId;
                if((foundUser.userType && foundUser.userType == "admin") || 
                (foundUser.restaurants.some(restaurantId => restaurantId.equals(new ObjectId(req.params.id))))) {
                    next();
                } else {
                    res.status(403).send();
                }
            })
            .catch(err => {
                res.status(404).send();
            })
        })
        .catch(err => {
            res.status(500).send();
        })
    }
    else {
        var err = new Error("You must be the owner of this restaurant to edit it");
        err.status = 401;
        return next(err);
    }
}

//GET
router.get('/', restaurantController.list);
router.get('/:id', restaurantController.show);

//POST
router.post('/', mustBeRestaurantOwner, restaurantController.create);
router.post('/:id/rate', requiresLogin, restaurantController.rate);

//PUT
router.put('/:id', mustBeRestaurantOwner, checkOwnership, restaurantController.update);

//DELETE
router.delete('/:id', mustBeRestaurantOwner, checkOwnership, restaurantController.remove);

module.exports = router;
