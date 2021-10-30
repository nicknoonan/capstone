const express = require('express');
const mongoose = require('mongoose');
const { report } = require('process');
const Agency = require('../../models/Agency');

/*
 *  get_agency: handles get requests for /agency  
 */
async function get_agency(req, res) {
  //grab agency name from request body
  const { name, id, field, regex } = req.query;

  if (!(name || id || (field && regex))) {
    let message = 'invalid get agency request';
    //console.log(message);
    //console.log(req.query);
    return res.status(400).json({ message: message });
  }

  //request contained a name field
  //return all agencies
  if (name == 'all') {
    get_all_agencies().then((response) => {
      return res.status(response.status).json({ agency: response.agency });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  }
  //query db for agency matching name
  else if (name) {
    get_agency_by_name(name).then((response) => {
      return res.status(response.status).json({ agency: response.agency });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  }

  //request contained an id field
  //query db for agency matching id
  else if (id) {
    get_agency_by_id(id).then((response) => {
      return res.status(response.status).json({ agency: response.agency });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  }
  else if (field && regex) {
    search_agencies(field, regex).then((agencies) => {
      res.status(200).json({agencies});
    }).catch((err) => {
      res.status(err).json({});
    });
  }
}

/*
 * get_all_agency returns a promise
 */
async function get_all_agencies() {
  return new Promise((resolve, reject) => {
    //pass find {} so that all docs match criteria
    Agency.find({}, async (err, agency) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (agency) { //query returned document(s)
        let response = {
          status: 200,
          agency
        };
        resolve(response);
      }
      else { //query didnt find any documents
        let response = {
          status: 400,
          message: 'no agencies found'
        }
        reject(response);
      }
    }).select("-date_created"); //filter out the date_created field
  });
}
/*
 *  get_agency_by_id:
 */
async function get_agency_by_id(id) {
  return new Promise((resolve, reject) => {
    //convert the id param to a mongoose object id
    var objid;
    try {
      objid = new mongoose.Types.ObjectId(id);
    }
    catch (err) { //failed to convert to obj id
      console.log(err);
      let response = {
        status: 400,
        message: 'invalid id'
      }
      reject(response);
    }
    //query the db
    Agency.findById(objid, (err, agency) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (agency) { //found a matching document
        let response = {
          status: 200,
          agency
        };
        resolve(response);
      }
      else { //did not find a matching document
        let response = {
          status: 400,
          message: 'no agency found'
        };
        reject(response);
      }
    }).select("-date_created"); //filter out date_created field
  });
}
/*
 *  get_agency_by_name:
 */
async function get_agency_by_name(name) {
  return new Promise((resolve, reject) => {
    //query db for agency document matching name
    Agency.findOne({ name }, (err, agency) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (agency) { //matching agency document found
        let response = {
          status: 200,
          agency
        };
        resolve(response);
      }
      else { //no matching agency document found
        let response = {
          status: 400,
          message: 'no agency found'
        };
        reject(response);
      }
    }).select("-date_created"); //filter out date_created field
  });
}
/*
 * post_agency: handles post requests for /agency
 */
post_agency = async (req, res) => {
  //grab name and address from the request body
  let { name, address, website, email, url, phone_office, phone_cell, fax, date_est, rating } = req.body;
  //make sure the request body contained name and address fields
  if (name && address) {
    //query the db for an agency document matching the name field
    Agency.findOne({ name: name }, async (err, agency) => {
      if (err) { //server error occured during query
        console.log(err);
        let message = 'server error occured. unable to post agency: ' + name;
        res.status(500).json({ message: message });
      }
      else if (agency) { //cannot create duplicate agencies
        let message = 'agency already exists: ' + name;
        res.status(409).json({ message: message });
      }
      else { //agency does not exist
        //create new agency
        const new_agency = new Agency({ name, address, website, email, url, phone_office, phone_cell, fax, date_est, rating });
        //console.log('saving agency...');
        //save the agency
        try {
          await new_agency.save();
          res.status(201).json({ id: new_agency._id });
          //console.log('saved agency to db');
        }
        catch (error) { //server error occured trying to save the agency
          res.status(500).json({ message: error.message });
          //console.log('failed to save agency to db');
        }
      }
    });
  }
  //name and address fields dont exist in request body
  else {
    res.status(400).json({ message: 'invalid agency request' });
  }
}

/*
 * delete_agency: handles delete requests for /agency
 */
async function delete_agency(req, res) {
  const { id } = req.params;
  if (id) {
    delete_agency_by_id(id).then((response) => {
      res.status(response.status).json({ message: response.message });
    }).catch((response) => {
      res.status(response.status).json({ message: response.message });
    });
  }
  else {
    res.status(404)
  }
}

/*
 *  delete_agency_by_id: handles delete requests for /agency/id:<id>
 */
async function delete_agency_by_id(id) {
  return new Promise((resolve, reject) => {
    let review_id;
    let id_slice = id.slice(1);
    try {
      review_id = new mongoose.Types.ObjectId(id_slice);
    }
    catch {
      return reject({
        status: 400,
        message: 'invalid id'
      });
    }
    Agency.findByIdAndDelete(id_slice, (err, agency) => {
      if (err) {
        reject({
          status: 500,
          message: 'server error occured. unable to delete agency'
        });
      }
      else if (agency) {
        resolve({
          status: 200,
          message: 'agency deleted'
        });
      }
      else {
        reject({
          status: 400,
          message: 'agency not found. no agency was deleted'
        })
      }
    });
  });
}
async function search_agencies(field, $regex) {
  return new Promise((resolve, reject) => {
    if (field && $regex) {
      if (field === "name") {
        Agency.find({ name: { $regex, $options: 'i' } }, (err, agencies) => {
          if (err) {
            reject(500);
          }
          else if (agencies) {
            resolve(agencies);
          }
          else {
            reject(404);
          }
        });
      }
      else if (field === "address") {
        Agency.find({ address: { $regex, $options: 'i' } }, (err, agencies) => {
          if (err) {
            reject(500);
          }
          else if (agencies) {
            resolve(agencies);
          }
          else {
            reject(404);
          }
        });
      }
      else if (field === "website") {
        Agency.find({ website: { $regex, $options: 'i' } }, (err, agencies) => {
          if (err) {
            reject(500);
          }
          else if (agencies) {
            resolve(agencies);
          }
          else {
            reject(404);
          }
        });
      }
      else {
        reject(400);
      }
    }
    else {
      reject(400);
    }
  });

}

module.exports = { get_agency, post_agency, delete_agency };
