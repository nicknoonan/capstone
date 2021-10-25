import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { get_user } from '../api/User';
import Box from '@material-ui/core/Box';
import { ReviewResult, ReviewResultList } from '../components/Review/ReviewResult';
import SocialSentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';

function UserProfile(props) {
  const initialState = {
    user_id: "",
    username: "",
    email: "",
    verified: false,
    isVerified: false,
    isLoading: true,
    isAuth: false
  };

  const [user_id, setUser_id] = useState(initialState.user_id);
  const [username, setUsername] = useState(initialState.username);
  const [email, setEmail] = useState(initialState.email);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [isVerified, setIsVerified] = useState(initialState.isVerified);
  const [isAuth, setIsAuth] = useState(initialState.isAuth);


  

  useEffect(() => {
    let user_id;
    let user_token;
    try {
      let localuser = JSON.parse(localStorage.getItem('user'));
      user_id = localuser.id;
      user_token = localuser.token;
    }
    catch (err) {
      console.log(err);
    }
    if (props.user) {
      setUser_id(props.user.user_id);
      setUsername(props.user.username);
      setEmail(props.user.email);
      setIsVerified(true);
      setIsLoading(false);
    }
    else {
      get_user(user_id, user_token).then((user) => {
        setUser_id(user.data._id);
        setUsername(user.data.name);
        setEmail(user.data.email);
        setIsVerified(user.data.verified);
        setIsAuth(true);
        setIsLoading(false);
        
      }).catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    }
  }, []);

  if (isLoading) {
    return (
      <>
        <h3>loading....</h3>
      </>
    )
  }
  else if (isAuth === false) {
    setTimeout(() => {
      window.location = '/login'
    }, 500);
    return (
      <>
      please log in to view your profile... redirecting to login.
      </>
    )
  }
  else {
    let verified_render = isVerified ? (
      <Row>
        <h4>Verified Status: You are verified</h4>
      </Row>
    ) : (
      <Row>
        <h4>Verified Status: Please check your email, you still need to varify your email!</h4>
        <h4>You will not be able to make a review until your account has been verified!</h4>
      </Row>
    );
    let profile_render =
      <Box>
        <h1>User Profile</h1>
        <Row>
          <h4>Username: {username}</h4>
        </Row>
        <Row>
          <h4>Email: {email}</h4>
        </Row>
        {verified_render}
      </Box>
    return (
      <>
        <Box>
          <Row>
            <Col>
              {profile_render}
              <ReviewResultList list_type={'user_t'} user_id={user_id}/>
            </Col>
          </Row>
        </Box>
      </>
    )
  }
}

export default (UserProfile);