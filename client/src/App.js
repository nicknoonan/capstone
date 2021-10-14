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
import Verify from './pages/Verify';
import { useEffect, useState } from 'react';
import { get_user } from './api/User'


// Included home and about in App's div
function App() {
  const initialState = {
    isLoggedIn: false
  };
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);
  useEffect(() => {
    let localuser;
    try {
      localuser = JSON.parse(localStorage.getItem('user'));
    }
    catch (err) {
      //console.log(err);
      //this.setState({loading:false});
      return;
    }
    if (localuser) {
      get_user(localuser.id, localuser.token)
      .then((res) => {
        if (res.data._id) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        //this.setState({loading:false});
      });
    }
    //this.setState({loading:false});
  },[]);
  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn}/>
      <Route classname="route" exact path="/" component={Home} />
      <Route classname="route" exact path="/about" component={About} />
      <Route classname="route" exact path="/browse" component={Browse} />
      <Route classname="route" exact path="/review" component={Review} />
      <Route classname="route" exact path="/login" component={Login} />
      <Route classname="route" exact path="/signup" component={Signup} />
      <Route classname="route" exact path="/agency" component={Agency} />
      <Route classname="route" exact path="/property" component={Property} />
      <Route classname="route" exact path="/unit" component={Unit} />
      <Route classname="route" exact path="/verify" component={Verify} />
      <Footer />
    </div>
  );
}

export default App;
