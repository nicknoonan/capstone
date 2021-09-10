//modules from other files
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { DB_URL } = require('./secrets');
const { router } = require('./routes/index.js');

//middleware
const app = express();
app.use(express.json());
app.use(cors());

//use router module
app.use('/', router);

//conect to the database
console.log('Trying to connect to db');
mongoose.connect(DB_URL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to db")).catch(console.error);

//listen at port 8080
app.listen(8080);