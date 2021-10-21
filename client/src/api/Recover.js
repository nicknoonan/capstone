import axios from 'axios';

async function recover_pass(email) {
  return new Promise((resolve, reject) => {
    axios.post('api/recover', {
      email: email
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function update_pass(token, password) {
  return new Promise((resolve, reject) => {
    axios.post('api/update_password', {
      token: token,
      new_password: password
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

export { recover_pass, update_pass };