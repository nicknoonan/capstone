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

async function search_units(field, query) {
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
      axios.get('/api/unit', { params }).then((res) => {
        resolve(res.data.units);
      }).catch((err) => {
        reject(err);
      });
    }
    else {
      reject();
    }
  });
}

export {get_all_units,get_unit_by_name,get_unit_by_id,search_units}
