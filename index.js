const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Trip = require('./models/trip');
const authRoute = require('./auth');

mongoose.connect(
	'mongodb+srv://juliet:1312@cluster0.xwepi.mongodb.net/potatoes?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('connected to db')
);

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const db = mongoose.connection;

app.use('/api/users', authRoute);

app.post('/api/newtrip', (req, res, next) => {
	const trip = new Trip(req.body);
	trip.save();
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
