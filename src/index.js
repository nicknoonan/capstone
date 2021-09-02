import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line 
import TestModel from './models/firstmodel.js';
import { DB_USER, DB_PASSWORD, DB_COLLECTION } from './secrets';

const mongoose = require('mongoose');

const connectionurl = 'mongodb+srv://devuser:<password>@boonehousinghelp.qcefq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
async function db_connect() {
  await mongoose.connect('mongodb+srv://devuser:gimmeshelter@boonehousinghelp.qcefq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}

db_connect();
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
