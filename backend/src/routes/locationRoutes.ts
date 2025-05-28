import express from 'express';
import { updateLocation, getLocation } from '../controllers/locationController';

const router = express.Router();

router.post('/', updateLocation);
router.get('/:orderId', getLocation);

export default router;
