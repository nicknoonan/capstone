import React from 'react';

// Importing Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

// Importing Router for Pathing
import { Route, Link } from "react-router-dom";

// Importing NavBar
import NavBar from './components/NavBar';

// Importing Footer
import { FooterContainer } from './containers/Footer'

class App extends React.Component {
  render() {
    return (
      <div>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <FooterContainer />
  </div>
    );
    

  }
}

export default App;