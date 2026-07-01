import Link from 'next/link';
import { useEffect, useState } from 'react';
import AlertCard from '../components/AlertCard';
import { fetchAlerts } from '../services/api';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
      } catch (err) {
        setError(err.message || 'Failed to load alerts');
      }
    }

    load();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <h1>ประวัติการแจ้งเตือน</h1>
      <Link href="/">กลับไปหน้าหลัก</Link>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
        {alerts.length === 0 ? (
          <div>ไม่มีแจ้งเตือนในขณะนี้</div>
        ) : (
          alerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
        )}
      </div>
    </main>
  );
}
