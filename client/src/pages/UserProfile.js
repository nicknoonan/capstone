import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import { ReviewResult, ReviewResultList } from '../components/Review/ReviewResult';
import SocialSentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import Aload from '../components/loading/loading';
import Redir from '../components/loading/redirecting';
import { UserContext } from "../context/Store";
import '../App.css';


function UserProfile(props) {
  const [user] = useContext(UserContext);
  const initialState = {
    username: "",
    email: "",
    verified: false,
    isVerified: false,
    isLoading: true,
    isAuth: false
  };

  const [username, setUsername] = useState(initialState.username);
  const [email, setEmail] = useState(initialState.email);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [isVerified, setIsVerified] = useState(initialState.isVerified);
  const [isAuth, setIsAuth] = useState(initialState.isAuth);

  useEffect(() => {
    if (props.user) {
      setUsername(props.user.username);
      setEmail(props.user.email);
      setIsVerified(true);
      setIsLoading(false);
    }
    else {

    }
  }, []);

  if (user.loading) {
    return (
      <div>
        <h2 className='SignInText' align='center' margin='50'>Loading User Profile</h2>
        <Aload />
      </div>
    )
  }
  else if (user.auth === false) {
    setTimeout(() => {
      window.location = '/login'
    }, 500);
    return (
      <div>
        <h2 className='SignInText' align='center'>Redirecting to login</h2>
        <Redir />
      </div>
    )
  }
  else {
    let verified_render = user.verified ? (
      <Row>
        <h4 className='UsernameText'>Verified Status: You are verified</h4>
      </Row>
    ) : (
      <Row>
        <h4>Verified Status: Please check your email, you still need to varify your email!</h4>
        <h4>You will not be able to make a review until your account has been verified!</h4>
      </Row>
    );
    let profile_render =
      <Box>
        <h2 className='Pageheader1' margin='30px'>User Profile</h2>
        <Box
          sx={{
            bgcolor: 'rgb(238,238,228)',
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 'justify',
            margin: 30,
          }}
        >
          <Row>
            <h4 className='UsernameText'>Username: {user.name}</h4>
          </Row>
          <Row>
            <h4 className='UsernameText'>Email: {user.email}</h4>
          </Row>
          {verified_render}
        </Box>

      </Box>
    return (
      <>
        <Box>
          <Row>

            <Col>
              {profile_render}
            </Col>

            <Col>
              <ReviewResultList list_type={'user_t'} user_id={user.id} />
            </Col>

          </Row>
        </Box>
      </>
    )
  }
}

export default (UserProfile);