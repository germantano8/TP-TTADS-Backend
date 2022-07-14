const express = require('express');
const controller = require('../controllers/location');
const { verifyMongooseID, verifyLocation } = require('../middlewares');

const router = express.Router();

router.get('/:id', verifyMongooseID, controller.getLocation);
router.post('/', verifyLocation, controller.createLocation);
router.delete('/:id', verifyMongooseID, controller.deleteLocation);
router.put('/:id', verifyMongooseID, verifyLocation, controller.updateLocation);

module.exports = router;
