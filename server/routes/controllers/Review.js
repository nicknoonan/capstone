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
post_review = async (req, res) => {
  //check that the request format is valid
  const { review_type, review_of, review_body, review_user } = req.body;

  if (!(review_type && review_of && review_body && review_user)) {
    let message = 'invalid post review request';
    res.status(400).json({ message: message });
    return;
  }

  //console.log(review_of);

  let review_of_exists = false;
  //check that the agency/property/unit being reviewed exists
  //handle agency review type
  if (review_type == REVIEW_AGENCY_T) {
    //query the db for the agency being reviewed
    const review_of_id = new mongoose.Types.ObjectId(review_of);
    //console.log(review_of_id);
    Agency.findById(review_of_id, (err, agency) => {
      if (err) { //server error occured during query
        //console.log(err);
        let message = 'server error occured. unable to post review';
        res.status(500).json({message: message});
        return;
      }
      //agency was found
      else if (agency) {
        //console.log("agency found");
        review_of_exists = true;
      }
      //agency was not found
      else {
        //console.log(review_of_exists); 
        let message = 'agency does not exist'
        res.status(400).json({ message });
        return;
      }
    });
  }
  //handle property review type
  else if (review_type == REVIEW_PROPERTY_T) {
    //query the db for the property being reviewed
    Property.findById(review_of, (err, property) => {
      if (err) { //server error occured during query
        //console.log(err);
        let message = 'server error occured. unable to post review';
        res.status(500).json({message: message});
        return;
      }
      //query found property
      else if (property) {
        review_of_exists = true;
      }
      //query didnt find a matching property
      else {
        //console.log("property not found");
        review_of_exists = false;
      }
    });
  }
  //handle unit review type
  else if (review_type == REVIEW_UNIT_T) {
    Unit.findById(review_of, (err, unit) => {
      if (err) { //server error occured during query
        console.log(err);
        let message = 'server error occured. unable to post review';
        res.status(500).json({message: message});
        return;
      }
      //query found the unit
      else if (unit) {
        review_of_exists = true;
      }
      //query didnt find a matching unit
      else {
        review_of_exists = false;
        //console.log("unit not found");
      }
    });
  }
  //invalid review type
  else {
    let message = 'invalid post review request. invalid review_type field.';
    res.status(400).json({ message });
    return;
  }
  
  //check that user hasnt already reviewed this objectid already
  //query the db for a review matching userid and 'review of' id
  
  Review.findOne({ user: review_user, review_of: review_of }, async (err, review) => {
    if (err) { //server error occured during query
      console.log(err);
      let message = 'server error occured. unable to find agency: ' + name;
      res.status(500).json({message: message});
      return;
    }
    else if (review) { //review already exists, cannot create duplicate review
      let message = 'review already exists. cannot create duplicate review';
      res.status(409).json({ message: message });
      return;
    }
    else { //review does not exist, proceed to create review
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

/*
 *  delete_review: handles delete requests for /review
 */
delete_review = async (req, res) => {
  res.status(501);
}

module.exports = { get_review, post_review, delete_review };