export async function fetchStatus() {
  const res = await fetch('/api/status');
  if (!res.ok) throw new Error('ไม่สามารถโหลดสถานะได้');
  return res.json();
}

export async function fetchAlerts() {
  const res = await fetch('/api/alerts');
  if (!res.ok) throw new Error('ไม่สามารถโหลดรายการแจ้งเตือนได้');
  return res.json();
}

export async function fetchAlertById(id) {
  const res = await fetch(`/api/alerts/${id}`);
  if (!res.ok) throw new Error('ไม่สามารถโหลดรายละเอียดแจ้งเตือนได้');
  return res.json();
}
