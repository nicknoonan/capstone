const jwt = require('jsonwebtoken');
const { JWT_SECRET, ADMIN_EMAIL } = require('../secrets.js');
module.exports = (req, res, next) => {
  const token = req.header('authtoken');
  // Check for token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }     
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    //verify that the user email matches admin creds
    if (req.user.email == ADMIN_EMAIL) {
      next();
    }
    //user is not an admin
    else {
      let message = 'Invalid admin credentials';
      res.status(400).json({ message });
    }
  } 
  //token verifaction failed
  catch (e) {
    let message = 'Token is not valid. ' + e
    res.status(400).json({ message });
  }
};