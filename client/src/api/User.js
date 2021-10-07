import axios from 'axios';

async function login_user(user, pass) {
  return new Promise((resolve, reject) => {
    axios.post('/api/login', {
      email: user,
      password: pass
    })
    .then((res) => {
      //console.log(res);
      resolve(res.data);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

async function get_user_session() {
  return new Promise((resolve, reject) => {

  });
}

async function get_user(id, token) {
  return new Promise((resolve, reject) => {
    axios.get('/api/user', {
      params: {
        id: id
      },
      headers: {
        authtoken: token
      }
    })
    .then((res) => {
      //console.log(res);
      resolve(res);
    })
    .catch((err) => {
      console.log(err.message);
      reject(err);
    });
  });
}

async function sign_up_user(user) {
  return new Promise((resolve, reject) => {
    if (!(user.email && user.name && user.password)) {
      reject({message: 'invalid user'});
    }
    axios.post('/api/newuser', {
      name: user.name,
      email: user.email,
      password: user.password,
    })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    })
  });
  
}


export { login_user, get_user, sign_up_user };

