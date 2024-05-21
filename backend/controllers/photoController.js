var PhotoModel = require('../models/photoModel.js');
var UserModel = require('../models/userModel.js');

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
        .then(photos => {
            return res.json(photos);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when getting photo.',
                error: err
            });
        });
    },

    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id})
        .then(photo => {
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            return res.json(photo);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when getting photo.',
                error: err
            });
        });
    },

    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
			imagePath : "/images/" + req.file.filename
        });

        photo.save()
        .then(photo => {
            UserModel.findByIdAndUpdate(req.user._id, { profilePhoto: photo._id }, { new: true })
            .then(() => {
                return res.status(201).json(photo);
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Error when updating user's profile photo",
                    error: err
                });
            });
        })
        .catch(err => {
            return res.status(500).json({
               message: 'Error when creating photo',
               error: err
            });
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id})
        .then(photo => {
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.imagePath = req.body.imagePath ? req.body.imagePath : photo.imagePath;
			
            photo.save()
            .then(photo => {
                return res.json(photo);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Error when updating photo.',
                    error: err
                });
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when getting photo',
                error: err
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOneAndDelete({ _id: id })
        .then(photo => {
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            UserModel.findOneAndUpdate({ profilePhoto: id }, { profilePhoto: process.env.DEFAULT_AVATAR_ID }, { new: true })
            .then(() => {
                return res.status(204).json();
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Error when updating user's profile photo after deletion",
                    error: err
                });
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error when deleting the photo.',
                error: err
            });
        })
    }
};
