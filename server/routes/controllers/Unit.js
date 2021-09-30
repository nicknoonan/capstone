const Property = require('../../models/Property');
const Agency = require('../../models/Agency');
const Unit = require('../../models/Unit');
const mongoose = require('mongoose');

/*
 *  get_unit: handles get requests for /unit  
 */
get_unit = async (req, res) => {
  //grab property name from request body
  let { name, id } = req.query;

  if (!(name || id)) {
    let message = 'invalid get unit request';
    return res.status(400).json({ message: message });
  }

  //unit request contained a name field
  //return all units
  if (name == 'all') {
    get_all_units().then((response) => {
      return res.status(response.status).json({ unit: response.unit });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  } 
  //return units matching name
  else if (name) {
    get_unit_by_name(name).then((response) => {
      return res.status(response.status).json({ unit: response.unit });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  }

  //unit request contained an id field
  //return units matching id
  if (id) {
    get_unit_by_id(id).then((response) => {
      return res.status(response.status).json({ unit: response.unit });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  }
}
/*
 *  get_unit_by_name:
 */
async function get_unit_by_name(name) {
  return new Promise((resolve, reject) => {
    //query the db for a unit document matching name
    Unit.findOne({name}, (err, unit) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (unit) { //matching unit doc was found
        let response = {
          status: 200,
          unit
        };
        resolve(response);
      }
      else { //no matching unit doc was found
        let response = {
          status: 400,
          message: 'unit not found'
        };
        reject(response);
      }
    }).select('-date_created'); //filter out the date_created field
  });
}

/*
 *  get_unit_by_id:
 */
async function get_unit_by_id(id) {
  return new Promise((resolve, reject) => {
    //convert id to a mongoose object id
    var objid;
    try {
      objid = new mongoose.Types.ObjectId(id);
    }
    catch (err) {
      //console.log(err);
      let response = {
        status: 400,
        message: 'invalid id'
      }
      reject(response);
    }
    //query the db for a unit doc matching id
    Unit.findById(objid, (err, unit) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (unit) { //matching unit doc was found
        let response = {
          status: 200,
          unit
        };
        resolve(response);
      }
      else { //no matching unit doc was found
        let response = {
          status: 400,
          message: 'no unit found'
        };
        reject(response);
      }
    }).select("-date_created"); //filter out the date_created field
  });
}

/*
 *  get_all_units:
 */
async function get_all_units() {
  return new Promise((resolve, reject) => {
    //query the db for all units by passing {}
    //all unit docs will match to {}
    Unit.find({}, async (err, unit) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (unit) { //matching unit docs were found
        let response = {
          status: 200,
          unit
        };
        resolve(response);
      }
      else { //no unit docs were found
        let response = {
          status: 400,
          message: 'no unit found'
        }
        reject(response);
      }
    }).select("-date_created"); //filter out date_created field
  });
}

/*
 *  post_unit: handles post requests for /unit  
 */
post_unit = async (req, res) => {
  //grab unit name, agency name, property name, and address from the request body
  let { unit_name, agency_name, property_name, address, num_bed, num_bath, rating } = req.body;
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
                const new_unit = new Unit({
                  name: unit_name, 
                  agency_name: agency_name, 
                  property_name: property_name, 
                  address: address,
                  num_bed: num_bed, 
                  num_bath: num_bath, 
                  rating: rating 
                });
                //save the unit
                try {
                  await new_unit.save();
                  res.status(201).json({
                    id: new_unit._id
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
    delete_unit_by_id(id).then((response) => {
      res.status(response.status).json({message: response.message});
    }).catch((response) => {
      res.status(response.status).json({message: response.message});
    });
  }
  else {
    res.status(404);
  }
}
delete_unit_by_id = async (id) => {
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
    Unit.findByIdAndDelete(review_id, (err, unit) => {
      if (err) {
        reject({
          status: 500,
          message: 'server error occured.'
        });
      }
      else if (unit) {
        resolve({
          status: 200,
          message: 'unit deleted'
        });
      }
      else {
        reject({
          status: 400,
          message: 'unit not found. no unit deleted'
        });
      }
    });
  });
}

module.exports = { get_unit, post_unit, delete_unit };
