import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchAlertById } from '../../services/api';

export default function AlertDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const data = await fetchAlertById(id);
        setAlert(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load alert');
      }
    }

    load();
  }, [id]);

  if (!alert) {
    return <div style={{ padding: 24 }}>กำลังโหลดรายละเอียดการแจ้งเตือน...</div>;
  }

  return (
    <main style={{ padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <h1>รายละเอียดการแจ้งเตือน</h1>
      <p>ประเภท: {alert.type}</p>
      <p>ระดับ: {alert.severity}</p>
      <p>สถานะ: {alert.status}</p>
      <p>ข้อความ: {alert.message}</p>
      <p>ตรวจพบเมื่อ: {new Date(alert.detectedAt).toLocaleString()}</p>
      <p>อัปเดตล่าสุด: {new Date(alert.updatedAt).toLocaleString()}</p>
    </main>
  );
}
