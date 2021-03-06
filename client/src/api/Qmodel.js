import axios from 'axios';

const AGENCY_MODEL_ID = "6195a5dcfa98f58689c1de6d";
const PROPERTY_MODEL_ID = "6195a5b3fa98f58689c1de67";
const UNIT_MODEL_ID = "6195a503fa98f58689c1de36";


async function get_qmodel_by_type(type) {
  let id = undefined;
  if (type === "agency_t") {
    id = AGENCY_MODEL_ID;
  }
  else if (type === "property_t"){
    id = PROPERTY_MODEL_ID;
  }
  else if (type === "unit_t") {
    id = UNIT_MODEL_ID;
  }
  return new Promise((resolve, reject) => {
    if (id) {
      get_qmodel_by_id(id).then(function(res){
        resolve(res);
      }).catch(function(err){
        reject(err);
      });
    }
    else {
      reject(type + " is not a valid type");
    }
  });
}

async function get_qmodel_by_id(id) {
  return new Promise((resolve, reject) => {
    axios.get('/api/qmodel', {
      params: {
        id: id
      }
    }).then((res) => {
      let qmodel = res.data.qmodel;
      resolve(qmodel);
    }).catch((err) => {
      reject(err);
    });
  });
}

async function get_qmodel_by_name(name) {
  return new Promise((resolve, reject) => {
    axios.get('/api/qmodel', {
      params: {
        name: name
      }
    }).then((res) => {
      let qmodel = res.data.qmodel;
      resolve(qmodel);
    }).catch((err) => {
      reject(err);
    });
  });
}
//
// ive written this incase we ever want to build a UI allowing us to submit new qmodels.
// but for now i think that using postman is sufficient while we are building more important ui components
//
//async function new_qmodel(qmodel) {
//  const { type, name, survey_json } = qmodel;
//  return new Promise((resolve, reject) => {
//    axios.post('/api/qmodel', {
//      type, name, survey_json
//    }).then((res) => { resolve(res); }).catch((err) => { reject(err); });
//  });
//}
//
export {get_qmodel_by_type, get_qmodel_by_id, AGENCY_MODEL_ID, PROPERTY_MODEL_ID, UNIT_MODEL_ID};