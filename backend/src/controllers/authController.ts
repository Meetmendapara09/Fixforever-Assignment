import { Request, Response } from 'express';
import { User } from '../models/User';

export const login = async (req: Request, res: Response) => {
  const { email, role } = req.body;

  if (!email || !role) return res.status(400).json({ error: 'Email and role required' });

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, role });
  }

  res.json({ userId: user._id });
};
