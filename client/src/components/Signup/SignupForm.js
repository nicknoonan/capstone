import { thisTypeAnnotation } from '@babel/types';
import { login_user, get_user } from '../../api/User'
import React, { useState, useEffect } from 'react';
import { sign_up_user } from '../../api/User';

export default function SignupForm(props) {
  //name
  //email
  //password
  const initialState = {
    name: 'nick',
    email: 'nick@email.com',
    password: 'pass',
    submitting: false,
    userCreated: false
  }
  const [name, setName] = useState(initialState.name);
  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);
  const [submitting, setSubmitting] = useState(initialState.submitting);
  const [userCreated, setUserCreated] = useState(initialState.userCreated);
  function handleName(event) { setName(event.target.value); }
  function handleEmail(event) { setEmail(event.target.value); }
  function handlePassword(event) { setPassword(event.target.value); }
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
    })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
      });
  }
  if (userCreated) {
    return (
      <>
        <h3>user created successfully</h3>
      </>
    )

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