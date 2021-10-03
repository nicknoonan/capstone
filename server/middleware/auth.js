const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets.js');

module.exports = (req, res, next) => {
  const token = req.header('authtoken');

  // Check for token
  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    let message = 'Token is not valid. ' + e
    res.status(400).json({ message });
  }
};