const express = require('express');
const controller = require('../controllers/meal');
const { verifyMongooseID, verifyMeal } = require('../middlewares');

const router = express.Router();

router.get('/', controller.getMeals);
router.get('/:id/', verifyMongooseID, controller.getMeal);
router.post('/', verifyMeal, controller.createMeal);
router.delete('/:id/', verifyMongooseID, controller.deleteMeal);
router.put('/:id/', verifyMongooseID, verifyMeal, controller.updateMeal);

module.exports = router;
