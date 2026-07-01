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

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(alerts);
  }

  if (req.method === 'POST') {
    const newAlert = {
      id: String(alerts.length + 1),
      ...req.body,
      detectedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    alerts.push(newAlert);
    return res.status(201).json(newAlert);
  }

  res.status(405).json({ message: 'Method not allowed' });
}
