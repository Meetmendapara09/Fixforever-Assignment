import { Schema, model } from 'mongoose';

const locationSchema = new Schema({
  orderId: String,
  lat: Number,
  lng: Number,
  timestamp: { type: Date, default: Date.now },
});

export const Location = model('Location', locationSchema);
