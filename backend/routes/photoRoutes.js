var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var photoController = require('../controllers/photoController.js');

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

function checkOwnership(req, res, next){
    if(req.session && req.session.userId) {
        UserModel.findById(req.session.userId)
        .then(foundUser => {
            if(!foundUser){
                res.status(404).send();
            } else {
                const ObjectId = require('mongoose').Types.ObjectId;
                if ((foundUser.userType && foundUser.userType == "admin") || 
                (foundUser.profilePhoto.equals(new ObjectId(req.params.id)))){
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
        var err = new Error("You must be the owner of this profilePhoto to edit it");
        err.status = 401;
        return next(err);
    }
}

//GET
router.get('/', photoController.list);
router.get('/:id', photoController.show);

//POST
router.post('/', requiresLogin, upload.single('image') ,photoController.create);

//PUT
router.put('/:id', checkOwnership, photoController.update);

//DELETE
router.delete('/:id', checkOwnership, photoController.remove);

module.exports = router;
