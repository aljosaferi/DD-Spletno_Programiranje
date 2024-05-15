var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var menuSchema = new Schema({
	'dish' : { type: String, required: true },
	'sideDishes' : {
		type: [{ 
			type: String,
			required: true
		}],
		required: true
	},
	'tag' : {
		type: Schema.Types.ObjectId,
		ref: 'tag',
	   	required: true
   },
});

module.exports = mongoose.model('menu', menuSchema);
