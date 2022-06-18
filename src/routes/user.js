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
router.put('/:id/', verifyMongooseID, verifyUser, controller.updateUser);

router.post('/:id/mainLocation', verifyLocation, controller.addMainLocation);
router.delete('/:id/mainLocation', controller.removeMainLocation);
router.post('/:id/location', verifyLocation, controller.addLocation);
router.delete('/:id/location', verifyLocation, controller.removeLocation);

module.exports = router;
