const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();

const authMiddleware = auth({
  audience: process.env.AUTH0_IDENTIFIER,
  issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
});

module.exports = authMiddleware;
