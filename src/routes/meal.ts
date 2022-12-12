import * as express from 'express';
import { mealController as controller } from '../controllers';
import { verifyMongooseID, verifyMealWrapper } from '../middlewares';

const router = express.Router();

router.get('/', controller.getMeals);
router.get('/:id/', verifyMongooseID, controller.getMeal);
router.post('/', verifyMealWrapper(false), controller.createMeal);
router.delete('/:id/', verifyMongooseID, controller.deleteMeal);
router.put('/:id/', verifyMongooseID, verifyMealWrapper(true), controller.updateMeal);

export{router};
