const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Trip = require('./models/trip');
const authRoute = require('./routes/auth');
// const tripsRoute = require('./routes/tripsRoute');



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
// app.use('/api/trips', tripsRoute);


app.post('/api/newtrip', (req, res, next) => {
	const trip = new Trip(req.body);
	trip.save();
});

app.get('/api/alltrips', (req, res, next) => {
	Trip.find({}, (err, doc) => {
	res.json(doc)
})
});


app.get('api/search', async (req, res) => {
	try {
		let filter = {};
		if (req.query.area) filter.area = req.query.area;
		console.log(filter);
		let trip = await Trip.find(filter);
		console.log('trips', Trip);
		if (trip.length === 0) {
			return res.status(404).send({ err: `No area was found, try again ` });
		}
		res.json(Trip);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

app.put('/api/addRequest', async (req, res)=> {
	const id = req.body.tripId
	const request = req.body
	const tripToUpdate = await Trip.updateOne(
		{ _id: id },
		{
		$push: { requests: request },
		}
	  );
	  res.send('success');
})

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
