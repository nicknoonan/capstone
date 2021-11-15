import React, { useContext } from 'react'
import CardItem from './CardItem';
import './Cards.css';
import { UserContext } from '../../context/Store';


function Cards() {
  const [user] = useContext(UserContext);
  let login_card = user.auth ? null :
    <CardItem
      src='https://i.ibb.co/LpsLc3F/J-project-3.jpg'
      text="Login"
      label="Sign up/Login"
      path='/login'
    />
  return (
    <div className='cards'>
      <h1>Explore Our Site!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__item">
            <CardItem
              src='https://i.ibb.co/zFJs8mN/BHH01.jpg'
              text="Browes local houseing agentices, units, and properties"
              label="Browse"
              path='/Browse'
            />

            <CardItem
              src='https://i.ibb.co/C2BZg8L/J-project-4.jpg'
              text="Read up on what our website has to offer!"
              label="Info Page"
              path='/about'
            />
            {login_card}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
