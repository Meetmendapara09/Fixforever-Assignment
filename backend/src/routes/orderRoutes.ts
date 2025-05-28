import express from 'express';
import { getVendorOrders, assignDelivery } from '../controllers/orderController';

const router = express.Router();

router.get('/:vendorId', getVendorOrders);
router.post('/assign', assignDelivery);

export default router;
