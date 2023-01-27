import * as express from 'express';
import { tagController as controller } from '../controllers';
import { verifyMongooseID, verifyTag } from '../middlewares/index';

const router = express.Router();

router.get('/', controller.getTags);
router.get('/:id', verifyMongooseID, controller.getTag);
router.post('/', verifyTag, controller.createTag);
router.delete('/:id', verifyMongooseID, controller.deleteTag);
router.put('/:id', verifyMongooseID, verifyTag, controller.updateTag);

export{router};
