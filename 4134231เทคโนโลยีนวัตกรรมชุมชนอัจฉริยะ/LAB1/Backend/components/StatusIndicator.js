export default function StatusIndicator({ status }) {
  if (!status) return <div>Loading...</div>;
  return (
    <div style={{ marginTop: 24, padding: 20, border: '1px solid #ddd', borderRadius: 12 }}>
      <div>สถานะระบบ: {status.systemStatus}</div>
      <div>ตรวจจับควัน: {status.smokeDetected ? 'ใช่' : 'ไม่ใช่'}</div>
      <div>ตรวจจับไฟ: {status.fireDetected ? 'ใช่' : 'ไม่ใช่'}</div>
      <div>อัปเดตล่าสุด: {new Date(status.lastUpdated).toLocaleTimeString()}</div>
    </div>
  );
}
