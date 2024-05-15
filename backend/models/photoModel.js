var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'imagePath' : { type: String, required: true }
});

module.exports = mongoose.model('photo', photoSchema);
