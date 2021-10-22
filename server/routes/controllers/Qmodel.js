const Qmodel = require('../../models/Qmodel.js');
const mongoose = require('mongoose');

async function post_qmodel(req, res) {
  const { type, name, survey_json } = req.body;
  if (type && name && survey_json) {
    const new_qmodel = new Qmodel({type, name, survey_json});
    new_qmodel.save().then(function() {
      res.status(200).json({message: "new qmodel saved."});
    }).catch(function(err) {
      res.status(400).json({message: "failed to save new qmodel" + err});
    });
  }
  else {
    res.status(400).json({message: "invalid request. missing required parameters."});
  }
}

async function qmodel_exists(qmodel_id) {
  return new Promise((resolve, reject) => {
    get_qmodel_by_id(qmodel_id).then(() => resolve(true)).catch(() => resolve(false));
  });
}

async function get_qmodel(req, res) {
  const {id, name} = req.query;
  if (id) {
    await get_qmodel_by_id(id).then(function(query_res) {
      res.status(query_res.status).json({qmodel: query_res.qmodel});
    }).catch(function(err) {
      res.status(err.status).json({message: err.message});
    });
  }
  else if (name) {
    await get_qmodel_by_name(name).then(function(query_res) {
      res.status(query_res.status).json({qmodel: query_res.qmodel});
    }).catch(function(err) {
      res.status(err.status).json({message: err.message});
    });
  }
  else {
    res.status(400).json({message: "invalid request. missing required parameters"});
  }
}
async function get_qmodel_by_id(id) {
  return new Promise((resolve, reject) => {
    if(id) {
      Qmodel.findById(id, function(err,qmodel) {
        if (err) {
          let res = {
            status: 500,
            message: "server error" + err
          };
          reject(res);
        }
        else if (qmodel) {
          let res = {
            status: 200,
            qmodel: qmodel
          };
          resolve(res);
        }
        else {
          let res = {
            status: 409,
            message: "failed to find matching qmodel."
          };
          reject(res);
        }
      });
    }
    else {
      let res = {
        status: 400,
        message: "invalid request. missing required parameters."
      };
      reject(res);
    }
  });
}
async function get_qmodel_by_name(name) {
  return new Promise((resolve, reject) => {
    if (name) {
      Qmodel.findOne({name}, function(err,qmodel) {
        if (err) {
          let res = {
            status: 500,
            message: "server error" + err
          };
          reject(res);
        }
        else if (qmodel) {
          let res = {
            status: 200,
            qmodel: qmodel
          };
          resolve(res);
        }
        else {
          let res = {
            status: 409,
            message: "failed to find matching qmodel."
          };
          reject(res);
        }
      });
    }
    else{
      let res = {
        status: 400,
        message: "invalid request. missing required parameters."
      };
      reject(res);
    }
  }); 
}

module.exports = { get_qmodel, post_qmodel, qmodel_exists };