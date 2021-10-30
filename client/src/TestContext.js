import React, {useContext} from 'react';
import { UserContext } from './context/Store';

const TestContext = () => {
  const [user, setUser] = useContext(UserContext);
  //console.log(user);
  let user_auth = user.auth ? "yes" : "no";
  let user_verified = user.verified ? "yes" : "no";
  return (
    <>
    <h3>user id: {user.id}</h3>
    <h3>user token: {user.token}</h3>
    <h3>user auth: {user_auth}</h3>
    <h3>user verified: {user_verified}</h3>
    <h3>user name: {user.name}</h3>
    <h3>user email: {user.email}</h3>
    </>
  )
}

export default TestContext;