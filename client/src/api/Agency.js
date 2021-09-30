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
async function get_agency_by_name(name) {
  return new Promise((resolve, reject) => {
    axios.get('/api/agency',{
      params: {
        name: name
      }
    }).then((res) => {
      let agency = res.data.agency;
      resolve(agency);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}
async function get_agency_by_id(id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/agency',{
      params: {
        id: id
      }
    }).then((res) => {
      let agency = res.data.agency;
      resolve(agency);
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

export default get_all_agencies;