const jwt = require('jsonwebtoken');
const config = require('config');

// This middleware is created to validate the token used by the protected route, which will be added to the route parameter
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user; // get the payload of user id
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
