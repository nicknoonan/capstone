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
        res.status(500).json({message: message});
      }
      else if (property) {
        res.status(200).json({name: property.name, agency: property.agency_name, address: property.address});
      }
      else {
        let message = 'unable to find property: ' + name;
        res.status(400).json({ message: message });
      }
    });
  }
}

post_property = async (req, res) => {
  let { property_name, agency_name, address} = req.body;
  //let status = 400;
  //let json = {};
  if (property_name && agency_name && address) {
    Property.findOne({ name: property_name }, (err, property) => {
      if (err) {
        let message = 'server error occured. unable to post property: ' + property_name;
        console.log(message + ' ' + err);
        res.status(500).json({message: message});
      }
      else if (property) {
        let message = 'property already exists: ' + property_name;
        res.status(409).json({message: message});
      }
      else {
        Agency.findOne({ name: agency_name }, async (err, agency) => {
          if (err) {
            let message = 'server error occured. unable to post property: ' + property_name;
            console.log(message + ' ' + err);
            res.status(500).json({message: message});
          }
          else if (agency) {
            let name = property_name;
            const new_property = new Property({ name, agency_name, address});
            //console.log('saving property...');
            try {
              await new_property.save();
              res.status(201).json({name: property_name, agency_name: agency_name, address: address});
              //console.log('saved property to db');
            }
            catch (error) {
              res.status(500).json({ message: error.message });
              //console.log('failed to save property to db');
            }
          }
          else {
            let message = 'unable to find agency: ' + agency_name;
            res.status(409).json({ message: message });
          }
        });
      }
    });
  }
  else {
    res.status(400).json({ message: 'invalid property request'});
    console.log('invalid property post request');
  }
}

module.exports = { get_property, post_property };