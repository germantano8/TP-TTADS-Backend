const express = require('express');
const controller = require('../controllers/meal');
const { verifyMongooseID, verifyMealWrapper } = require('../middlewares');

const router = express.Router();

router.get('/', controller.getMeals);
router.get('/:id/', verifyMongooseID, controller.getMeal);
router.post('/', verifyMealWrapper(false), controller.createMeal);
router.delete('/:id/', verifyMongooseID, controller.deleteMeal);
router.put('/:id/', verifyMongooseID, verifyMealWrapper(true), controller.updateMeal);

module.exports = router;
