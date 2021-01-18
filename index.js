const port = process.env.PORT;
var express = require("express");
var app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./API/routes/auth');
const petRoute = require('./pet');
const cors = require('cors')
app.use(express.json({ extended: false, limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
dotenv.config();
mongoose.connect("mongodb+srv://naor:naor123456@cluster-petproject.c4qjc.mongodb.net/petproject?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db')
);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
app.use('/api/user', authRoute);
app.use('/api/pet', petRoute)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});