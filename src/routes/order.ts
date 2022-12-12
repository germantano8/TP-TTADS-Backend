import * as express from 'express';
import { orderController as controller } from '../controllers';
import { verifyMongooseID, verifyOrder, authMiddleware} from '../middlewares';

const router = express.Router();

router.get('/', controller.getOrders);
router.get('/:id/', verifyMongooseID, controller.getOrder);
router.post('/', authMiddleware, verifyOrder, controller.createOrder);
router.delete('/:id/', verifyMongooseID, controller.deleteOrder);
router.put('/:id/', verifyMongooseID, verifyOrder, controller.updateOrder);

export{router};
