require('dotenv').config();
const express = require('express');
const app = express();
const port = 5001;
const mongoose = require('mongoose');
const Trip = require('./models/trip');
const authRoute = require('./routes/auth');
const cors = require('cors');

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb+srv://juliet:1312@cluster0.xwepi.mongodb.net/potatoes?retryWrites=true&w=majority", {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected');
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
connectDB()


app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', authRoute);



app.get('/api/alltrips', async (req, res) => {
	try {
		const trips = await Trip.find({})
		res.json(trips)

	} catch (err) {
		console.error(err)

	}
});

app.post('/api/newtrip', (req, res, next) => {
	try {
		const trip = new Trip(req.body);
		trip.save();
		res.send(`Your trip has been recorded`);
	} catch {
		console.error(err);
	}
});




app.get('/api/alltrips/search', async (req, res) => {
	try {
		let filter = {};
		if (req.query.area) filter.area = req.query.area;
		let trip = await Trip.find(filter);
		
		if (trip.length === 0) {
			return res.status(404).send({ err: `No area was found, try again ` });
		}
		res.json(trip);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

app.put('/api/addRequest', async (req, res) => {
	const id = req.body.tripId;
	const request = req.body;
	const tripToUpdate = await Trip.updateOne(
		{ _id: id },
		{
			$push: { requests: request },
		}
		);
		res.send('success');
	});
	
	
	app.listen(port, () => {
		console.log(`app listening at http://localhost:${port}`);
	});
