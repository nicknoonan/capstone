const Recover = require('../../models/Recover');
const User = require('../../models/User');
const mongoose = require('mongoose');
const { JWT_SECRET } = require('../../secrets');
const jwt = require('jsonwebtoken');

async function post_create_recover(req, res) {
  let error = false;
  const { email } = req.body;
  jwt.sign({ email: email }, JWT_SECRET, async function(err, token) {
    if (err) {
      console.log(err);
      error = true;
      res.status(400).json({message:"error occured " + err});
    }
    else if (token) {
      try {
        //create new recover doc
        const new_recover = new Recover({ email, token });
        await new_recover.save();
        send_recover_email(email).then((res) => {
          res.status(200).json({message:"recovery email send."});
        }).catch((err) => {
          error = true;
          res.status(400).json({message:"unable to send recovery email."});
        });
      }
      catch (err) {
        error = true;
        console.log(err);
        res.status(409).json({message:"server error occured " + err});
      }
    }
    else {
      error = true;
      res.status(500).json({message:"server error occured " + err});
    }
  });
}

async function post_update_password(req, res) {
  const { token, new_password } = req.body;
  let error = false;
  let email;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("decoded:")
    //console.log(decoded);
    email = decoded.email;
  }
  catch (err) {
    let message = 'Token is invalid ' + err + ' : ' + token;
    error = true;
    res.status(409).json({ message });
  }
  if (new_password && error == false) {
    Recover.findOneAndDelete({ email }, async function(err, recover){
      if (err) {
        error = true;
        res.status(500).json({message: "server error. " + err});
      }
      else if (recover) {
        const salt = await bcrypt.genSalt(10);
        //gen password hash that will be stored in database
        const new_password_hashed = await bcrypt.hash(password, salt);
        await User.findOneAndUpdate({ email: email }, { password: new_password_hashed }, function(err, user) {
          if (err) {
            error = true;
            res.status(500).json({message: "server error. " + err});
          }
          else if (user) {
            res.status(200).json({message: "password updated."});
          }
          else {
            error = true;
            res.status(500).json({message: "server error. " + err});
          }
        });
      }
      else {
        error = true;
        console.log(email);
        res.status(400).json({message: "user not found. "});
      }
    });
  }
}

async function send_recover_email(email) {
  return new Promise((resolve, reject) => {
    if (true){
      resolve();
    }
    else {
      reject();
    }
  });
}

module.exports = { post_create_recover, post_update_password };