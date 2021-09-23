import logo from './logo.svg';
import './App.css';


// Imported Home and about
import Home from './Home'
import About from './About'

// Importing the Route for multiple pages
import { Route, Link } from "react-router-dom";

// Importing the NavBar for the navigation bar
import NavBar from './NavBar';

import Footer from './components/Footer';

// Included home and about in App's div
function App() {
  return (
        
      <div className="App">
      
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Footer />

    </div>
  );
}

export default App;
