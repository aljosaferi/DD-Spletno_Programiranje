var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const MenuModel = require('./menuModel');
const UserModel = require('./userModel');

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
		required: true,
		default : []
	},
	'coordinates' : Number,
	'menus' : { 
		type: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'menu',
			required: true
		}],
		required: true,
		default : []
	},
	'ratings': {
		type: [{
        	user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
        	score: { type: Number, required: true, min: 1, max: 5 }
    	}],
		required: true,
		default : [] 
	}	
});

restaurantSchema.pre('findOneAndDelete', async function(next) {
	try {
		const restaurant = await this.model.findOne(this.getFilter());
		if (restaurant) {
			await MenuModel.deleteMany({ _id: { $in: restaurant.menus } });
			try {
				await UserModel.updateMany(
                	{ restaurants: restaurant._id }, 
                	{ $pull: { restaurants: restaurant._id } }
            	);
			} catch (err) {
				console.log(err)
			}
		}
		next()
	} catch(error) {
		next(error)
	}
	
  });

module.exports = mongoose.model('restaurant', restaurantSchema);
