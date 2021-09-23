import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages';
import About from './pages/about';
import Contact from './pages/contact';
import SignUp from './pages/signup';
import SignIn from './pages/signin';

class App extends React.Component {
  static getDerivedStateFromProps(props, state) {
    
  }
  construct() {

  }

  render () {
    return (
      <div>
        <h1>app</h1>
      </div>
    );
  }
}

export default App;
