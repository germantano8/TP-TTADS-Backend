const express = require('express');
const controller = require('../controllers/restaurant');
const {
  verifyMongooseID,
  verifyLocation,
  verifyRestaurantTags,
} = require('../middlewares');

const router = express.Router();

router.get('/', controller.getRestaurants);
router.get('/:id', verifyMongooseID, controller.getRestaurant);
router.post('/', verifyRestaurantTags, controller.createRestaurant);
router.delete('/:id', verifyMongooseID, controller.deleteRestaurant);
router.put('/:id', verifyMongooseID, controller.updateRestaurant);

router.get('/byTag/:id', verifyMongooseID, controller.getRestaurantsByTag);

router.put('/:id/location', verifyMongooseID, verifyLocation, controller.addLocation);
router.delete('/:id/location', verifyMongooseID, controller.removeLocation);

module.exports = router;
