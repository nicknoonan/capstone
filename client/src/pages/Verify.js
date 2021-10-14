import { useLocation } from 'react-router-dom';
import { React, useState, useEffect } from "react";
import { verify_user } from "../api/Verify";


function Verify(props) {
  const [waiting, setWaiting] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  let token = props.token;
  const search = useLocation().search;
  if (!token) {
    token = new URLSearchParams(search).get('token');
  }
  useEffect(() => {
    console.log(token);
    if (token) {
      verify_user(token).then((res) => {
        setVerified(true);
      }).catch((err) => {
        console.log(err);
        setError(true);
      });
    }
    else {
      setError(true);
    }
  });
  if (error) {
    return(
      <>
      error verifying user. invalid verification url.
      </>
    );
  }
  else if (verified) {
    return(
      <>
      user successfully verified.
      </>
    );
  }
  else if (waiting) {
    return(
      <>
      verifying...
      </>
    );
  }
}

export default Verify;