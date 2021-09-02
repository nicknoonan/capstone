import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line 
import TestModel from './models/firstmodel.js';
import { DB_USER, DB_PASSWORD, DB_COLLECTION } from './secrets'; 
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
global.TextEncoder = require("util").TextEncoder;
const mongoose = require("mongoose");
app.use(cors());

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});

const connectionurl = 'mongodb+srv://' + DB_USER + ':' + DB_PASSWORD + '@boonehousinghelp.qcefq.mongodb.net/' + DB_COLLECTION + '?retryWrites=true&w=majority';
const dbconnect = async function() {
  try {
    await mongoose.connect(connectionurl);  
  }
  catch (error) {
    console.log("Failed to connect to db");
    console.log(error);
    return false;
  }
  console.log("DB CONNECTION SUCCESSFUL");
  return true;
}

export { dbconnect };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

