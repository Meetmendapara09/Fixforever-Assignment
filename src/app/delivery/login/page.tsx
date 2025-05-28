'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeliveryLogin() {
  const [id, setId] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem('deliveryId', id);
    router.push('/delivery/dashboard');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Delivery Partner Login</h2>
      <input
        type="text"
        placeholder="Delivery ID"
        value={id}
        onChange={e => setId(e.target.value)}
        className="w-full p-2 border mb-4"
      />
      <button onClick={handleLogin} className="w-full bg-green-600 text-white py-2 rounded">
        Login
      </button>
    </div>
  );
}
