// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Real-Time Delivery Tracker</h1>
      <ul className="space-y-2">
        <li><Link className="text-blue-600" href="/vendor/login">Vendor Login</Link></li>
        <li><Link className="text-blue-600" href="/delivery/login">Delivery Partner Login</Link></li>
        <li><Link className="text-blue-600" href="/customer/track/order123">Customer Tracking (Sample)</Link></li>
      </ul>
    </main>
  );
}
