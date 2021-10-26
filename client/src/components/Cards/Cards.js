import React from 'react'
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
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
              src='https://i.ibb.co/5YPLMqX/BHH03.jpg'
              text="Make an account/Login"
              label="Sign up/Login"
              path='/login'
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
