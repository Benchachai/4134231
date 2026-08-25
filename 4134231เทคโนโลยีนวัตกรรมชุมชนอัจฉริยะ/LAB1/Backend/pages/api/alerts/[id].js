const alerts = [
  {
    id: '1',
    type: 'ควัน',
    severity: 'medium',
    status: 'new',
    message: 'ตรวจพบควันในโซน A',
    detectedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'ไฟ',
    severity: 'high',
    status: 'acknowledged',
    message: 'ตรวจพบเปลวไฟในโซน B',
    detectedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const allowOrigin = 'http://localhost:3001';

function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default function handler(req, res) {
  applyCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const { id } = req.query;
  const alert = alerts.find((item) => item.id === id);

  if (!alert) {
    return res.status(404).json({ message: 'ไม่พบการแจ้งเตือน' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(alert);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
