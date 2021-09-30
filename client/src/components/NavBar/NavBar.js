import React from 'react';
import {Link} from 'react-router-dom';
import { Ul, Li } from './NavBarStyles';

function NavBar(){
    return(
        <Ul>
            <Li>
                <Link style={{textDecoration: 'none'}} to="/">Home</Link>
             </Li>
            <Li>
                <Link style={{textDecoration: 'none'}} to="/about">About</Link>
            </Li>
            <Li>
                <Link style={{textDecoration: 'none'}} to="/browse">Browse</Link>
            </Li>
            <Li>
                <Link style={{textDecoration: 'none'}} to="/review">Review</Link>
            </Li>
            <Li>
                <Link style={{textDecoration: 'none'}} to="/login">Login</Link>
            </Li>
        </Ul>
    );
}

export default NavBar;