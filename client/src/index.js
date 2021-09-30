import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from './global-styles'
import App from './App';
//import reportWebVitals from './reportWebVitals';


import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
   <> 
    <GlobalStyles />
    <React.StrictMode>
        <BrowserRouter>
            <App/> 
        </BrowserRouter>
    </React.StrictMode>
    </>
    ,
document.getElementById('root')
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Imported Browser Router
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
<<<<<<< HEAD
//reportWebVitals();
=======
reportWebVitals();
>>>>>>> 36fe1612deb3b6b157894ee2e8832ae65a2f1cc9
