const express = require('express');
const controller = require('../controllers/user');
const authMiddleware = require('../middlewares/auth-middleware');
const { auth } = require("express-oauth2-jwt-bearer");

require("dotenv").config();
const {
  verifyMongooseID,
  verifyUserWrapper,
  verifyLocation,
} = require('../middlewares/index');

const router = express.Router();
const checkJwt = auth({
  audience: process.env.AUTH0_IDENTIFIER,
  issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
});
router.get('/', controller.getUsers);
router.get('/session', authMiddleware, controller.getSession)
router.get('/logout', authMiddleware, controller.logout);
router.get('/:id', verifyMongooseID, controller.getUser);
router.post('/register', verifyUserWrapper(false), controller.createUser);
router.post('/login', controller.login);
router.delete('/:id/', verifyMongooseID, controller.deleteUser);
router.put('/:id/', verifyMongooseID, verifyUserWrapper(true), controller.updateUser);

router.post('/:id/main_location', verifyMongooseID, verifyLocation, controller.addMainLocation);
router.delete('/:id/main_location', verifyMongooseID, controller.removeMainLocation);
router.post('/:id/location', verifyMongooseID, verifyLocation, controller.addLocation);
router.delete('/:id/location', verifyMongooseID, verifyLocation, controller.removeLocation);

module.exports = router;
