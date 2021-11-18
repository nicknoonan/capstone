import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ul, Li } from './NavBarStyles';
import './NavBar.css';
import { Button } from '../Button';
import UserProfile from "../../pages/UserProfile";


function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  function handleLogout() {
    localStorage.setItem('user','');
    window.location = '/';
  }
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  if (props.isLoggedIn) {
    return (
      <>
        <nav className='navbar'>
        <img src='https://i.ibb.co/xsh2hyn/White-Logo.png'/>
          <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              Boone Housing Help
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/Browse'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Browse
                </Link>
              </li>
              {/* <li className='nav-item'>
                <Link
                  to='/About'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li> */}
              <li className='nav-item'>
                
                <a className='nav-links' onClick={handleLogout}>
                  Logout
                </a>
              </li>
              <li className='nav-item'>
                <Link to="/userprofile" className='nav-links' onClick={closeMobileMenu}>View Profile</Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
  else {
    return (
      <>
        <nav className='navbar'>
          <div className='navbar-container'>
          <img src='https://i.ibb.co/xsh2hyn/White-Logo.png'/>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              Boone Housing Help
            </Link>
            <div className='menu-icon' onClick={handleClick}>
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/Browse'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Browse
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/About'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
          </div>
        </nav>
      </>
    );    
  }

}

export default Navbar;