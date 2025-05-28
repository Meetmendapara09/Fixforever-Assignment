import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import orderRoutes from './routes/orderRoutes';
import locationRoutes from './routes/locationRoutes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/location', locationRoutes);

app.get('/', (_req, res) => res.send('API is running'));
