const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
const Trip = require('./models/trip');
const User = require('./models/user');

app.use(express.json({ extended: false, limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
dotenv.config();

mongoose.connect(
	'mongodb+srv://juliet:1312@cluster0.xwepi.mongodb.net/potatoes?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('connected to db')
);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// app.use('/api/user', authRoute);
// app.use('/api/pet', petRoute)

app.post('/api/newtrip', (req, res) => {
	const trip = new Trip(req.body);
	trip.save();
});

app.post('/api/user/register', (req, res) => {
	const user = new User(req.body);
	console.log(req.body);
	user.save();
});

// app.get('/api/tous-mes-pets', (req, res) => {
// 	Pet.find({}, (err, doc) => {
// 		res.json(doc);
// 	});
// });

// app.get('/api/saved-pets', (req, res) => {
// 	User.aggregate([
// 		{
// 			$match: {
// 				email: 'julietgavison@gmail.com',
// 			},
// 		},
// 		{
// 			$lookup: {
// 				from: 'pets',
// 				localField: 'savedPets',
// 				foreignField: '_id',
// 				as: 'mypets',
// 			},
// 		},
// 		{
// 			$project: {
// 				mypets: 1,
// 				_id: 0,
// 			},
// 		},
// 	])
// 		.then(doc => res.json(doc))
// 		.catch(err => console.error(err));
// });

// app.post('/api/log-in', (req, res) => {
// 	User.findOne({ email: req.body.email });
// });

// app.get('/api/all-users', (req, res) => {
// 	User.find({}, (err, doc) => {
// 		res.json(doc);
// 	});
// });

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
