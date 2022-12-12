import * as express from 'express';
import {locationController as controller} from '../controllers/location';
import { verifyMongooseID, verifyLocation } from '../middlewares';

const router = express.Router();

router.get('/:id', verifyMongooseID, controller.getLocation);
router.post('/', verifyLocation, controller.createLocation);
router.delete('/:id', verifyMongooseID, controller.deleteLocation);
router.put('/:id', verifyMongooseID, verifyLocation, controller.updateLocation);

export{router};
