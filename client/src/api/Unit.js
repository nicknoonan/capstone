import axios from 'axios';

async function get_all_units() {
  return new Promise((resolve, reject) => {
    axios.get('/api/unit',{
      params: {
        name: 'all'
      }
    }).then((res) => {
      let units = res.data.unit;
      resolve(units);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

export default get_all_units;