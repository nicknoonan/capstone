const Property = require('../../models/Property');
const Agency = require('../../models/Agency');

/*
 *  get_property: handles get requests for /property  
 */
get_property = async (req, res) => {
  //grab property name from the request body
  let { name } = req.body;
  //check that the request contained a name field
  if (name)  {
    //query the db for a property document matching the name field
    Property.findOne({ name: name }, (err, property) => {
      if (err) { //server error occured during query
        console.log(err);
        let message = 'server error occured. unable to find property: ' + name;
        res.status(500).json({message: message});
      }
      else if (property) { //query found a property document
        res.status(200).json({
          id: property._id,
          property: {
            name: property.name, 
            agency: property.agency_name, 
            address: property.address
          }
        });
      }
      else { //query did not find a property document
        let message = 'unable to find property: ' + name;
        res.status(400).json({ message: message });
      }
    });
  }
  //request did not contain a name field
  else {
    res.status(400).json({ message: 'invalid get property request.'});
  }
}

/*
 *  post_property: handles post requests for /property  
 */
post_property = async (req, res) => {
  //grab property name, agency name, and address from the request body
  let { property_name, agency_name, address} = req.body;
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
            const new_property = new Property({ name, agency_name, address});
            //save the property
            try {
              await new_property.save();
              res.status(201).json({
                id: new_property._id,
                property: {name: property_name, agency_name: agency_name, address: address}
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
    delete_property_by_id(id, res);
  }
  else {
    res.status(404);
  }
}
/*
 *  delete_property_by_id: handles delete requests for /property/id:<id>
 */
delete_property_by_id = async (id, res) => {
  let message = 'invalid property id: ' + id;
  let id_slice = id.slice(1);
  Property.findById(id_slice, (err, agency) => {
    if (err) {
      console.log(err);
      message = 'server error occured. unable to delete property';
      res.status(500).json({message: message});
    }
    else if (agency) {
      Property.findByIdAndDelete(id_slice, (err, _) => {
        if (err) {
          console.log(err);
          message = 'server error occured. unable to delete property';
          res.status(500).json({message: message});
        }
        else {
          message = 'property deleted';
          res.status(200).json({message: message});
        }
      });
    }
    else {
      res.status(404).json(message);
    }
  });
}

module.exports = { get_property, post_property, delete_property };
