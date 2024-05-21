var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var photoController = require('../controllers/photoController.js');

var JWTAuthenticate = require('../middleware/cookieJWTAuth');

function checkOwnership(req, res, next){
    console.log(req.user.userType)
    console.log(typeof(req.user.profilePhoto))
    console.log(typeof(req.params.id))
    try {
        if(req.user.userType === "admin" || req.user.profilePhoto === req.params.id) {
            next();
        } else {
            res.status(401).json({ error: "You must be the owner of this restaurant to edit it" });
        }
    } catch(error) {
        res.status(500).json({ error: 'Server error' });
    }
}

//GET
router.get('/', photoController.list);
router.get('/:id', photoController.show);

//POST
router.post('/', JWTAuthenticate, upload.single('image') ,photoController.create);

//PUT
router.put('/:id', JWTAuthenticate, checkOwnership, photoController.update);

//DELETE
router.delete('/:id', JWTAuthenticate, checkOwnership, photoController.remove);

module.exports = router;
