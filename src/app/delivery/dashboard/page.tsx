'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '@/app//hooks/useSocket';
import API from '@/app/lib/api';

export default function DeliveryDashboard() {
  const [tracking, setTracking] = useState(false);
  const deliveryId = typeof window !== 'undefined' ? localStorage.getItem('deliveryId') : null;
  const [orderId, setOrderId] = useState<string | null>(null);
  const socket = useSocket();

  // Dummy assigned order (simulate fetching)
  useEffect(() => {
    // TODO: Replace with real API to fetch assigned order
    setOrderId('order1');
  }, []);

  const sendLocation = async () => {
    if (navigator.geolocation && orderId) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const data = {
          orderId,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        socket.emit('locationUpdate', data);
        await API.post('/location', data);
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (tracking && orderId) {
      sendLocation();
      interval = setInterval(() => {
        sendLocation();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [tracking, orderId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Delivery Dashboard</h2>
      <p>Delivery ID: {deliveryId}</p>
      <p>Assigned Order: {orderId || 'Loading...'}</p>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setTracking(true)}
        disabled={tracking || !orderId}
      >
        {tracking ? 'Tracking...' : 'Start Delivery'}
      </button>
    </div>
  );
}
