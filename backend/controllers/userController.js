var UserModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find().select('-password')
        .populate('profilePhoto')
        .then(users => {
            return res.json(users);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when getting users.',
                error: err
            });
        })
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
    
        UserModel.findOne({_id: id}).select('-password')
        .populate('profilePhoto')
        .populate('restaurants')
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'No such user'
                    });
                }
                return res.json(user);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
			username : req.body.username,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			password : req.body.password,
			profilePhoto : "6644efea3472bd2f6d5a5f4d",
			userType : req.body.userType,
            restaurants : req.body.restaurants
        });

        user.save()
        .then(user => {
            return res.status(201).json(user);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err
            });
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id})
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
			user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
			user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
			user.email = req.body.email ? req.body.email : user.email;
			user.password = req.body.password ? req.body.password : user.password;
			
            user.save()
            .then(user => {
                return res.status(201).json(user);
            })
            .catch(err => {
                return res.status(500).json({
                message: 'Error when creating user',
                error: err
                });
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when getting user',
                error: err
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findOneAndDelete(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.status(204).json();
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when deleting the user.',
                error: err
            });
        });
    }
};
