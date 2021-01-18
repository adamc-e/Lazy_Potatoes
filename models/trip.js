const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
	area: String,
	time: Number,
	store: String,
	quantity: Number,
});

const User = mongoose.model('trips', tripSchema);

module.exports = User;
