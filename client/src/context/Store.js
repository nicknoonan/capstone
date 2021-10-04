import React, { useState } from 'react';
import { get_user } from '../api/User';

export const GlobalContext = React.createContext();

let initialState = {
  user: '',
  token: '',
  id: '',
  isUserAuth: false
};
const Store = ({ children }) => {
  let localuser;
  try {
    localuser = JSON.parse(localStorage.getItem('user'));
  }
  catch (err) {
    console.log(err);
  }
  if (localuser) {
    initialState.user = localuser.email;
    initialState.token = localuser.token;
    initialState.id = localuser.id;
  }
  const [state, setState] = useState(initialState);
  return (
    <GlobalContext.Provider value={[state, setState]}>{children}</GlobalContext.Provider>
  );
}

export default Store;