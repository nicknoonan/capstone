const Qresult = require('../../models/Qresult');
const Qmodel = require('../../models/Qmodel');
const User = require('../../models/User');
const { qmodel_exists } = require('./Qmodel');
const mongoose = require('mongoose');

async function post_qresult(req, res) {
  const {qmodel_id, user_id, review_of_id, survey_result} = req.body;
  if (qmodel_id && user_id && review_of_id && survey_result) {
    Qresult.findOne({user_id: user_id, review_of_id: review_of_id}, function(err, qresult) {
      if (err){
        res.status(500).json({message: "server error. " + err});
      }
      else if (qresult) {
        res.status(409).json({message: "user has already reviewed entity"});
      }
      else {
        Qmodel.findById(qmodel_id, function(err, qmodel) {
          if (err) {
            res.status(500).json({message: "server error. " + err});
          }
          else if (qmodel) {
            User.findById(user_id, function(err, user) {
              if (err) {
                res.status(500).json({message: "server error. " + err});
              }
              else if (user) {
                const new_qresult = new Qresult({qmodel_id, user_id, review_of_id, survey_result});
                new_qresult.save().then(function() {
                  res.status(200).json({message: "new qresult saved."});
                }).catch(function(err) {
                  res.status(400).json({message: "failed to save new qresult" + err});
                });
              }
              else {
                res.status(400).json({message: "no matching user found. "});
              }
            });
            
          }
          else {
            res.status(400).json({message: "no matching qmodel found. "});
          }
        });
      }
    });
    
  }
  else {
    res.status(400).json({message: "invalid post qresult. missing required parameters"});
  }
}
async function get_qresult(req, res) {
  const {id, user_id, qmodel_id, review_of_id} = req.query;
  if (id) {
    get_qresult_by_id(id).then(function(query_res){
      res.status(query_res.status).json({qresult: query_res.qresult});
    }).catch(function(err){
      res.status(err.status).json({message: err.message});
    });
  }
  else if (user_id) {
    get_qresult_by_user(user_id).then(function(query_res){
      res.status(query_res.status).json({qresult: query_res.qresult});
    }).catch(function(err){
      res.status(err.status).json({message: err.message});
    });
  }
  else if (qmodel_id) {
    get_qresult_by_qmodel(qmodel_id).then(function(query_res){
      res.status(query_res.status).json({qresult: query_res.qresult});
    }).catch(function(err){
      res.status(err.status).json({message: err.message});
    });
  }
  else if (review_of_id) {
    get_qresult_by_review_of(review_of_id).then(function(query_res){
      res.status(query_res.status).json({qresult: query_res.qresult});
    }).catch(function(err){
      res.status(err.status).json({message: err.message});
    });
  }
  else {
    res.status(400).json({message: "invalid get qresult. missing required parameters"});
  }
}
async function get_qresult_by_id(id) {
  return new Promise((resolve, reject) => {
    Qresult.findById(id, function(err, qresult) {
      if(err) {
        let res = {
          status: 500,
          message: "server err" + err
        };
        reject(res);
      }
      else if (qresult) {
        let res = {
          status: 200,
          qresult: qresult
        };
        resolve(res);
      }
      else {
        let res = {
          status: 400,
          message: "not matching qresult was found"
        };
        reject(res);
      }
    });
  });
}
async function get_qresult_by_user(user) {
  return new Promise((resolve, reject) => {
    Qresult.find({user_id: user}, function(err, qresult) {
      if(err) {
        let res = {
          status: 500,
          message: "server err" + err
        };
        reject(res);
      }
      else if (qresult) {
        let res = {
          status: 200,
          qresult: qresult
        };
        resolve(res);
      }
      else {
        let res = {
          status: 400,
          message: "not matching qresult was found"
        };
        reject(res);
      }
    });
  });
}
async function get_qresult_by_qmodel(qmodel) {
  return new Promise((resolve, reject) => {
    Qresult.find({qmodel_id: qmodel}, function(err, qresult) {
      if(err) {
        let res = {
          status: 500,
          message: "server err" + err
        };
        reject(res);
      }
      else if (qresult) {
        let res = {
          status: 200,
          qresult: qresult
        };
        resolve(res);
      }
      else {
        let res = {
          status: 400,
          message: "not matching qresult was found"
        };
        reject(res);
      }
    });
  });
}
async function get_qresult_by_review_of(review_of) {
  return new Promise((resolve, reject) => {
    Qresult.find({review_of_id: review_of}, function(err, qresult) {
      if(err) {
        let res = {
          status: 500,
          message: "server err" + err
        };
        reject(res);
      }
      else if (qresult) {
        let res = {
          status: 200,
          qresult: qresult
        };
        resolve(res);
      }
      else {
        let res = {
          status: 400,
          message: "not matching qresult was found"
        };
        reject(res);
      }
    });
  });
}

module.exports = { get_qresult, post_qresult};