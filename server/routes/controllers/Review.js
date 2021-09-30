const express = require('express');

const mongoose = require('mongoose');

const Agency = require('../../models/Agency');
const Property = require('../../models/Property');
const Unit = require('../../models/Unit');
const Review = require('../../models/Review');

const REVIEW_AGENCY_T = 'agency_t';
const REVIEW_PROPERTY_T = 'property_t';
const REVIEW_UNIT_T = 'unit_t';

/*
 *  get_review: handles get requests for /review
 */
async function get_review(req, res) {
  const { review_id } = req.body;
  if (review_id) {
    await get_review_by_id(review_id).then((response) => {
      res.status(response.code).json({review: response.review});
      //console.log(response);
    }).catch((response) => {
      //console.log(response);
      res.status(response.code).json({message: response.message});
    });
  } 
  else {
    res.status(501);
  }
}
/*
 *  get_review_by_id: handles get requests for /review
 */
function get_review_by_id(id) {
  return new Promise((resolve, reject) => {
    let review_id;
    try {
      review_id = new mongoose.Types.ObjectId(id);
    }
    catch {
      reject({
        code: 400,
        message: 'invalid id'
      });
    }
    Review.findById(review_id, (err, review) => {
      if (err) {
        reject({
          code: 500,
          message: 'server error occured during query'
        });
      }
      else if (review) {
        resolve({
          code: 200,
          review: review
        });
      }
      else {
        reject({
          code: 400,
          message: 'review not found'
        });
      }
    }).select('-__v');
  });
}
/*
 *  post_review: handles post requests for /review
 */
async function post_review(req, res) {
  //check that the request format is valid
  const { review_type, review_of, review_body, review_user } = req.body;
  if (!(review_type && review_of && review_body && review_user)) {
    let message = 'invalid post review request';
    res.status(400).json({ message: message });
    return;
  }
  //check that the agency/property/unit being reviewed exists
  let review_of_exists = false;
  //handle agency review type
  if (review_type == REVIEW_AGENCY_T) {
    await agency_exists(review_of, res).then((agency) => {
      review_of_exists = true;
    })
    .catch((message) => {
      review_of_exists = false;
      res.status(400).json({message});
    });
    //console.log('agency_t ');
    //console.log(review_of_exists);
  }
  //handle property review type
  else if (review_type == REVIEW_PROPERTY_T) {
    await property_exists(review_of, res).then((property) => {
      review_of_exists = true;
    })
    .catch((message) => {
      review_of_exists = false;
      res.status(400).json({message});
    });
  }
  //handle unit review type
  else if (review_type == REVIEW_UNIT_T) {
    await unit_exists(review_of, res).then((unit) => {
      review_of_exists = true;
    })
    .catch((message) => {
      review_of_exists = false;
      res.status(400).json({message});
    });
  }
  //invalid review type
  else {
    let message = 'invalid post review request. invalid review_type field.';
    res.status(400).json({ message });
    return;
  }
  //check that review_of exists
  if (review_of_exists) {
    //check that user hasnt already reviewed this objectid already
    //query the db for a review matching userid and 'review of' id
    const review_of_id = new mongoose.Types.ObjectId(review_of);
    const user_id = new mongoose.Types.ObjectId(review_user);
    Review.findOne({ user: user_id, review_of: review_of_id }, async (err, review) => {
      if (err) { //server error occured during query
        console.log(err);
        let message = 'server error occured';
        res.status(500).json({message: message});
        return;
      }
      else if (review) { //review already exists, cannot create duplicate review
        let message = 'review already exists. cannot create duplicate review';
        res.status(409).json({ message: message });
        return;
      }
      else {
        //create new review
        const new_review = new Review({
          review_type, 
          review_of, 
          review_body, 
          user: review_user
        });
        //try to save the new review
        try {
          await new_review.save();
          res.status(201).json({ new_review });
          return;
        }
        catch (error) { //server error occured trying to save the review
          let message = 'unable to save new review';
          res.status(500).json({ message: message });
          return;
        }
      }
    });
  }
}

/*
 *  agency_exists: checks to see if review_of exists in the DB
 *  res: function will handle 400/500 response if error occurs
 */
function agency_exists(id) {
  return new Promise((resolve, reject) => {
    //query the db for the agency being reviewed
    const obj_id = new mongoose.Types.ObjectId(id);
    //console.log(review_of_id);
    Agency.findById(obj_id, (err, agency) => {
      if (err) { //server error occured during query
        console.log(err);
        reject('server error occured. unable to post review');
      }
      //agency was found
      else if (agency) {
        resolve(agency);
      }
      //agency was not found
      else {
        reject('agency does not exist');
      }
    });
  });
}
/*
 *  property_exists: checks to see if review_of exists in the DB
 *  res: function will handle 400/500 response if error occurs
 */
function property_exists(id) {
  return new Promise((resolve, reject) => {
    //query the db for the property
    const obj_id = new mongoose.Types.ObjectId(id);
    //console.log(review_of_id);
    Property.findById(obj_id, (err, property) => {
      if (err) { //server error occured during query
        console.log(err);
        reject('server error occured. unable to post review');
      }
      //property was found
      else if (property) {
        resolve(property);
      }
      //property was not found
      else {
        reject('property does not exist');
      }
    });
  });
}

/*
 *  unit_exists: checks to see if review_of exists in the DB
 *  res: function will handle 400/500 response if error occurs
 */
function unit_exists(id) {
  return new Promise((resolve, reject) => {
    //query the db for the unit
    const obj_id = new mongoose.Types.ObjectId(id);
    //console.log(review_of_id);
    Unit.findById(obj_id, (err, unit) => {
      if (err) { //server error occured during query
        console.log(err);
        reject('server error occured. unable to post review');
      }
      //unit was found
      else if (unit) {
        resolve(unit);
      }
      //unit was not found
      else {
        reject('unit does not exist');
      }
    });
  });
}

/*
 *  delete_review: handles delete requests for /review
 */
async function delete_review(req, res) {
  let {id} = req.params;
  if (id) {
    delete_review_by_id(id).then((response) => {
      res.status(response.code).json({message: response.message});
    }).catch((response) => {
      res.status(response.code).json({message: response.message});
    });
  }
  else {
    res.status(501);
  }
}

/*
 *  delete_review_by_id: handles delete requests for /review/id:id
 */
function delete_review_by_id(id) {
  return new Promise((resolve, reject) => {
    let review_id;
    let id_slice = id.slice(1);
    try {
      review_id = new mongoose.Types.ObjectId(id_slice);
    }
    catch {
      reject({
        code: 400,
        message: 'invalid id'
      });
    }
    Review.findByIdAndDelete(review_id, (err, review) => {
      if (err) {
        reject({
          code: 500,
          message: 'server error occured while trying to delete review'
        });
      }
      else if (review) {
        resolve({
          code: 200,
          message: 'review deleted'
        });
      }
      else {
        resolve({
          code: 400,
          message: 'review to delete not found'
        });
      }
    });
  });
}

module.exports = { get_review, post_review, delete_review };
