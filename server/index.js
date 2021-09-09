const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { DB_URL } = require('./secrets');
const router = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', router);

console.log('trying to connect to db');
mongoose.connect(DB_URL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

app.listen(8080);