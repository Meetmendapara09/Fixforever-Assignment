'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSocket } from '@/app/hooks/useSocket';
import { useParams } from 'next/navigation';
import API from '@/app/lib/api';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function TrackPage() {
  const { orderId } = useParams();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const socket = useSocket();

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res = await API.get(`/location/${orderId}`);
        if (res.data?.lat && res.data?.lng) {
          setLocation({ lat: res.data.lat, lng: res.data.lng });
        }
      } catch (e) {
        console.error('No initial location found');
      }
    };

    fetchInitial();

    socket.on('locationUpdate', (data: any) => {
      if (data.orderId === orderId) {
        setLocation({ lat: data.lat, lng: data.lng });
      }
    });

    return () => {
      socket.off('locationUpdate');
    };
  }, [socket, orderId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tracking Order: {orderId}</h2>
      {location ? (
        <MapContainer center={location} zoom={15} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup>Delivery Partner is here</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Waiting for delivery location...</p>
      )}
    </div>
  );
}
