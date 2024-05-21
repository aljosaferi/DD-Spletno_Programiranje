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
	'userType' : { 
		type: String, 
		enum: ['regular', 'admin', 'restaurantOwner'], 
		required: true 
	},
	'restaurants': {
		type: [{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: 'restaurant',
			required: true
		}],
		required: function() { return this.userType === 'restaurantOwner'; },
		default: function() { return this.userType === 'restaurantOwner' ? [] : undefined; }
	}
});

userSchema.pre('save', function(next){
	if (this.userType !== 'restaurantOwner' && this.restaurants) {
		next(new Error('Only restaurant owners can have owned restaurants.'));
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

userSchema.pre('findOneAndDelete', async function(next) {
	try {
		const user = await this.model.findOne(this.getFilter());
		if(user) {
			if (user.profilePhoto && user.profilePhoto.toString() !== process.env.DEFAULT_AVATAR_ID) {
				console.log(2)
				await PhotoModel.findOneAndDelete({ _id: user.profilePhoto });
			}
			await RestaurantModel.updateMany(
				{}, 
				{ $pull: { ratings: { user: user._id } } }
			);
			if(user.userType && user.userType === "restaurantOwner") {
				for (let restaurantId of user.restaurants) {
					await RestaurantModel.findOneAndDelete({_id: restaurantId})
				}
			}
			console.log(6)
		}
		next()
	} catch(error) {
		next(error)
	}
});

userSchema.statics.authenticate = function(username, password, callback){
	User.findOne({username: username})
	.then(user => {
		if(!user) {
			var err = new Error("User not found.");
			err.status = 401;
			return callback(err);
		} 
		bcrypt.compare(password, user.password, function(err, result){
			if(result === true){
				return callback(null, user);
			} else{
				return callback();
			}
		});
	})
	.catch(err => {
		return callback(err);
	});
}

var User = mongoose.model('user', userSchema);
module.exports = User;
