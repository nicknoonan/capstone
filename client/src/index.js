import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from './global-styles'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// Imported the browser router from the react
// router dom
// Then samwitched the <App /> inbetween the
// <React.StrictMode>

// For footer

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
reportWebVitals();
