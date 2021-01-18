const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		max: 225,
		min: 6,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
	firstName: {
		type: String,
		required: true,
		min: 4,
	},
	lastName: {
		type: String,
		required: true,
		min: 4,
	},
	phoneNumber: {
		type: String,
		required: true,
		min: 10,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	points: {
		type: Number,
	},
});
module.exports = mongoose.model('User', userSchema);
