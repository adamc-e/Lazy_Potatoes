const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
	email: String,
	name: String,
	area: String,
	time: String,
	date: Date,
	store: String,
	quantity: Number,
	requests: Array,
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;
