//modules from other files
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { DB_URL } = require('./secrets');
const { router } = require('./routes/index.js');
const PORT = process.env.BHH_PORT || 8080;
const { set_avg_maintenance_rating } = require('./routes/controllers/Qresult');
const Unit = require('./models/Unit');
let unit_ids = [];
// Unit.find({}, function(err, units) {
//   if (err) {
//     console.log(err);
//   }
//   else if (units) {
//     //console.log(units);
//     units.forEach(unit => {
//       set_avg_maintenance_rating(unit._id.toString()).catch(err=> {
//         console.log(err);
//       });
//     });

//   }
// });

// set_avg_maintenance_rating("6184271f04f6d4150b2252e1").catch(err => {
//   console.log(err);
// })
//middleware
const app = express();
app.use(express.json());
app.use(cors());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

//use router module
app.use('/', router);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

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
    //throw new err;
  });

  //listen at PORT
  console.log('Listening on port ' + PORT + ' for requests');
  app.listen(PORT);
}
