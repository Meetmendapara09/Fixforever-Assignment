import { Request, Response } from 'express';
import { Order } from '../models/Order';

export const getVendorOrders = async (req: Request, res: Response) => {
  const { vendorId } = req.params;
  const orders = await Order.find({ vendorId });
  res.json(orders);
};

export const assignDelivery = async (req: Request, res: Response) => {
  const { orderId, deliveryPartnerId } = req.body;
  const order = await Order.findByIdAndUpdate(orderId, {
    deliveryPartnerId,
    status: 'assigned',
  }, { new: true });

  res.json(order);
};
