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

  const status = {
    smokeDetected: false,
    fireDetected: false,
    systemStatus: 'ปกติ',
    lastUpdated: new Date().toISOString(),
  };
  res.status(200).json(status);
}
