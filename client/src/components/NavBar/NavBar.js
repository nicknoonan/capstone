import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ul, Li } from './NavBarStyles';
import './NavBar.css';
import { Button } from '../Button';


// function NavBar(){

//     const [button, setButton] = useState(true)
//     const showButton = () => {
//         if(window.innerWidth <= 960) {
//             setButton(false);
//         } else {
//             setButton(true);
//         }
//     };

//     window.addEventListener('resize', showButton);

//     return(
//         <Ul>

//             <Li>
//                 <Link style={{textDecoration: 'none'}} to="/">Home</Link>
//              </Li>
//             <Li>
//                 <Link style={{textDecoration: 'none'}} to="/about">About</Link>
//             </Li>
//             <Li>
//                 <Link style={{textDecoration: 'none'}} to="/browse">Browse</Link>
//             </Li>
//             <Li>
//                 <Link style={{textDecoration: 'none'}} to="/review">Review</Link>
//             </Li>
//             <Li>
//                 <Link style={{textDecoration: 'none'}} to="/login">Login</Link>
//             </Li>
//             <Li>
//                 {/* If button exists then create our sign up botton */}
//                 {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} 
//             </Li>
//         </Ul>
//     );
// }

// export default NavBar;


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
          <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              Boone Houseing Help
              <i class='fab fa-typo3' />
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
                
                <a className='nav-links' onClick={handleLogout}>
                  Logout
                </a>
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
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              Boone Houseing Help
              <i class='fab fa-typo3' />
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