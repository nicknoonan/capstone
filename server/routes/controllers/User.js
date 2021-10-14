const bcrypt = require('bcryptjs');
//const { reject, resolve } = require('core-js/fn/promise');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
// User Model
const User = require('../../models/User');

const { JWT_SECRET } = require('../../secrets');

const { new_verify, send_verification_email } = require('./Verify');

/*
 * post_new_user: create a new user given a name, email, and
   password in the request. response will return a jwt token
 */
post_new_user = async (req, res) => {
  //lets make sure nothing funny happens and hangs us eh?
  try {
  //grab the name, email, and password from the body of the request
  const { name, email, password } = req.body;
  //check the the request contain all required fields
  if (!(name && email && password)) {
    let message = 'invaled new user request. must contain all fields';
    return res.status(400).json({ message: message});
  }
  //query db to check to see if a user with that email address already exists
  User.findOne({ email }, async (err, user) => {
    if (err) { //server error occured searching db for user
      let message = 'server error occured. unable to create new user';
      console.log(message + ' ' + err);
      res.status(500).json({message: message});
    }
    else if (user) { //user already exists. cannot have duplicate users
      let message = 'user with that email already exists: ' + email;
      res.status(409).json({message: message});
    }
    else { //user doesn't already exist. create user
      //gen salt used to hash password
      const salt = await bcrypt.genSalt(10);
      if (!salt) { //something went wrong generating the hashbrown salt
        let message = 'server error occured. unable to create new user';
        console.log(message + ' ' + err);
        res.status(500).json({message: message});
      }
      //gen password hash that will be stored in database
      const hash = await bcrypt.hash(password, salt);
      if (!hash) { //something went wrong hashbrowing the salty password
        let message = 'server error occured. unable to create new user';
        console.log(message + ' ' + err);
        res.status(500).json({message: message});
      }
      //create new user model
      const new_user = new User({
        name,
        email,
        password: hash
      });
      //save the new user model to the db
      const saved_user = await new_user.save();

      //add a verification entry to the db
      await new_verify(email).catch((err) => {
        console.log(err);
      });

      //send a verification email to the user
      send_verification_email(email).catch((err) => {
        console.log(err);
      });

      //create a jwt token for the new user
      const token = jwt.sign(
        { id: saved_user._id },
        JWT_SECRET,
        { expiresIn: 3600 }
      );
      //create response object comprised of token and new user info
      const res_body = {
        token,
        user: {
          id: saved_user._id,
          name: saved_user.name,
          email: saved_user.email
        }
      };
      //send response
      res.status(200).json(res_body);
    }
  });
  }
  //catch them errors
  catch (error) {
    let message = 'server error occured. unable to create new user';
    console.log(message + ' ' + error);
    res.status(500).json({message: message});
  }
}

/*
 * post_login: given a request containing an email and a password this function will
 * first check that an account with the provided email actually exists. next hash the
 * password and compare to that of the hash stored in the db. if the compare is successful
 * return a token and user object in the response
 */
post_login = async (req, res) => {
  //grab email and password fields from request body
  const { email, password } = req.body;
  //check that fields are defined
  if (!(email && password)) {
    let message = 'invalid login request. must contain all fields';
    res.status(400).json({ message });
  }
  //query the db for a user by the given email
  User.findOne({ email }, async (err, user) => {
    if (err) { //server error occured during db query
      let message = 'server error occured. unable to login user';
      console.log(message + ' ' + err);
      res.status(500).json({message});
    }
    else if (user) { //query found a user by the given email
      const is_auth = await bcrypt.compare(password, user.password);
      if (!is_auth) { //password is incorrect
        let message = 'invalid credentials';
        res.status(409).json({message});
      }
      //password is correct
      //generate a new jwt token
      const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: 3600});
      if (!token) { //check that the token was successfully generated
        let message = 'server error occured. unable to login user';
        console.log(message + ' ' + err);
        res.status(500).json({message});
      }
      //send response with token and user object
      const res_body = {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      };
      res.status(200).json(res_body);
    }
    else { //query did not find a user by the given email
      let message = 'invalid credentials';
      res.status(400).json({message});
    }
  });
}

/*
 * get_user: given a user id this function will query the db to return a user object
 * it is important to note that this function assumes authentication already happened
 * and that the id provided in the request can be trusted.
 */
get_user = async (req, res) => {
  //lets be sure to catch any errors
  try {
    //grab id from req
    let id = req.query.id;
    //check that the request contained an id
    if (id) {
      //query the db to search for a user by the given id
      User.findById(id, (err, user) => {
        if (err) { //server error occured while querying db
          let message = 'server error occured. unable to get user';
          console.log(message + ' ' + err);
          res.status(500).json({message: message});
        }
        else if (user) { //user found
          res.status(200).json(user);
        }
        else { //no user found
          let message = 'unable to find user';
          res.status(400).json({ message: message });
        }
      }).select('-password -register_date'); //filter out the password, register date
    }
    //server error auth function should have returned an id 
    //or have sent 400-500 error rather than send no id onward
    else { 
      let message = 'server error occured. unable to get user';
      console.log('error. auth function forwared null id');
      res.status(500).json({message: message});
    }
  } 
  //catch them errors
  catch (error) {
    let message = 'server error occured. unable to get user';
    console.log(message + ' ' + error);
    res.status(500).json({message: message});
  }
}
/*
 * delete_user: handles delete requests for /user
 */
delete_user = async (req, res) => {
  const { id } = req.params;
  if (id) {
    delete_user_by_id(id, res);
  }
  else {
    res.status(400);
  }
}
/*
 * delete_user: handles delete requests for /user/id:id
 */
delete_user_by_id = async (id, res) => {
  let user_id;
    let id_slice = id.slice(1);
    try {
      user_id = new mongoose.Types.ObjectId(id_slice);
    }
    catch {
      return reject({
        status: 400,
        message: 'invalid id'
      });
    }
  User.findByIdAndDelete(user_id, (err, user) => {
    if (err) {
      reject({
        status: 500,
        message: 'server error'
      });
    }
    else if (user) {
      resolve({
        status: 200,
        message: 'user deleted' 
      });
    }
    else {
      reject({
        status: 400,
        message: 'user not found. no user deleted'
      });
    }
  });
  User.findById(id_slice, (err, agency) => {
    if (err) {
      console.log(err);
      message = 'server error occured. unable to delete user';
      res.status(500).json({message: message});
    }
    else if (agency) {
      User.findByIdAndDelete(id_slice, (err, _) => {
        if (err) {
          console.log(err);
          message = 'server error occured. unable to delete user';
          res.status(500).json({message: message});
        }
        else {
          message = 'user deleted';
          res.status(200).json({message: message});
        }
      });
    }
    else {
      res.status(404).json(message);
    }
  });
}

module.exports = { post_new_user, get_user, delete_user, post_login };
