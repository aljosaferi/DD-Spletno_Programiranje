var express = require('express');
var router = express.Router();
var menuController = require('../controllers/menuController.js');

var UserModel = require('../models/userModel.js');


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

//GET
router.get('/', menuController.list);
router.get('/:id', menuController.show);

//POST
router.post('/', mustBeRestaurantOwner, menuController.create);

//PUT
router.put('/:id', mustBeRestaurantOwner, menuController.update);

//DELETE
router.delete('/:id', mustBeRestaurantOwner, menuController.remove);

module.exports = router;
