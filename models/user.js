const mongoose = require('mongoose');

// Create your User Modelconst mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	roles:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
	googleId: {
	  type: String,
	  required: false
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		// required: true
	},
	position: {
		type: String,
		// required: true
	},
	dateOfHire: {
		type: Date,
		// required: true
	},
	image:{
		type: String,
		// required: true
	},
	dob: {
		type: Date,
		// required: true
	},
  }, {
	timestamps: true,
  });

module.exports = mongoose.model('User', userSchema);