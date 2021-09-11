const express = require('express');
const Agency = require('../../models/Agency');
const router = express.Router();

/*
 *  get_agency: handles get requests for /agency  
 */
get_agency = async (req, res) => {
  //grab agency name from request body
  let { name } = req.body;
  //request contained a name field
  if (name) { 
    //query the db for an agency document matching the name field
    Agency.findOne({ name: name }, (err, agency) => {
      if (err) { //server error occured during query
        console.log(err);
        let message = 'server error occured. unable to find agency: ' + name;
        res.status(500).json({message: message});
      }
      else if (agency) { //query found an agency document
        res.status(200).json({name: agency.name, address: agency.address});
      }
      else { //query did not find an agency document
        let message = 'unable to find agency: ' + name;
        res.status(409).json({ message: message });
      }
    });
  }
  //request did not contain a name field
  else {
    let message = 'invalid get agency request';
    res.status(400).json({ message: message });
  }
}
/*
 * post_agency: handles post requests for /agency
 */
post_agency = async (req, res) => {
  //grab name and address from the request body
  let { name, address } = req.body;
  //make sure the request body contained name and address fields
  if (name && address) {
    //query the db for an agency document matching the name field
    Agency.findOne({ name: name }, async (err, agency) => {
      if (err) { //server error occured during query
        console.log(err);
        let message = 'server error occured. unable to post agency: ' + name;
        res.status(500).json({message: message});
      }
      else if (agency) { //cannot create duplicate agencies
        let message = 'agency already exists: ' + name;
        res.status(409).json({message: message});
      }
      else { //agency does not exist
        //create new agency
        const new_agency = new Agency({ name, address });
        console.log('saving agency...');
        //save the agency
        try {
          await new_agency.save();
          res.status(201).json({name: name, address: address});
          console.log('saved agency to db');
        }
        catch (error) { //server error occured trying to save the agency
          res.status(500).json({ message: error.message });
          console.log('failed to save agency to db');
        }
      }
    });
  }
  //name and address fields dont exist in request body
  else {
    res.status(400).json({ message: 'invalid agency request'});
  }
}

module.exports = { get_agency, post_agency };