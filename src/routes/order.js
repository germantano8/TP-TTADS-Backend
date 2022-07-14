const express = require('express');
const controller = require('../controllers/order');
const { verifyMongooseID, verifyOrder } = require('../middlewares');

const router = express.Router();

router.get('/', controller.getOrders);
router.get('/:id/', verifyMongooseID, controller.getOrder);
router.post('/', verifyOrder, controller.createOrder);
router.delete('/:id/', verifyMongooseID, controller.deleteOrder);
router.put('/:id/', verifyMongooseID, verifyOrder, controller.updateOrder);

module.exports = router;