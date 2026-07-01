import { useEffect, useState } from 'react';
import StatusIndicator from '../components/StatusIndicator';
import { fetchStatus } from '../services/api';

export default function Home() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchStatus();
        setStatus(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Load failed');
      }
    }

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <h1>ระบบแจ้งเหตุเพลิงไหม้</h1>
      <p>สถานะระบบแบบเรียลไทม์และข้อมูลการแจ้งเตือน</p>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <StatusIndicator status={status} />
    </main>
  );
}
