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
async function get_property_by_name(name) {
  return new Promise((resolve, reject) => {
    axios.get('/api/property',{
      params: {
        name: name
      }
    }).then((res) => {
      let property = res.data.property;
      resolve(property);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}
async function get_property_by_id(id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/property',{
      params: {
        id: id
      }
    }).then((res) => {
      let property = res.data.property;
      resolve(property);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

export  {get_all_properties, get_property_by_name};