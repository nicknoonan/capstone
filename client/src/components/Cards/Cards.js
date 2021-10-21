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
              src='https://via.placeholder.com/200'
              text="Browes local houseing agentices, units, and properties"
              label="Browse"
              path='/Browse'
            />

            <CardItem
              src='https://via.placeholder.com/200'
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
