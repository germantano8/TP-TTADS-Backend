const express = require('express');
const controller = require('../controllers/user');
const {
  verifyMongooseID,
  verifyUser,
  verifyLocation,
} = require('../middlewares/index');

const router = express.Router();

router.get('', controller.getUsers);
router.get('/:id/', verifyMongooseID, controller.getUser);
router.post('/register', verifyUser, controller.createUser);
router.post('/login', controller.login);
router.delete('/:id/', verifyMongooseID, controller.deleteUser);
router.put('/:id/', verifyMongooseID, (req, res, next) => verifyUser(req, res, next, true), controller.updateUser);

router.post('/:id/mainLocation', verifyMongooseID, verifyLocation, controller.addMainLocation);
router.delete('/:id/mainLocation', verifyMongooseID, controller.removeMainLocation);
router.post('/:id/location', verifyMongooseID, verifyLocation, controller.addLocation);
router.delete('/:id/location', verifyMongooseID, verifyLocation, controller.removeLocation);

module.exports = router;
