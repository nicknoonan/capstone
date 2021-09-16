const jwt = require('jsonwebtoken');
const { JWT_SECRET, ADMIN_EMAIL } = require('../secrets.js');
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  // Check for token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    if (req.user.email == ADMIN_EMAIL) {
      next();
    }
    else {
      let message = 'Invalid admin credentials';
      res.status(400).json({ message });
    }
  } 
  catch (e) {
    let message = 'Token is not valid. ' + e
    res.status(400).json({ message });
  }
};