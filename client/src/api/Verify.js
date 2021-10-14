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

//return new Promise((resolve, reject) => {
//  axios.get('/api/agency',{
//    params: {
//      name: 'all'
//    }
//  }).then((res) => {
//    let agencies = res.data.agency;
//    resolve(agencies);
//  }).catch((err) => {
//    console.log(err);
//    reject(err);
//  });
//});