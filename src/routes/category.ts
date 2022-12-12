import * as express from 'express';
import { categoryController as controller } from '../controllers';
import { verifyMongooseID, verifyCategory } from '../middlewares';

const router = express.Router();

router.get('/', controller.getCategories);
router.get('/:id/', verifyMongooseID, controller.getCategory);
router.post('/', verifyCategory, controller.createCategory);
router.delete('/:id/', verifyMongooseID, controller.deleteCategory);
router.put('/:id/', verifyMongooseID, verifyCategory, controller.updateCategory);

export{router};
