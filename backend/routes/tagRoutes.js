var express = require('express');
var router = express.Router();
var tagController = require('../controllers/tagController.js');

var UserModel = require('../models/userModel.js');

function isAdmin(req, res, next){
    if(req.session && req.session.userId) {
        UserModel.findById(req.session.userId)
        .then(foundUser => {
            if(foundUser.userType && foundUser.userType == "admin"){
                next();
            } else {
                res.status(403).send();
            }
        })
        .catch(err => {
            res.status(404).send();
        });
    }
    else {
        var err = new Error("You must be the an admin to edit tags");
        err.status = 401;
        return next(err);
    }
}

//GET
router.get('/', tagController.list);
router.get('/:id', tagController.show);

//POST
router.post('/', isAdmin, tagController.create);

//PUT
router.put('/:id', isAdmin, tagController.update);

//DELETE
router.delete('/:id', isAdmin, tagController.remove);

module.exports = router;
