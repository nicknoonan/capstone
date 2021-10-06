import { get_unit_by_name } from '../api/Unit';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import NewReviewForm from '../components/Review/NewReviewForm';


function Unit(props) {
  const initialState = {
    name: "",
    website: "",
    address: "",
    rating: 0,
    email: "",
    phone: "",
    est: "",
    isLoading: true,
    id: ""
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
    if (props.unit) {
      setIsLoading(false);
    }
    else {
      console.log("name param: " + nameParam);
      get_unit_by_name(nameParam).then((unit) => {
        setName(unit.name);
        setWebsite(unit.website);
        setAddress(unit.address);
        setRating(unit.rating);
        setEmail(unit.email);
        setPhone(unit.phone);
        setEst(unit.est);
        setId(unit._id);
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
        <h1>Unit Page</h1>
        <h3>{name}</h3>
        <h3>{website}</h3>
        <h3>{address}</h3>
        <h3>{rating}</h3>
        <NewReviewForm enabled={true} review_type={"unit_t"} review_of={id}></NewReviewForm>
      </>
    );
  }
}

export default Unit
