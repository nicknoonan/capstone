//modules from other files
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { DB_URL } = require('./secrets');
const { router } = require('./routes/index.js');
const PORT = 8080;
//middleware
const app = express();
app.use(express.json());
app.use(cors());
//use router module
app.use('/', router);
init();

/*
 *  init: this function connects to db and tells express app to begin listening for requests at PORT
 */ 
async function init() {
  //wait until conected to the database
  await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db")
  })
  .catch((err) => {
    console.log(err);
    throw new err;
  });

  //listen at PORT
  console.log('Listening on port ' + PORT + ' for requests');
  app.listen(PORT);
}
