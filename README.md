# ระบบแจ้งเหตุเพลิงไหม้ (ตัวอย่างโค้ด)

เอกสารฉบับนี้ให้ตัวอย่างโค้ดจริงที่สอดคล้องกับโครงสร้างโปรเจกต์ เพื่อให้สามารถเริ่มพัฒนาได้ทันที แยกเป็นส่วน `frontend/` และ `backend/` ตามงานที่ต้องทำ

## โครงสร้างโปรเจกต์ (ตัวอย่าง)

```text
project/
├── frontend/                # Next.js app (UI + pages/api)
│   ├── pages/
│   │   ├── index.js         # หน้าแดชบอร์ด
│   │   └── api/status.js    # API route สำหรับสถานะ (mock)
│   ├── components/
│   │   └── StatusIndicator.jsx
│   └── services/
│       └── api.js
│
└── backend/                 # ตัวอย่าง Express backend (optional)
    ├── routes/
    │   └── status.js
    ├── controllers/
    │   └── alertController.js
    ├── services/
    │   └── sensorService.js
    └── models/
        └── alert.js
```

---

## Frontend (Next.js) — ตัวอย่างไฟล์ที่ใช้งานได้จริง

- [pages/index.js]

```javascript
import { useEffect, useState } from 'react';
import StatusIndicator from '../components/StatusIndicator';
import { fetchStatus } from '../services/api';

export default function Home() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function load() {
      const s = await fetchStatus();
      setStatus(s);
    }
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{padding:20}}>
      <h1>Fire Alert Dashboard</h1>
      <StatusIndicator status={status} />
    </main>
  );
}
```

- [pages/api/status.js] (Next.js API route — mock data)

```javascript
export default function handler(req, res) {
  // ตัวอย่างข้อมูล mock — ในการใช้งานจริงให้เชื่อมต่อกับ backend หรือ sensor
  res.status(200).json({
    smokeDetected: false,
    fireDetected: false,
    lastUpdated: new Date().toISOString()
  });
}
```

- [components/StatusIndicator.jsx]

```javascript
export default function StatusIndicator({ status }) {
  if (!status) return <div>Loading...</div>;
  const { smokeDetected, fireDetected, lastUpdated } = status;
  return (
    <div>
      <div>Smoke: {smokeDetected ? 'Yes' : 'No'}</div>
      <div>Fire: {fireDetected ? 'Yes' : 'No'}</div>
      <div>Updated: {new Date(lastUpdated).toLocaleTimeString()}</div>
    </div>
  );
}
```

- [services/api.js]

```javascript
export async function fetchStatus() {
  const res = await fetch('/api/status');
  if (!res.ok) throw new Error('Failed to load status');
  return res.json();
}
```

---

## Backend (Express) — ตัวอย่างแยก backend (ถ้าต้องการ)

- [backend/routes/status.js]

```javascript
const express = require('express');
const router = express.Router();
const { getStatus } = require('../controllers/alertController');

router.get('/status', getStatus);

module.exports = router;
```

- [backend/controllers/alertController.js]

```javascript
exports.getStatus = (req, res) => {
  // ตัวอย่าง: อ่านข้อมูลจาก service หรือ database
  const data = {
    smokeDetected: false,
    fireDetected: false,
    lastUpdated: new Date().toISOString()
  };
  res.json(data);
};
```

- [backend/services/sensorService.js]

```javascript
// ตัวอย่างฟังก์ชันจำลองการอ่านเซ็นเซอร์
exports.readSensor = async () => {
  return { smoke: false, flame: false };
};
```

- [backend/models/alert.js]

```javascript
// โมเดลเรียบง่ายสำหรับเก็บแจ้งเตือน (pseudo)
class Alert {
  constructor({ type, timestamp }) {
    this.type = type;
    this.timestamp = timestamp || Date.now();
  }
}
module.exports = Alert;
```

---

## คำสั่งเรียกใช้งาน (Quick start)

ถ้าใช้ Next.js (frontend + API ในตัว):

```bash
npm install
npm run dev
# เปิด http://localhost:3000
```

ถ้าแยกเป็น Express backend:

```bash
cd backend
npm install
node server.js # หรือใช้ nodemon
```

---

## ข้อแนะนำถัดไป
- สร้างไฟล์จริงตามตัวอย่างภายใต้ `frontend/` และ `backend/` เพื่อทดสอบการเชื่อมต่อ
- ถ้าต้องการ ผมสามารถสร้างไฟล์ตัวอย่างใน repository ให้ครบ (pages, components, routes)

เสร็จสิ้น: ผมได้แทนที่ `readme.md` ด้วยโครงสร้างและตัวอย่างโค้ดที่ใช้งานได้จริงแล้ว
