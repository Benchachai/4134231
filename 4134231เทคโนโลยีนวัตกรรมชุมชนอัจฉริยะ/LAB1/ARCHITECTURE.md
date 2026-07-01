# ARCHITECTURE - ระบบแจ้งเหตุเพลิงไหม้

## 1. ภาพรวมสถาปัตยกรรม

ระบบแจ้งเหตุเพลิงไหม้ได้รับการออกแบบในรูปแบบ **Client-Server Architecture** ที่แยกแยะความรับผิดชอบอย่างชัดเจน ทำให้สามารถพัฒนา ทดสอบ และขยายตัวได้อย่างอิสระ

```
┌─────────────────────────────────────────────────────────────────┐
│                     FIRE ALERT SYSTEM                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────┐         ┌──────────────────────┐  │
│  │   FRONTEND (Next.js)   │         │  BACKEND (API)       │  │
│  │                        │         │                      │  │
│  │ • Dashboard            │◄────────►│ • Alert Service      │  │
│  │ • Alert History        │  HTTP    │ • Status Service     │  │
│  │ • Real-time Status     │  REST    │ • Notification       │  │
│  │ • Responsive Design    │          │ • Data Processing    │  │
│  └────────────────────────┘         └──────────────────────┘  │
│                                              │                 │
│                                              ▼                 │
│                                     ┌──────────────────────┐  │
│                                     │  Data Layer          │  │
│                                     │ • Alert History      │  │
│                                     │ • System Status      │  │
│                                     │ • Notification Log   │  │
│                                     └──────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2. โครงสร้างระบบ (System Architecture)

### 2.1 Frontend Layer (Presentation Tier)
**Stack:** Next.js + React + Responsive Design

**หน้าที่หลัก:**
- แสดงสถานะการตรวจจับควันและเปลวไฟแบบเรียลไทม์
- แสดงแดชบอร์ด (Dashboard) สำหรับมองภาพรวมระบบ
- แสดงประวัติการแจ้งเตือนย้อนหลัง
- รับการแจ้งเตือนและแสดงผลต่อผู้ใช้ทันที

**หน้าหลัก:**
- `pages/dashboard` - แดชบอร์ดแสดงสถานะปัจจุบัน
- `pages/alerts` - ประวัติการแจ้งเตือน
- `pages/status` - สถานะระบบโดยละเอียด

**Components:**
- `AlertCard` - แสดงข้อมูลการแจ้งเตือนแต่ละรายการ
- `StatusIndicator` - ตัวบ่งชี้สถานะควัน/ไฟ
- `AlertHistory` - ตารางประวัติการแจ้งเตือน
- `RealTimeUpdater` - ความรับผิดชอบการอัปเดตข้อมูลเรียลไทม์

**State Management:**
- ใช้ React State สำหรับสถานะท้องถิ่น
- WebSocket หรือ Polling สำหรับอัปเดตเรียลไทม์

### 2.2 Backend Layer (API Tier)
**Stack:** REST API Service

**หน้าที่หลัก:**
- รับข้อมูลจากเซ็นเซอร์ (หรือ mock data ในช่วงต้นแบบ)
- ประมวลผลข้อมูลและตรวจจับสัญญาณอันตราย
- จัดการการแจ้งเตือนและการส่ง
- เก็บรักษาข้อมูลลงในฐานข้อมูล

**API Endpoints:**
```
GET  /api/status              - ดึงสถานะระบบปัจจุบัน
GET  /api/alerts              - ดึงประวัติการแจ้งเตือน
GET  /api/alerts/:id          - ดึงรายละเอียดการแจ้งเตือน
POST /api/alerts/acknowledge  - ยืนยันการรับการแจ้งเตือน
GET  /api/sensor-data         - ดึงข้อมูลจากเซ็นเซอร์
POST /api/sensor-data         - บันทึกข้อมูลจากเซ็นเซอร์
```

**Services:**
- `SensorDataProcessor` - ประมวลผลข้อมูลจากเซ็นเซอร์
- `AlertDetectionService` - ตรวจจับเหตุการณ์อันตราย
- `NotificationService` - ส่งการแจ้งเตือน
- `AlertHistoryService` - จัดการประวัติ

### 2.3 Data Layer (Persistence Tier)
**หน้าที่:**
- เก็บข้อมูลสถานะระบบ
- เก็บประวัติการแจ้งเตือน
- เก็บบันทึก (Logs)

**ตารางข้อมูลหลัก:**
- `alert_events` - ประวัติเหตุการณ์ทั้งหมด
- `system_status` - สถานะระบบปัจจุบัน
- `sensor_readings` - ข้อมูลการวัดจากเซ็นเซอร์
- `user_acknowledgments` - บันทึกการยืนยันของผู้ใช้

## 3. Data Flow (การไหลของข้อมูล)

### 3.1 Flow: การตรวจจับเหตุการณ์อันตราย

```
1. เซ็นเซอร์ส่งข้อมูล
   ▼
2. Backend รับข้อมูล (POST /api/sensor-data)
   ▼
3. SensorDataProcessor ประมวลผลข้อมูล
   ▼
4. AlertDetectionService ตรวจจับเหตุการณ์อันตราย
   ├─ ถ้าตรวจพบควัน/ไฟ
   │  ▼
   │  สร้าง Alert Event ใหม่ในฐานข้อมูล
   │  ▼
   │  NotificationService ส่งการแจ้งเตือน
   │  ▼
   │  Frontend ได้รับการแจ้งเตือน (WebSocket/Polling)
   │  ▼
   │  แสดงข้อความแจ้งเตือนให้ผู้ใช้เห็น
   │
   └─ ถ้าไม่พบอันตราย
      ▼
      อัปเดตสถานะระบบเป็น "ปกติ"
```

### 3.2 Flow: ผู้ใช้ดูแดชบอร์ด

```
1. ผู้ใช้เปิดหน้า Dashboard
   ▼
2. Frontend ส่งคำขอ GET /api/status
   ▼
3. Backend ตอบเอา StatusDTO ที่มี:
   - smokeDetected: boolean
   - fireDetected: boolean
   - systemStatus: string (normal/warning/alert)
   - lastUpdateTime: timestamp
   ▼
4. Frontend แสดงข้อมูลบนหน้าจอ
   ▼
5. Frontend สร้าง WebSocket/polling connection
   │  เพื่อรับอัปเดตข้อมูลเรียลไทม์
   ▼
6. เมื่อเกิดการเปลี่ยนแปลง Backend จะส่งข้อมูลใหม่
   ▼
7. Frontend อัปเดตหน้าจอโดยไม่ต้อง refresh
```

### 3.3 Flow: ผู้ใช้ดูประวัติการแจ้งเตือน

```
1. ผู้ใช้ไปที่หน้า Alerts
   ▼
2. Frontend ส่งคำขอ GET /api/alerts?page=1&limit=20
   ▼
3. Backend ค้นหาจากฐานข้อมูล alert_events
   ▼
4. Backend ส่งกลับ Array of AlertDTO:
   [
     {
       id: "ALERT_001",
       type: "smoke", // or "fire"
       severity: "high", // or "medium", "low"
       detectedAt: "2024-01-15T10:30:00Z",
       resolvedAt: "2024-01-15T10:35:00Z",
       message: "ตรวจพบควันในเขตที่ 2"
     },
     ...
   ]
   ▼
5. Frontend แสดงประวัติในรูปแบบตาราง
```

## 4. การตัดสินใจดีไซน์หลัก (Key Design Decisions)

### 4.1 แยก Frontend และ Backend
**ตัดสินใจ:** ใช้สถาปัตยกรรม Client-Server แบบแยกส่วน

**เหตุผล:**
- ✅ ง่ายต่อการพัฒนาและทดสอบแต่ละส่วนอิสระ
- ✅ สามารถเปลี่ยนเทคโนโลยีได้ง่าย (เปลี่ยน Frontend เป็น Native ได้)
- ✅ รองรับการขยายตัวในอนาคต (เพิ่ม API endpoints ใหม่ได้ง่าย)
- ✅ ลดการผูกติดระหว่าง UI logic และ business logic

### 4.2 ใช้ REST API
**ตัดสินใจ:** ใช้ REST API สำหรับการสื่อสารระหว่าง Frontend กับ Backend

**เหตุผล:**
- ✅ ไม่ซับซ้อน เข้าใจง่าย
- ✅ สามารถใช้กับ HTTP/HTTPS ได้ปกติ
- ✅ สามารถเพิ่ม WebSocket ภายหลังสำหรับ real-time updates ได้
- ✅ แต่ละ endpoint มีความเจาะจงและ stateless

### 4.3 Real-time Updates
**ตัดสินใจ:** รองรับ real-time updates โดยใช้ WebSocket หรือ Polling

**เหตุผล:**
- ✅ ผู้ใช้ต้องได้รับการแจ้งเตือนทันที
- ✅ Polling: ง่ายมากในการพัฒนา แต่สิ้นเปลือง bandwidth
- ✅ WebSocket: เหมาะสม แต่ต้องการการจัดการ connection ที่ดี

**ทางเลือก:** เริ่มต้นด้วย Polling เพื่อความเรียบง่าย อัปเกรดเป็น WebSocket ในอนาคต

### 4.4 Mock Data ในช่วงต้นแบบ
**ตัดสินใจ:** ใช้ข้อมูลจำลอง (Mock Data) ก่อน

**เหตุผล:**
- ✅ ไม่ต้องรอการติดตั้งเซ็นเซอร์จริง
- ✅ ง่ายต่อการทดสอบ scenarios ต่างๆ (ควัน, ไฟ, ปกติ)
- ✅ สามารถสร้างข้อมูลจำลองตามต้องการ
- ✅ เมื่อมีเซ็นเซอร์จริง เพียงแค่เปลี่ยนการดึงข้อมูล

**การสลับจาก Mock เป็น Real:**
```javascript
// config.js
const useMockData = true; // เปลี่ยนเป็น false สำหรับข้อมูลจริง

// Backend
const getSensorData = () => {
  if (useMockData) {
    return mockDataProvider.getData();
  } else {
    return realSensorProvider.getData();
  }
};
```

### 4.5 Responsive Design
**ตัดสินใจ:** รองรับ Desktop, Tablet, Mobile แบบ Responsive

**เหตุผล:**
- ✅ ผู้ใช้อาจใช้งานจากอุปกรณ์หลากหลาย
- ✅ Bootstrap/Tailwind CSS ทำให้ง่ายในการสร้าง responsive
- ✅ SRS ต้องการรองรับ mobile และ desktop

### 4.6 Stateless API
**ตัดสินใจ:** API ต้องเป็น Stateless (ไม่เก็บสถานะของแต่ละ client)

**เหตุผล:**
- ✅ ง่ายต่อการ scale ในอนาคต (load balancing)
- ✅ ลดความซับซ้อนของ server side
- ✅ แต่ละ request มีข้อมูลทั้งหมดที่ต้อง (self-contained)

**การเก็บสถานะ:**
- Session data → Frontend ที่จะเก็บ (cookies, localStorage)
- Business data → Database ที่จะเก็บ

### 4.7 ประวัติการแจ้งเตือน (Alert History)
**ตัดสินใจ:** เก็บประวัติทุกการแจ้งเตือน

**เหตุผล:**
- ✅ ผู้ดูแลสามารถตรวจสอบประวัติได้
- ✅ ช่วยในการวิเคราะห์และปรับปรุง
- ✅ SRS ต้องการ "ประวัติการแจ้งเตือนย้อนหลัง"

**ข้อมูลที่เก็บ:**
- เวลา (timestamp) ของเหตุการณ์
- ประเภท (smoke/fire)
- ระดับความรุนแรง (severity)
- ข้อความ (message)
- สถานะ (resolved/acknowledged)

## 5. โฟลว์ของการแจ้งเตือน (Notification Flow)

```
┌─────────────────────────────────────────────────────────────────┐
│              NOTIFICATION FLOW (การไหลของการแจ้งเตือน)           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 1. Detection                                                    │
│    ┌──────────────────────────────────────────────────────┐   │
│    │ AlertDetectionService ตรวจจับควัน/ไฟ              │   │
│    │ severity = "high" / "medium" / "low"               │   │
│    └──────────────────┬───────────────────────────────────┘   │
│                       │                                        │
│ 2. Storage            ▼                                        │
│    ┌──────────────────────────────────────────────────────┐   │
│    │ บันทึก Alert Event ลงฐานข้อมูล                      │   │
│    │ • alert_events.id = UUID                            │   │
│    │ • alert_events.type = "smoke" | "fire"             │   │
│    │ • alert_events.severity = "high" | "medium" | "low"│   │
│    │ • alert_events.created_at = NOW()                  │   │
│    └──────────────────┬───────────────────────────────────┘   │
│                       │                                        │
│ 3. Notification       ▼                                        │
│    ┌──────────────────────────────────────────────────────┐   │
│    │ NotificationService ส่งการแจ้งเตือน                │   │
│    │ • UI Alert: แสดงบนหน้าจอผู้ใช้                      │   │
│    │ • Sound: เล่นเสียงเตือน                             │   │
│    │ • Browser Notification: ใช้ Web API                │   │
│    │ • Email/SMS: (optional) ในอนาคต                   │   │
│    └──────────────────┬───────────────────────────────────┘   │
│                       │                                        │
│ 4. Broadcasting       ▼                                        │
│    ┌──────────────────────────────────────────────────────┐   │
│    │ ส่งข้อมูลอัปเดตไปยังทุก connected clients        │   │
│    │ • WebSocket broadcast                              │   │
│    │ • หรือ Polling client จะติ่งเห็น                   │   │
│    └──────────────────┬───────────────────────────────────┘   │
│                       │                                        │
│ 5. User Receive       ▼                                        │
│    ┌──────────────────────────────────────────────────────┐   │
│    │ ผู้ใช้ได้รับการแจ้งเตือน                           │   │
│    │ • ตัวอักษรสีแดง ⚠️ ที่ด้านบนของหน้าจอ            │   │
│    │ • เสียงเตือน (ถ้าเปิดใช้)                          │   │
│    │ • Browser Notification (ถ้า push enabled)          │   │
│    └──────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 6. Technology Stack

| Layer | Technology | ทำหน้าที่ |
|-------|-----------|---------|
| **Frontend** | Next.js | Framework หลัก |
| | React | UI Library |
| | TypeScript (Optional) | Type Safety |
| | Tailwind/Bootstrap | Styling & Responsive |
| | Axios/Fetch | HTTP Client |
| **Backend** | Node.js/Express (or similar) | Web Framework |
| | REST API | Communication Protocol |
| **Database** | PostgreSQL/MongoDB | Data Storage |
| | | (ขึ้นอยู่กับความต้องการ) |
| **DevOps** | Git | Version Control |
| | Docker (Optional) | Containerization |

## 7. ขึ้นตอนสำหรับการพัฒนา

### Phase 1: Setup พื้นฐาน
- [ ] สร้าง Next.js project สำหรับ Frontend
- [ ] สร้าง API Backend
- [ ] สร้างฐานข้อมูล schema

### Phase 2: Mock Data & Display
- [ ] สร้าง mock sensor data
- [ ] สร้าง Dashboard page
- [ ] สร้าง Status display components
- [ ] ทดสอบ Responsive design

### Phase 3: Alert System
- [ ] สร้าง Alert detection logic
- [ ] สร้าง Alert history page
- [ ] สร้าง Notification UI
- [ ] ทดสอบการแจ้งเตือน

### Phase 4: Real-time Features
- [ ] เพิ่ม WebSocket (หรือ Polling)
- [ ] ทดสอบ real-time updates
- [ ] optimize performance

### Phase 5: Integration
- [ ] เชื่อมต่อเซ็นเซอร์จริง (เมื่อพร้อม)
- [ ] ทดสอบ end-to-end
- [ ] Deploy

## 8. Security Considerations

- 🔒 API endpoints ควร validate input ทั้งหมด
- 🔒 ใช้ HTTPS สำหรับ production
- 🔒 ป้องกัน XSS, CSRF attacks
- 🔒 Rate limiting สำหรับ API calls
- 🔒 ไม่เพิ่มความสำคัญของข้อมูลในการแจ้งเตือน

## 9. Performance Optimization

- ⚡ Cache status data ที่ Frontend
- ⚡ Lazy load components สำหรับหน้า Alerts
- ⚡ Minimize API calls ด้วยการ batch requests (ถ้าจำเป็น)
- ⚡ ใช้ CDN สำหรับ static assets
- ⚡ Database indexing บนคอลัมน์ที่ query บ่อย (created_at, status)

## 10. Scalability & Future Enhancements

### ในอนาคต:
- 📈 Multi-location support (หลายพื้นที่)
- 📈 User authentication & roles
- 📈 Email/SMS notifications
- 📈 Mobile app (React Native)
- 📈 Advanced analytics & reporting
- 📈 Integration with firefighting dispatch system
- 📈 Machine learning สำหรับ pattern recognition

---

**Document Version:** 1.0  
**Last Updated:** 2024-01-15  
**Author:** Development Team
