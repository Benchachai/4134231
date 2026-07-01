export default function handler(req, res) {
  const status = {
    smokeDetected: false,
    fireDetected: false,
    systemStatus: 'ปกติ',
    lastUpdated: new Date().toISOString(),
  };
  res.status(200).json(status);
}
