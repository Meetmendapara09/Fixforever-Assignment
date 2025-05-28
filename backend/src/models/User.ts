import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: String,
  role: { type: String, enum: ['vendor', 'delivery'], required: true },
});

export const User = model('User', userSchema);
