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
async function get_unit_by_name(name) {
  return new Promise((resolve, reject) => {
    axios.get('/api/unit',{
      params: {
        name: name
      }
    }).then((res) => {
      let unit = res.data.unit;
      resolve(unit);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}
async function get_unit_by_id(id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/unit',{
      params: {
        id: id
      }
    }).then((res) => {
      let unit = res.data.unit;
      resolve(unit);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

export {get_all_units,get_unit_by_name,get_unit_by_id}
