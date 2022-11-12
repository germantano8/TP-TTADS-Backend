const express = require('express');
const controller = require('../controllers/user');
const auth = require('../middlewares/auth-middleware');
const {
  verifyMongooseID,
  verifyUserWrapper,
  verifyLocation,
} = require('../middlewares/index');

const router = express.Router();

router.get('/', controller.getUsers);
router.get('/session', auth, controller.getSession)
router.get('/logout', auth, controller.logout);
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
