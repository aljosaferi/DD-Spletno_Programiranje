var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt');

const PhotoModel = require('./photoModel');
const RestaurantModel = require('./restaurantModel');

var userSchema = new Schema({
	'username' : { type: String, required: true },
	'firstName' : { type: String, required: true },
	'lastName' : { type: String, required: true },
	'email' : { type: String, required: true },
	'password' : { type: String, required: true },
	'profilePhoto' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'photo',
		required: true
	},
	//Če uporabnik nima userType, je navadni uporabnik
	'userType' : { 
		type: String, 
		enum: ['admin', 'restaurantOwner'], 
		required: false 
	},
	'restaurants': {
		type: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'restaurant',
			required: true
		}],
		required: function() { return this.userType === 'restaurantOwner'; },
		default: undefined
	}
});

userSchema.pre('save', function(next){
	if (this.userType !== 'restaurantOwner' && this.restaurants) {
		next(new Error('Only restaurant owners can have owned restaurants.'));
	}
	if (this.userType === 'restaurantOwner' && this.restaurants.length < 1) {
		next(new Error('Owner must have atleas one restaurant.'));
	}
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if(err){
			return next(err);
		}
		user.password = hash;
		next();
	});
});

const defaultProfilePhotoId = "6644fd61d01c9038f1f3bf8e";

userSchema.pre('findOneAndDelete', async function(next) {
	try {
		const user = await this.model.findOne(this.getFilter());

		if (user && user.profilePhoto && user.profilePhoto.toString() !== defaultProfilePhotoId) {
			await PhotoModel.findByIdAndDelete(doc.profilePhoto);
		}

		if(user && user.userType && user.userType === "restaurantOwner") {
			for (let restaurantId of user.restaurants) {
				await RestaurantModel.findOneAndDelete(restaurantId)
			}
		}
		next()
	} catch(error) {
		next(error)
	}
	
  });

module.exports = mongoose.model('user', userSchema);
