import { get_property_by_name } from '../api/Property';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
//import EntityReview from '../components/Review/EntityReview'
import ReviewButton from '../components/ReviewButton/ReviewButton';

import {
  Row, Col, Container
} from 'react-bootstrap';

function Property(props) {
  const initialState = {
    name: "",
    website: "",
    address: "",
    rating: 0,
    email: "",
    phone: "",
    est: "",
    id: "",
    isLoading: true,
    // isError: false
  };
//  let errorMessage = '';
  const [name, setName] = useState(initialState.name);
  const [website, setWebsite] = useState(initialState.website);
  const [address, setAddress] = useState(initialState.address);
  const [rating, setRating] = useState(initialState.rating);
  const [email, setEmail] = useState(initialState.email);
  const [phone, setPhone] = useState(initialState.phone);
  const [est, setEst] = useState(initialState.est);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [id, setId] = useState(initialState.id);
//   const [isError, setError] = useState(initialState.isError);
  const search = useLocation().search;
  const nameParam = new URLSearchParams(search).get('name');
  useEffect(() => {
    if (props.property) {
      setIsLoading(false);
    }
    else {
      console.log("name param: " + nameParam);
      get_property_by_name(nameParam).then((property) => {
        setName(property.name);
        setWebsite(property.website);
        setAddress(property.address);
        setRating(property.rating);
        setEmail(property.email);
        setPhone(property.phone);
        setEst(property.est);
        setId(property._id);
        setIsLoading(false);
        // setError(false);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);
 

  if (isLoading) {
    return (
      <>
        <h3>loading...</h3>
      </>
    );
  }
//   else if(isError) {
//       <>
//         <h3>Error Message</h3>
//       </>
//   }
  else {
    return (
      <>
        <h1 className='infoPage'>{name}</h1>;
        <Container>
          <Col>

            <Row>
              <h3>{website}</h3>
              <h3>{address}</h3>
            </Row>
          
            <Row>
              <h3>{email}</h3>
            </Row>

            <Row>
             <h3>{phone}</h3>
            </Row>

            <Row>
            <h3>{rating}</h3>
            </Row>
          </Col>
        </Container>
        {/*<PropReview property_id={id} property_name={name}/>*/}
        {/*<EntityReview type={"property_t"} review_of_id={id} entity_name={name} />*/}
        <ReviewButton review_of_id={id} type={"unit_t"} entity_name={name}/>
      </>
    );
  }
}

export default Property

