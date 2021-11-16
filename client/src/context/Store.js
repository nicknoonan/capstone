import React, { useState, useEffect } from 'react';
import { get_user } from '../api/User';

export const UserContext = React.createContext(null);

let initialState = {
  name: '',
  email: '',
  token: '',
  id: '',
  auth: false,
  verified: false,
  loading: true
};
const UserProvider = ({ children }) => {
  let localuser;
  try {
    localuser = JSON.parse(localStorage.getItem('user'));
  }
  catch (err) {
    console.log(err);
  }
  if (localuser) {
    initialState.token = localuser.token;
    initialState.id = localuser.id;
  }
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    let new_user = {...user};
    get_user(user.id, user.token).then((_user) => {
      new_user.auth = true;
      console.log(_user);
      if (_user.data.verified === true) {
        new_user.verified = true;
      }
      new_user.name = _user.data.name;
      new_user.email = _user.data.email;
      new_user.loading = false;
      initialState = new_user;
      setUser(new_user);
    }).catch((err) => {
      console.log(err);
      new_user.loading = false;
      setUser(new_user);
    })
  },[]);
  return (
    <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>
  );
}

export default UserProvider;