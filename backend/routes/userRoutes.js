var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

var cookieJWTAuth = require('../middleware/cookieJWTAuth').cookieJWTAuth;

var UserModel = require('../models/userModel.js');


function checkOwnership(req, res, next){
    if(req.session && req.session.userId) {
        UserModel.findById(req.session.userId)
        .then(foundUser => {
            if(!foundUser){
                res.status(404).send();
            } else {
                const ObjectId = require('mongoose').Types.ObjectId;
                if((foundUser.userType && foundUser.userType == "admin") || foundUser._id.equals(new ObjectId(req.params.id))){
                    next();
                } else {
                    res.status(403).send();
                }
            }
        })
        .catch(err => {
            res.status(500).send();
        });
    }
    else {
        var err = new Error("You must be the owner of this account to edit it");
        err.status = 401;
        return next(err);
    }
}

// GET
router.get('/', userController.list);
router.get('/logout', userController.logout);
router.get('/:id', userController.show);

//POST
router.post('/', userController.create);
router.post('/login', userController.login);

//PUT
router.put('/:id', cookieJWTAuth, checkOwnership, userController.update);

//DELETE
router.delete('/:id', checkOwnership, userController.remove);

module.exports = router;
