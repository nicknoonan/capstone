const bcrypt = require('bcryptjs');
const Recover = require('../../models/Recover');
const User = require('../../models/User');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { JWT_SECRET, EMAIL, EMAIL_PASSWORD } = require('../../secrets');
const jwt = require('jsonwebtoken');

async function post_create_recover(req, res) {
  let error = false;
  const { email } = req.body;
  User.findOne({email: email}, function(err, user) {
    if (err) {
      console.log(err);
      error = true;
      res.status(400).json({message:"error occured " + err});
    }
    else if (user) {
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
            
            await send_recovery_email(email).then((res) => {
              //console.log(res);
            }).catch((err) => {
              console.log(err);
            });
            res.status(200).json({message:"recovery email send."});
            //send_recover_email(email).then((res) => {
            //  res.status(200).json({message:"recovery email send."});
            //}).catch((err) => {
            //  error = true;
            //  res.status(400).json({message:"unable to send recovery email." + err});
            //});
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
    else {
      error = true;
      console.log("user not found : " + email);
      res.status(400).json({message:""});
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
        const new_password_hashed = await bcrypt.hash(new_password, salt);
        User.findOneAndUpdate({ email: email }, { password: new_password_hashed }, function(err, user) {
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
        //console.log(email);
        res.status(400).json({message: "user not found. "});
      }
    });
  }
}

async function send_recover_email(email) {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

async function send_recovery_email(rec_email) {
  return new Promise(async (resolve, reject) => {
    let token;
    let verification_url;
    Recover.findOne({email: rec_email}, async function(err, verify) {
      if (err) {
        reject("server error");
      }
      else if (verify) {
        //console.log(verify);
        token = verify.token;
        recover_url = 'boonehousinghelp.com/recover?token=' + token;
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
          }
        });
        let info = await transporter.sendMail({
          from: '"Boone Housing Help" <' + EMAIL + '>',
          to: rec_email,
          subject: "Password recovery",
          text: "Please click the following link to recover your password. " + recover_url
        });
        console.log("Email recovery message sent: %s", info.messageId);
        resolve();
      }
      else {
        reject("no recover entry found");
      }
    });
  })
}

module.exports = { post_create_recover, post_update_password };