const jwt = require('jsonwebtoken');
require('dotenv').config();
// Middleware function for JWT verification
// Middleware to verify JWT token
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = verifyJWT;
