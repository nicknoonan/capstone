import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import Browse from './pages/Browse';
import Review from './pages/Review';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Route, Link } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Agency from './pages/Agency';
import Property from './pages/Property';
import Unit from './pages/Unit';


// Included home and about in App's div
function App() {
  return (
    <div className="App">
      <NavBar />
      <Route classname="route" exact path="/" component={Home} />
      <Route classname="route" exact path="/about" component={About} />
      <Route classname="route" exact path="/browse" component={Browse} />
      <Route classname="route" exact path="/review" component={Review} />
      <Route classname="route" exact path="/login" component={Login} />
      <Route classname="route" exact path="/signup" component={Signup} />
      <Route classname="route" exact path="/agency" component={Agency} />
      <Route classname="route" exact path="/property" component={Property} />
      <Route classname="route" exact path="/unit" component={Unit} />
      <Footer />
    </div>
  );
}

export default App;
