import axios from 'axios';

async function get_all_properties() {
  return new Promise((resolve, reject) => {
    axios.get('/api/property',{
      params: {
        name: 'all'
      }
    }).then((res) => {
      let properties = res.data.property;
      resolve(properties);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

export default get_all_properties;