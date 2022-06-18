const express = require('express');
const controller = require('../controllers/location');
const { verifyMongooseID } = require('../middlewares');

const router = express.Router();

router.get('/:id', verifyMongooseID, controller.getLocation);
router.post('/', controller.createLocation);
router.delete('/:id', verifyMongooseID, controller.deleteLocation);
router.put('/:id', verifyMongooseID, controller.updateLocation);

module.exports = router;
