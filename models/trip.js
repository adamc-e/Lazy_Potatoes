const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
	area: String,
	time: String,
	date: Date,
	store: String,
	quantity: Number,
});

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;
