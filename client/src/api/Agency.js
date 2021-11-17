import axios from 'axios';

async function get_all_agencies() {
  return new Promise((resolve, reject) => {
    axios.get('/api/agency', {
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
    axios.get('/api/agency', {
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
    axios.get('/api/agency', {
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

async function search_agencies(field, query) {
  return new Promise((resolve, reject) => {
    //console.log(field + " " + query);
    if (field && query) {
      let params = {
        field: null,
        regex: null
      };
      const regex = query.replace(/ /gi, "|");
      console.log(regex);
      params.field = field;
      params.regex = regex;
      axios.get('/api/agency', { params }).then((res) => {
        resolve(res.data.agencies);
      }).catch((err) => {
        reject(err);
      });
    }
    else {
      reject();
    }
  });
}

async function post_agency(agency, token) {
  
}

export { get_all_agencies, get_agency_by_id, get_agency_by_name, search_agencies };