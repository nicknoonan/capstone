import { thisTypeAnnotation } from '@babel/types';
import { login_user, get_user } from '../../api/User'
import React, { useState, useEffect } from 'react';
import { sign_up_user } from '../../api/User';
import Signup from '../../pages/Signup';

export default function SignupForm(props) {

  const initialState = {
    name: 'nick',
    email: 'nick@email.com',
    password: 'pass',
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
    console.log("USE EFFECT CALLED");
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
      <>
        <h3>loading..</h3>
      </>
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
        <h2>sign up form</h2>
        <form>
          <label>
            name:
            <input type="text" value={name} onChange={handleName} />
          </label>
          <label>
            email:
            <input type="text" value={email} onChange={handleEmail} />
          </label>
          <label>
            password:
            <input type="password" value={password} onChange={handlePassword} />
          </label>
          <button onClick={handleSubmit}>submit</button>
        </form>
      </>
    );
  }
}