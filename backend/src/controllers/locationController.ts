import { Request, Response } from 'express';
import { Location } from '../models/Location';

export const updateLocation = async (req: Request, res: Response) => {
  const { orderId, lat, lng } = req.body;
  const loc = await Location.create({ orderId, lat, lng });
  res.json(loc);
};

export const getLocation = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const location = await Location.findOne({ orderId }).sort({ timestamp: -1 });
  res.json(location);
};
