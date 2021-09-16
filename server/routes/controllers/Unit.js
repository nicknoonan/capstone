const express = require('express');
const Property = require('../../models/Property');
const Agency = require('../../models/Agency');
const Unit = require('../../models/Unit');
const router = express.Router();

/*
 *  get_unit: handles get requests for /unit  
 */
get_unit = async (req, res) => {
  //grab unit name from the request body
  let { unit_name } = req.body
  //check that the request contained a name field
  if (unit_name) {
    //query the db for a unit document matching the name field and property field
    Unit.findOne({ name: unit_name }, (err, unit) => {
      if (err) { //server error occured during the query
        console.log(err);
        let message = 'server error occured. unable to find unit: ' + unit_name;
        res.status(500).json({message: message});
      }
      else if (unit) { //query found a unit document
        res.status(200).json({
          id: unit._id,
          unit: {
            name: unit.name, 
            agency: unit.agency_name, 
            property: unit.property_name, 
            address: unit.address
          }
        });
      }
      else { //query did not find a unit document
        let message = 'unable to find unit: ' + unit_name;
        res.status(400).json({ message: message });
      }
    });
  }
  //request did not contain a name field
  else {
    let message = 'invalid unit get request';
    res.status(400).json({message: message});
  }
}

/*
 *  post_unit: handles post requests for /unit  
 */
post_unit = async (req, res) => {
  //grab unit name, agency name, property name, and address from the request body
  let { unit_name, agency_name, property_name, address } = req.body;
  //check that the body contained all fields
  if (unit_name && agency_name && property_name && address) {
    //query the db for a unit document matching the name field
    Unit.findOne({ property_name: property_name, name: unit_name }, (err, unit) => {
      if (err) { //server error occured during query
        console.log(err);
        let message = 'server error occured. unable to find unit: ' + unit_name;
        res.status(500).json({message: message});
      }
      else if (unit) { //cannot create duplicate units
        let message = 'unit already exists: ' + unit_name;
        res.status(409).json({message: message});
      }
      else { //unit doesn't exist
        //query the db for a property document matching the name field
        Property.findOne({ name: property_name }, async (err, property) => {
          if (err) { //server error occured during query
            let message = 'server error occured. unable to post unit: ' + unit_name;
            console.log(message + ' ' + err);
            res.status(500).json({message: message});
          }
          else if (property) { //request contained a valid property
            //query the db for an agency document match the agency name field
            Agency.findOne({ name: agency_name }, async (err, agency) => {
              if (err) { //server error occured during query
                let message = 'server error occured. unable to post unit: ' + unit_name;
                console.log(message + ' ' + err);
                res.status(500).json({message: message});
              }
              else if (agency) { //request contained a valid agency
                //create the new unit
                let name = unit_name
                const new_unit = new Unit({ name, agency_name, property_name, address });
                //save the unit
                try {
                  await new_unit.save();
                  res.status(201).json({
                    id: new_unit._id,
                    unit: {unit_name: unit_name, agency_name: agency_name, property_name: property_name, address: address}
                  });
                }
                catch (error) { //server error occured trying to save the unit
                  res.status(500).json({ message: 'failed to save unit' });
                  console.log('failed to save unit' + error);
                }
              }
              else { //query did not find a mtching agency document
                let message = 'unable to find agency: ' + agency_name;
                res.status(409).json({ message: message });
              }
            });
          }
          else { //query did not find a matching property document
            let message = 'unable to find property: ' + property_name;
            res.status(409).json({ message: message });
          }
        });
      }
    });
  }
  //request did not contain valid fields
  else { 
    let message = 'invalid unit post request';
    res.status(400).json({message: message});
  }
}
/*
 *  delete_unit: handles delete requests for /unit  
 */
delete_unit = async (req, res) => {
  const { id } = req.params;
  if (id) {
    delete_unit_by_id(id, res);
  }
  else {
    res.status(404);
  }
}
delete_unit_by_id = async (id, res) => {
  let message = 'invalid unit id: ' + id;
  let id_slice = id.slice(1);
  Unit.findById(id_slice, (err, agency) => {
    if (err) {
      console.log(err);
      message = 'server error occured. unable to delete unit';
      res.status(500).json({message: message});
    }
    else if (agency) {
      Unit.findByIdAndDelete(id_slice, (err, _) => {
        if (err) {
          console.log(err);
          message = 'server error occured. unable to delete unit';
          res.status(500).json({message: message});
        }
        else {
          message = 'unit deleted';
          res.status(200).json({message: message});
        }
      });
    }
    else {
      res.status(404).json(message);
    }
  });
}

module.exports = { get_unit, post_unit, delete_unit };