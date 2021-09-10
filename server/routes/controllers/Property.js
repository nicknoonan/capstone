const express = require('express');
const Property = require('../../models/Property');
const Agency = require('../../models/Agency');
const router = express.Router();

get_property = async (req, res) => {
  let { name } = req.body;
  if (name)  {
    Property.findOne({ name: name }, (err, property) => {
      if (err) {
        console.log(err);
        let message = 'server error occured. unable to find property: ' + name;
        res.status(400).json({message: message});
      }
      else if (property) {
        res.status(200).json({name: property.name, agency: property.agency, address: property.address});
      }
      else {
        let message = 'unable to find property: ' + name;
        res.status(400).json({ message: message });
      }
    });
  }
}

post_property = async (req, res) => {
  let { name, agency_name, address} = req.body;
  if (name && agency_name && address) {
    Agency.findOne({ name: agency_name }, async (err, agency) => {
      if (err) {
        let message = 'server error occured. unable to post property: ' + name;
        console.log(message + ' ' + err);
        res.status(400).json({message: message});
      }
      else if (agency) {
        console.log('here');
        let agencyID = agency._id;
        console.log('here too');
        const new_property = new Property({ name, agency_name, agencyID, address});
        //console.log('saving property...');
        try {
          await new_property.save();
          res.status(201).json({name: name, agency_name: agency_name, address: address});
          //console.log('saved property to db');
        }
        catch (error) {
          res.status(409).json({ message: error.message });
          //console.log('failed to save property to db');
        }
      }
      else {
        let message = 'unable to find agency: ' + agency_name;
        res.status(400).json({ message: message });
      }
    });
  }
  else {
    res.status(400).json({ message: 'invalid property request'});
    console.log('invalid property post request');
  }
}

module.exports = { get_property, post_property };