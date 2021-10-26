import { thisTypeAnnotation } from '@babel/types';
import { login_user, get_user } from '../../api/User'
import React, { useState, useEffect } from 'react';
import { sign_up_user } from '../../api/User';
import Signup from '../../pages/Signup';
import Box from '@material-ui/core/Box';
import '../../App.css';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Nav, Row, Col, Container
} from 'react-bootstrap';
import Aload from '../loading/loading';
import '../../App.css';
//import UserContext from "../../UserProvider";


export default function SignupForm(props) {

  const initialState = {
    name: '',
    email: '',
    password: '',
    submitting: false,
    userCreated: false,
    loading: true,
    isSession: false,
  }
  const [name, setName] = useState(initialState.name);
  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);
  const [submitting, setSubmitting] = useState(initialState.submitting);
  const [userCreated, setUserCreated] = useState(initialState.userCreated);
  const [loading, setLoading] = useState(initialState.loading);
  const [isSession, setIsSession] = useState(initialState.isSession);
  function handleName(event) { setName(event.target.value); }
  function handleEmail(event) { setEmail(event.target.value); }
  function handlePassword(event) { setPassword(event.target.value); }


  useEffect(() => {
    let localuser;
    try {
      localuser = JSON.parse(localStorage.getItem('user'));
    }
    catch (err) {
      console.log(err);
      setLoading(false);
      return;
    }
    if (localuser) {
      get_user(localuser.id, localuser.token)
      .then((res) => {
        if (res.data._id) {
          setLoading(false);
          setIsSession(true);
          setTimeout(() => {
            window.location = '/';
          }, 1500);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }
    setLoading(false);
  })
  function handleClear() {
    setName(initialState.name);
    setEmail(initialState.email);
    setPassword(initialState.password);
  }
  function handleSubmit(event) {
    setSubmitting(true);
    const user = {
      name: name,
      email: email,
      password: password
    };
    sign_up_user(user).then((res) => {
      console.log(res);
      setSubmitting(false);
      setUserCreated(true);
      setTimeout(() => { window.location = "/login"; }, 1000);
    }).catch((err) => {
      if (err.response.status == 409) alert('an account with that email already exists');
      setSubmitting(false);
    });
  }
  if (loading) {
    return (
      <div>
        <h2 className='SignInText' align='center' margin='50'>Loading</h2>
        <Aload />
      </div>
    );
  }
  else if (isSession) {
    return (
      <>
        <h3>already logged in. redirecting to home...</h3>
      </>
    );
  }
  else if (userCreated) {
    return (
      <>
        <h3>user created successfully... redirecting to sign in</h3>
      </>
    );
  }
  else if (submitting) {
    return (
      <>
        <h3>submitting...</h3>
      </>
    );
  }
  else {
    return (
      <>
        <Box>
          <Row>
            <Col>
              <Box sx={{margin: 30}}><h2 className='Pageheader1'>Create an Account</h2></Box>
              <Box 
              sx={{
              bgcolor: 'rgb(238,238,228)',
              boxShadow: 1,
              borderRadius: 1,
              p: 2,
              minWidth: 300,
              margin: 30,
              }}>

              <form>
                
                <h4 className='SignInText'>Name</h4>
                <label>
                  <input className='field' type="text" value={name} onChange={handleName} />
                </label>
                

                <h4 className='SignInText'>Email</h4>
                <label>
                  <input className='field' type="text" value={email} onChange={handleEmail} />
                </label>
                

                <h4 className='SignInText'>Password</h4>
                <label>
                  <input className='field' type="password" value={password} onChange={handlePassword} />
                </label>
                <h1></h1>
                <button className='button' onClick={handleSubmit}>Submit</button>
                

              </form>
              </Box>
            </Col>

            <Col>
              <Box>
                <Card>
                  {/* <Card.Img variant="top" src="https://i.ibb.co/SBTXD7g/image0.jpg" /> */}
                </Card>
              </Box>
            </Col>

          </Row>
        </Box>
      </>
    );
  }
}