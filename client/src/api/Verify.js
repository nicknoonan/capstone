import axios from 'axios';

async function verify_user(token) {
  return new Promise((resolve, reject) => {
    axios.get('api/verify', {
      params: {
        token: token
      }
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

export { verify_user };