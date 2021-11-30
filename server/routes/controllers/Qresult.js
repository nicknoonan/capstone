const Qresult = require('../../models/Qresult');
const Qmodel = require('../../models/Qmodel');
const User = require('../../models/User');
const { qmodel_exists } = require('./Qmodel');
const mongoose = require('mongoose');
const { set_avg_rating } = require('../../util/Rating');
const Unit = require('../../models/Unit');

async function post_qresult(req, res) {
  const { qmodel_id, user_id, review_of_id, review_of_name, survey_result } = req.body;
  if (qmodel_id && user_id && review_of_id && survey_result && review_of_name) {
    Qresult.findOne({ user_id: user_id, review_of_id: review_of_id }, function (err, qresult) {
      if (err) {
        res.status(500).json({ message: "server error. " + err });
      }
      else if (qresult) {
        res.status(409).json({ message: "user has already reviewed entity" });
      }
      else {
        Qmodel.findById(qmodel_id, function (err, qmodel) {
          if (err) {
            res.status(500).json({ message: "server error. " + err });
          }
          else if (qmodel) {
            User.findById(user_id, function (err, user) {
              if (err) {
                res.status(500).json({ message: "server error. " + err });
              }
              else if (user) {
                if (user.verified) {
                  const new_qresult = new Qresult({ qmodel_id, user_id, review_of_id, review_of_name, survey_result });
                  new_qresult.save().then(function () {
                    set_avg_rating(review_of_id, qmodel.type).catch(err => {
                      console.log(err);
                    });
                    if (qmodel.type === "unit_t") {
                      set_avg_maintenance_rating(review_of_id).catch(err => {
                        console.log(err);
                      });
                    }
                    res.status(201).json({ message: "new qresult saved." });
                  }).catch(function (err) {
                    res.status(500).json({ message: "failed to save new qresult" + err });
                  });
                }
                else {
                  res.status(401).json({ message: "user found but is not verified" });
                }
              }
              else {
                res.status(409).json({ message: "no matching user found. " });
              }
            });

          }
          else {
            res.status(404).json({ message: "no matching qmodel found. " });
          }
        });
      }
    });

  }
  else {
    res.status(400).json({ message: "invalid post qresult. missing required parameters" });
  }
}
async function get_qresult(req, res) {
  const { id, user_id, qmodel_id, review_of_id } = req.query;
  if (id) {
    get_qresult_by_id(id).then(function (query_res) {
      res.status(query_res.status).json({ qresult: query_res.qresult });
    }).catch(function (err) {
      res.status(err.status).json({ message: err.message });
    });
  }
  else if (user_id) {
    get_qresult_by_user(user_id).then(function (query_res) {
      res.status(query_res.status).json({ qresult: query_res.qresult });
    }).catch(function (err) {
      res.status(err.status).json({ message: err.message });
    });
  }
  else if (qmodel_id) {
    get_qresult_by_qmodel(qmodel_id).then(function (query_res) {
      res.status(query_res.status).json({ qresult: query_res.qresult });
    }).catch(function (err) {
      res.status(err.status).json({ message: err.message });
    });
  }
  else if (review_of_id) {
    get_qresult_by_review_of(review_of_id).then(function (query_res) {
      res.status(query_res.status).json({ qresult: query_res.qresult });
    }).catch(function (err) {
      res.status(err.status).json({ message: err.message });
    });
  }
  else {
    res.status(400).json({ message: "invalid get qresult. missing required parameters" });
  }
}
async function get_qresult_by_id(id) {
  return new Promise((resolve, reject) => {
    Qresult.findById(id, function (err, qresult) {
      if (err) {
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
          status: 404,
          message: "not matching qresult was found"
        };
        reject(res);
      }
    });
  });
}
async function get_qresult_by_user(user) {
  return new Promise((resolve, reject) => {
    Qresult.find({ user_id: user }, function (err, qresult) {
      if (err) {
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
          status: 404,
          message: "not matching qresult was found"
        };
        reject(res);
      }
    });
  });
}
async function get_qresult_by_qmodel(qmodel) {
  return new Promise((resolve, reject) => {
    Qresult.find({ qmodel_id: qmodel }, function (err, qresult) {
      if (err) {
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
          status: 404,
          message: "not matching qresult was found"
        };
        reject(res);
      }
    });
  });
}
async function get_qresult_by_review_of(review_of) {
  return new Promise((resolve, reject) => {
    Qresult.find({ review_of_id: review_of }, function (err, qresult) {
      if (err) {
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
          status: 404,
          message: "not matching qresult was found"
        };
        reject(res);
      }
    });
  });
}
async function set_avg_maintenance_rating(unit_id) {
  return new Promise((resolve, reject) => {
    get_qresult_by_review_of(unit_id).then((qresults) => {
      //console.log(qresults);
      let totalrating = 0;
      qresults.qresult.forEach(qresult => {
        let rating = qresult.survey_result.question7;
        totalrating += rating;
      });
      let avg_rating = totalrating / qresults.qresult.length;
      //console.log(avg_rating);
      Unit.findByIdAndUpdate(unit_id, { maintenance_rating: avg_rating }, function (err, unit) {
        if (err) {
          reject('failed to set avg rating. ' + err);
        }
        else {
          resolve('avg rating set');
        }
      })
    });
  });

}
module.exports = { get_qresult, post_qresult, set_avg_maintenance_rating };