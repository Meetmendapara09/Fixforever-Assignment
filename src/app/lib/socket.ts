// src/lib/socket.ts
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000', {
  autoConnect: false,
  transports: ['websocket'],
});

export default socket;
