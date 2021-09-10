const express = require('express');
const Property = require('../../models/Property');
const Agency = require('../../models/Agency');
const Unit = require('../../models/Unit');
const router = express.Router();

get_unit = async (req, res) => {
  let { unit_name } = req.body
  if (unit_name) {
    Unit.findOne({ name: unit_name }, (err, unit) => {
      if (err) {
        console.log(err);
        let message = 'server error occured. unable to find unit: ' + unit_name;
        res.status(500).json({message: message});
      }
      else if (unit) {
        res.status(200).json({
          name: unit.name, 
          agency: unit.agency_name, 
          property: unit.property_name, 
          address: unit.address
        });
      }
      else {
        let message = 'unable to find unit: ' + unit_name;
        res.status(400).json({ message: message });
      }
    });
  }
  else {
    let message = 'invalid unit get request';
    res.status(400).json({message: message});
  }
}

post_unit = async (req, res) => {
  let { unit_name, agency_name, property_name, address } = req.body;
  if (unit_name && agency_name && property_name && address) {
    //
    Unit.findOne({ name: unit_name }, (err, unit) => {
      if (err) {
        console.log(err);
        let message = 'server error occured. unable to find unit: ' + unit_name;
        res.status(500).json({message: message});
      }
      else if (unit) {
        let message = 'unit already exists: ' + unit_name;
        res.status(409).json({message: message});
      }
      else {
        Property.findOne({ name: property_name }, async (err, property) => {
          if (err) {
            let message = 'server error occured. unable to post unit: ' + unit_name;
            console.log(message + ' ' + err);
            res.status(500).json({message: message});
          }
          else if (property) {
            Agency.findOne({ name: agency_name }, async (err, agency) => {
              if (err) {
                let message = 'server error occured. unable to post unit: ' + unit_name;
                console.log(message + ' ' + err);
                res.status(500).json({message: message});
              }
              else if (agency) {
                let name = unit_name
                const new_unit = new Unit({ name, agency_name, property_name, address });
                try {
                  await new_unit.save();
                  res.status(201).json({unit_name: unit_name, agency_name: agency_name, property_name: property_name, address: address});
                }
                catch (error) {
                  res.status(500).json({ message: 'failed to save unit' });
                  console.log('failed to save unit' + error);
                }
              }
              else {
                let message = 'unable to find agency: ' + agency_name;
                res.status(409).json({ message: message });
              }
            });
          }
          else {
            let message = 'unable to find property: ' + property_name;
            res.status(409).json({ message: message });
          }
        });
      }
    });
  }
  else {
    let message = 'invalid unit post request';
    res.status(400).json({message: message});
  }
}

module.exports = { get_unit, post_unit };