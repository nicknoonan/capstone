const nodemailer = require('nodemailer');
const User = require('../../models/User');
const Verify = require('../../models/Verify');

const jwt = require('jsonwebtoken');
const { JWT_SECRET, EMAIL, EMAIL_PASSWORD } = require('../../secrets');
const { default: axios } = require('axios');

async function get_verify_user(req, res) {
  const token = req.query.token;
  let user;
  let error = false;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    user = decoded.user;
  }
  catch (err) {
    let message = 'Token is invalid ' + err + ' : ' + token;
    res.status(409).json({ message });
    error = true;
  }
  if (!error) {
    User.findOneAndUpdate({ email: user }, { $set: { verified: true } }, (err, usr) => {
      if (err) {
        res.status(500).json({ message: "server error" + err });
      }
      else if (usr) {
        res.status(200).json({ message: "user is now verified" });
      }
      else {
        res.status(409).json({ message: "user not found." });
      }
    });
  }
}

async function new_verify(email) {
  return new Promise((resolve, reject) => {
    let verify_token;
    jwt.sign({ user: email },JWT_SECRET, async function(err, token) {
      if (err) {
        reject(err);
      }
      else if (token) {
        verify_token = token;
        const new_verify = new Verify({email, token});
        try {
          await new_verify.save();
          resolve("verification token created and saved to db");
        }
        catch (err) {
          console.log(err);
          reject("failed to save new token to db");
        }
      }
      else {
        reject("server error");
      }
    });
  });
}
//const new_agency = new Agency({ name, address, website, email, phone, rating });
//        //console.log('saving agency...');
//        //save the agency
//        try {
//          await new_agency.save();
//          res.status(201).json({id: new_agency._id});
//          //console.log('saved agency to db');
//        }
//        catch (error) { //server error occured trying to save the agency
//          res.status(500).json({ message: error.message });
//          //console.log('failed to save agency to db');

async function send_verification_email(rec_email) {
  return new Promise(async (resolve, reject) => {
    let token;
    let verification_url;
    Verify.findOne({email: rec_email}, async function(err, verify) {
      if (err) {
        reject("server error");
      }
      else if (verify) {
        //console.log(verify);
        token = verify.token;
        verification_url = 'localhost:3000/verify?token=' + token;
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
          subject: "Please verify your email",
          text: "Please verify. " + verification_url
        });
        console.log("Message sent: %s", info.messageId);
        resolve();
      }
      else {
        reject("no verification entry found");
      }
    });
  })
}

module.exports = { get_verify_user, new_verify, send_verification_email };