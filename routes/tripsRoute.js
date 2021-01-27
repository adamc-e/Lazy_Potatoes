// const router = require('express').Router();
// const Trip = require('../models/trip');



// router.get('/search', async (req, res) => {
//     try {
//         let filter = {};
//         if (req.query.area) filter.area = req.query.area;
//         console.log(filter);
//         let trip = await Trip.find(filter);
//         console.log('trip', Trip);
//         if (trip.length === 0) {
//             return res.status(404).send({ err: `No area was found, try again ` });
//         }
//         res.json(Trip);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });
