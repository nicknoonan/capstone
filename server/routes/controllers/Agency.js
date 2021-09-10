const express = require('express');
const Agency = require('../../models/Agency');
const router = express.Router();

get_agency = async (req, res) => {
  let { name } = req.body;
  if (name) {
    Agency.findOne({ name: name }, (err, agency) => {
      if (err) {
        console.log(err);
        let message = 'server error occured. unable to find agency: ' + name;
        res.status(400).json({message: message});
      }
      else if (agency) {
        res.status(200).json({name: agency.name, address: agency.address});
      }
      else {
        let message = 'unable to find agency: ' + name;
        res.status(400).json({ message: message });
      }
    });
  }
  else {
    let message = 'invalid get agency request';
    res.status(400).json({ message: message });
  }
}

post_agency = async (req, res) => {
  let { name, address } = req.body;
  if (name && address) {
    const new_agency = new Agency({ name, address });
    console.log('saving agency...');
    try {
      await new_agency.save();
      res.status(201).json({name: name, address: address});
      console.log('saved agency to db');
    }
    catch (error) {
      res.status(409).json({ message: error.message });
      console.log('failed to save agency to db');
    }
  }
  else {
    res.status(400).json({ message: 'invalid agency request'});
    console.log('invalid agency post request');
  }
}

module.exports = { get_agency, post_agency };