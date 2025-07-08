'use client';

import { useEffect, useState } from 'react';
import API from '@/app/lib/api';

type Order = {
  _id: string;
  customerName: string;
  status: string;
  deliveryPartnerId?: string;
};

const dummyOrders: Order[] = [
  { _id: 'order1', customerName: 'Alice', status: 'pending' },
  { _id: 'order2', customerName: 'Bob', status: 'assigned', deliveryPartnerId: 'partner123' },
];

export default function VendorDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const vendorId = typeof window !== 'undefined' ? localStorage.getItem('vendor') : null;

  const fetchOrders = async () => {
    if (vendorId) {
      const res = await API.get(`/orders/${vendorId}`);
      setOrders(res.data);
    }
  };

  useEffect(() => {
    setOrders(dummyOrders);
  }, []);

  const assignDeliveryPartner = async (orderId: string) => {
    await API.post('/orders/assign', {
      orderId,
      deliveryPartnerId: 'partner123',
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Vendor Dashboard</h2>
      <table className="w-full text-left border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.customerName}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                {order.status === 'pending' ? (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => assignDeliveryPartner(order.id)}
                  >
                    Assign
                  </button>
                ) : (
                  <span className="text-green-600">Assigned</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
