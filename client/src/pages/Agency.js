import { get_agency_by_name } from '../api/Agency';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import '../App.css';

import {
  Row, Col, Container
} from 'react-bootstrap';

function Agency(props) {
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
    if (props.agency) {
      setIsLoading(false);
    }
    else {
      //get agency name from url
      //parse agency name
      //make api call using get_agency_by_name()
      //get_agency_by_name returns a promise
      //getagency().then().catch();
      //handle loading state
      console.log("name param: " + nameParam);
      get_agency_by_name(nameParam).then((agency) => {
        setName(agency.name);
        setWebsite(agency.website);
        setAddress(agency.address);
        setRating(agency.rating);
        setEmail(agency.email);
        setPhone(agency.phone);
        setEst(agency.est);
        setId(agency._id);
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

            {/* <Row>
              <h3>{address}</h3>
            </Row> */}

          </Col>

          <Col>
          
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
      </>
    );
  }
}

export default Agency

{/* <h1>{name}</h1>
        {/* Picture */}
        // <h3>{website}</h3>
        // <h3>{address}</h3>
        // <h3>{email}</h3>
        // <h3>{phone}</h3>
        // <h3>{est}</h3> */}