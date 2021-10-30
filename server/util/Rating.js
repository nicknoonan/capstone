const Agency = require('../models/Agency');
const Property = require('../models/Property');
const Unit = require('../models/Unit');
const Qresult = require('../models/Qresult');
const UNIT_T = "unit_t";
const PROPERTY_T = "property_t";
const AGENCY_T = "agency_t";
async function set_avg_rating(id, type) {
  return new Promise((resolve, reject) => {
    Qresult.find({review_of_id: id}, async function(err, results) {
      if (err) {
        console.log(err);
        reject("failed to set avg agency rating.\n" + err);
      }
      else if (results) {
        let score = 0;
        let count = 0;
        results.forEach(result => {
          score += result.survey_result.overallScore;
          count += 1;
        });
        let avg_score = score / count;
        if (type === UNIT_T) {
          set_avg_unit_rating(id, avg_score).then((res) => {
            resolve(res);
          }).catch((err) => {
            console.log(err);
            reject(err);
          });
        }
        else if (type === PROPERTY_T) {
          set_avg_property_rating(id, avg_score).then((res) => {
            resolve(res);
          }).catch((err) => {
            console.log(err);
            reject(err);
          });
        }
        else if (type === AGENCY_T) {
          set_avg_agency_rating(id, avg_score).then((res) => {
            resolve(res);
          }).catch((err) => {
            console.log(err);
            reject(err);
          });
        }
      }
      else {
        console.log(err);
        reject("failed to set avg agency rating.\n" + err);
      }
    });
  });
}

async function set_avg_agency_rating(id, new_rating) {
  return new Promise((resolve, reject) => {
    Agency.findByIdAndUpdate(id, {rating: new_rating}, function(err, agency) {
      if (err) {
        let err = "failed to find agency" + err;
        reject(err);
      }
      else if (agency) {
        resolve(agency);
      }
      else {
        let err = "failed to find agency" + err;
        reject(err);
      }
    });
  });
}

async function set_avg_property_rating(id, new_rating) {
  return new Promise((resolve, reject) => {
    Property.findByIdAndUpdate(id, {rating: new_rating}, function(err, property) {
      if (err) {
        let err = "failed to find property" + err;
        reject(err);
      }
      else if (property) {
        resolve(property);
      }
      else {
        let err = "failed to find property" + err;
        reject(err);
      }
    });
  });
}

async function set_avg_unit_rating(id, new_rating) {
  return new Promise((resolve, reject) => {
    Unit.findByIdAndUpdate(id, {rating: new_rating}, function(err, unit) {
      if (err) {
        let err = "failed to find unit" + err;
        reject(err);
      }
      else if (unit) {
        resolve(unit);
      }
      else {
        let err = "failed to find unit";
        reject(err);
      }
    });
  });
}

module.exports = { set_avg_rating };