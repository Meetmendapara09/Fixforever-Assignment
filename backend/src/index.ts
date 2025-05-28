import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { app } from './app';
import { connectDB } from './services/db';

dotenv.config();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('locationUpdate', (data) => {
    console.log('Location received:', data);
    io.emit('locationUpdate', data); // broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

connectDB();


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
