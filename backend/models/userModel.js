var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt = require('bcrypt');

//const ProfilePhoto = require('./profilePhotoModel');

var userSchema = new Schema({
	'username' : { type: String, required: true },
	'firstName' : { type: String, required: true },
	'lastName' : { type: String, required: true },
	'email' : { type: String, required: true },
	'password' : { type: String, required: true },
	'profilePhoto' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'profilePhoto',
		required: true
	},
	//Če uporabnik nima userType, je navadni uporabnik
	'userType' : { type: String, enum: ['admin', 'restaurantOwner'], required: false },
	'restaurants': [{
		type: Schema.Types.ObjectId,
		ref: 'restaurant',
		required: function() { return this.userType === 'restaurantOwner'; }
	  }]
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

const defaultProfilePhotoId = "tuVstaviId";

userSchema.pre('findOneAndRemove', async function(next) {
	try {
		const doc = await this.model.findOne(this.getFilter());

		if (doc && doc.profilePhoto && doc.profilePhoto.toString() !== defaultProfilePhotoId) {
			await ProfilePhoto.findByIdAndDelete(doc.profilePhoto);
		}
		next()
	} catch(error) {
		next(error)
	}
	
  });

module.exports = mongoose.model('user', userSchema);
