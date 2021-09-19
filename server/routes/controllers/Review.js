const express = require('express');

const mongoose = require('mongoose');

const Agency = require('../../models/Agency');
const Property = require('../../models/Property');
const Unit = require('../../models/Unit');
const Review = require('../../models/Review');

const router = express.Router();

const REVIEW_AGENCY_T = 'agency_t';
const REVIEW_PROPERTY_T = 'property_t';
const REVIEW_UNIT_T = 'unit_t';

const ObjectId = mongoose.Types.ObjectId;

/*
 *  get_review: handles get requests for /review
 */
get_review = async (req, res) => {
  res.status(501);
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
 *  review_exists: checks to see if the review_of associated 
 *  with the user exists in the DB already
 */
review_exists = async (usr, rev, res) => {
  let exists = false;

  return exists;
}

/*
 *  delete_review: handles delete requests for /review
 */
delete_review = async (req, res) => {
  res.status(501);
}

module.exports = { get_review, post_review, delete_review };