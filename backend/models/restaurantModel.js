var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const MenuModel = require('./menuModel');

var restaurantSchema = new Schema({
	'name' : { type: String, required: true },
	'address' : { type: String, required: true },
	'mealPrice' : { type: Number, required: true },
	'mealSurcharge' : { type: Number, required: true },
	'workingHours' : { 
		type: [{
			day: { type: String, required: true },
			open: { type: String, required: true },
			close: { type: String, required: true }
		}],
		required: true
	},
	'tags' : {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'tag',
			required: true 
		}],
		required: true
	},
	'coordinates' : Number,
	'menus' : { 
		type: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'menu',
			required: true
		}],
		required: true 
	},
});

restaurantSchema.pre('save', function(next){
	if (this.menus.length < 1) {
		next(new Error('Menus must contain at least one entry'));
	  } else if(this.tags.length < 1) {
		next(new Error('Tags must contain at least one entry'))
	  } else {
		next();
	  }
});

restaurantSchema.pre('findOneAndDelete', async function(next) {
	try {
		const restaurant = await this.model.findOne(this.getFilter());

		if (restaurant) {
			await MenuModel.deleteMany({ _id: { $in: restaurant.menus } });
		}
		next()
	} catch(error) {
		next(error)
	}
	
  });

module.exports = mongoose.model('restaurant', restaurantSchema);
