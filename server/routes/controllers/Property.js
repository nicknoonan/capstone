const Property = require('../../models/Property');
const Agency = require('../../models/Agency');
const mongoose = require('mongoose');

/*
 *  get_property: handles get requests for /property  
 */
async function get_property(req, res) {
  //grab property name from request body
  let { name, id } = req.query;

  if (!(name || id)) {
    let message = 'invalid get property request';
    return res.status(400).json({ message: message });
  }

  //property contained a name field
  //return all property documents
  if (name == 'all') {
    get_all_properties().then((response) => {
      return res.status(response.status).json({ property: response.property });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  }
  //query db for property document matching name 
  else if (name) {
    get_property_by_name(name).then((response) => {
      return res.status(response.status).json({ property: response.property });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  }

  //property contained an id field
  //query db for property document matching id
  if (id) {
    get_property_by_id(id).then((response) => {
      return res.status(response.status).json({ property: response.property });
    }).catch((response) => {
      return res.status(response.status).json({ message: response.message });
    });
  }
}
/*
 * get_all_propeties returns a promise
 */
async function get_all_properties() {
  return new Promise((resolve, reject) => {
    //query db with {} so all property documents will match
    Property.find({}, async (err, property) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (property) { //property documents were found
        let response = {
          status: 200,
          property
        };
        //console.log(property)
        resolve(response);
      }
      else { //no property documents found
        let response = {
          status: 400,
          message: 'no properties found'
        }
        reject(response);
      }
    }).select("-date_created"); //filter out date_create field
  });
}
/*
 * get_property_by_name:
 */
async function get_property_by_name(name) {
  return new Promise((resolve, reject) => {
    //query the db for properties documents matching name
    Property.findOne({name}, (err, property) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (property) { //found matching property document
        let response = {
          status: 200,
          property
        };
        resolve(response);
      }
      else { //no matching property document found
        let response = {
          status: 400,
          message: 'property not found'
        };
        reject(response);
      }
    }).select('-date_created'); //filter out date_created field
  });
}
/*
 *  get_property_by_id:
 */ 
async function get_property_by_id(id) {
  return new Promise((resolve, reject) => {
    //convert id to a mongoose obj id
    var objid;
    try {
      objid = new mongoose.Types.ObjectId(id);
    }
    catch (err) { //failed to convert, id must have been invalid
      //console.log(err);
      let response = {
        status: 400,
        message: 'invalid id'
      }
      reject(response);
    }
    //query the db for a property document matching id
    Property.findById(objid, (err, property) => {
      if (err) { //server error occured
        let response = {
          status: 500,
          message: 'server error'
        };
        reject(response);
      }
      else if (property) { //matching property document was found
        let response = {
          status: 200,
          property
        };
        resolve(response);
      }
      else { //no matching property document was found
        let response = {
          status: 400,
          message: 'no property found'
        };
        reject(response);
      }
    }).select("-date_created"); //filter out the date_created field
  });
}
/*
 *  post_property: handles post requests for /property  
 */
post_property = async (req, res) => {
  //grab property name, agency name, and address from the request body
  let { property_name, agency_name, address, website, email, url, phone_office, phone_cell, fax} = req.body;
  //check that the request contained all fields
  if (property_name && agency_name && address) {
    //query the db for a property document matching the name field
    Property.findOne({ name: property_name }, (err, property) => {
      if (err) { //server error occured during query
        let message = 'server error occured. unable to post property: ' + property_name;
        console.log(message + ' ' + err);
        res.status(500).json({message: message});
      }
      else if (property) { //cannot create duplicate properties
        let message = 'property already exists: ' + property_name;
        res.status(409).json({message: message});
      }
      else { //property does not exist
        //query the db for a agency document matching the name field
        Agency.findOne({ name: agency_name }, async (err, agency) => {
          if (err) { //server error occured during query
            let message = 'server error occured. unable to post property: ' + property_name;
            console.log(message + ' ' + err);
            res.status(500).json({message: message});
          }
          else if (agency) { //request contained a valid agency
            //create new property
            let name = property_name;
            const new_property = new Property({ name, agency_name, address, website, email, url, phone_office, phone_cell, fax });
            //save the property
            try {
              await new_property.save();
              res.status(201).json({
                id: new_property._id
              });
              //console.log('saved property to db');
            }
            catch (error) { //server error occured trying to save the property
              res.status(500).json({ message: 'server error occured. unable to post property: ' + property_name });
              console.log(error);
            }
          }
          else { //query did not find a matching agency document
            let message = 'unable to find agency: ' + agency_name;
            res.status(409).json({ message: message });
          }
        });
      }
    });
  }
  //request did not contain valid fields
  else {
    res.status(400).json({ message: 'invalid property request'});
    console.log('invalid property post request');
  }
}

/*
 *  delete_property: handles delete requests for /property  
 */
delete_property = async (req, res) => {
  const { id } = req.params;
  if (id) {
    delete_property_by_id(id).then((response) => {
      res.status(response.status).json({message: response.message});
    }).catch((response) => {
      res.status(response.status).json({message: response.message});
    });
  }
  else {
    res.status(404);
  }
}
/*
 *  delete_property_by_id: handles delete requests for /property/id:<id>
 */
async function delete_property_by_id(id) {
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
    Property.findByIdAndDelete(id_slice, (err, property) => {
      if (err) {
        console.log(err);
        reject({
          status: 500,
          message: 'server error occured. unable to delete property'
        });
      }
      else if (property) {
        resolve({
          status: 200,
          message: 'property deleted'
        });
      }
      else {
        reject({
          status: 400,
          message: 'property not found. no property deleted'
        });
      }
    });
  });
}

module.exports = { get_property, post_property, delete_property };
