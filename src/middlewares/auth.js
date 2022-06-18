const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: 'Token is required for auth' });
  }

  try {
    const key = process.env.TOKEN_KEY || '';
    const decoded = jwt.verify(token, key);
    if (Date.now() > decoded.exp * 1000) {
      return res.status(403).send({ success: false, message: 'Token expired' });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(403).send({ success: false, message: 'Invalid token' });
  }
};

module.exports = auth;
