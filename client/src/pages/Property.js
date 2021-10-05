// // import React from 'react'

// // function Property() {
// //     return (
// //         <>
// //             <h1>Property Page</h1>
// //         </>
// //     )
// // }

// export default Property

import { get_property_by_name } from '../api/Property';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Property(props) {
  const initialState = {
    name: "",
    website: "",
    address: "",
    rating: 0,
    email: "",
    phone: "",
    est: "",
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
        <h1>Property Page</h1>
        <h3>{name}</h3>
        <h3>{website}</h3>
        <h3>{address}</h3>
        <h3>{rating}</h3>
      </>
    );
  }
}

export default Property

