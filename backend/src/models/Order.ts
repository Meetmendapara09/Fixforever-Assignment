import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  vendorId: String,
  customerName: String,
  status: { type: String, enum: ['pending', 'assigned'], default: 'pending' },
  deliveryPartnerId: { type: String, default: null },
});

export const Order = model('Order', orderSchema);
