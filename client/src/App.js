import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import About from './pages/About'
import Browse from './pages/Browse';
import Review from './pages/Review';
import Login from './pages/Login';
import { Route, Link } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

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
      <Footer />
    </div>
  );
}

export default App;
