import Link from 'next/link';

export default function AlertCard({ alert }) {
  const color = alert.severity === 'high' ? '#ff4d4f' : alert.severity === 'medium' ? '#faad14' : '#52c41a';

  return (
    <div style={{ border: `1px solid ${color}`, borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <strong>{alert.type}</strong>
          <div>{alert.message}</div>
        </div>
        <div style={{ color }}>{alert.severity.toUpperCase()}</div>
      </div>
      <div style={{ marginTop: 12 }}>
        <span>สถานะ: {alert.status}</span>
      </div>
      <div style={{ marginTop: 12 }}>
        <Link href={`/alerts/${alert.id}`}>ดูรายละเอียด</Link>
      </div>
    </div>
  );
}
