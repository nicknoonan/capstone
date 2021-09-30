import axios from 'axios';

async function get_all_agencies() {
  return new Promise((resolve, reject) => {
    axios.get('/api/agency',{
      params: {
        name: 'all'
      }
    }).then((res) => {
      let agencies = res.data.agency;
      resolve(agencies);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

export default get_all_agencies;