# TASK.md - รายการภารกิจและงาน

*เอกสารนี้สรุปรายการภารกิจทั้งหมดสำหรับการพัฒนาระบบแจ้งเหตุเพลิงไหม้ อ้างอิงจาก CLAUDE.md, SRS.md, ARCHITECTURE.md, และ readme.md*

---

## 📋 ข้อมูลโปรเจกต์
- **ชื่อระบบ:** ระบบแจ้งเหตุเพลิงไหม้
- **ประเภท:** ระบบต้นแบบ (Prototype)
- **Stack:** Frontend: Next.js + React | Backend: REST API | Database: PostgreSQL/MongoDB
- **สถานะ:** กำลังพัฒนา (In Development)

---

## 🎯 Phase 1: Setup พื้นฐาน (Foundation Setup)

### Backend Services
- [ ] **T1.1** สร้าง Backend API project (Node.js/Express หรือตามที่เลือก)
  - เตรียม project structure
  - ตั้งค่า environment variables
  - เตรียม package dependencies

- [ ] **T1.2** ออกแบบและสร้างโครงสร้าง Database
  - สร้าง table: `alert_events`
  - สร้าง table: `system_status`
  - สร้าง table: `sensor_readings`
  - สร้าง table: `user_acknowledgments`
  - ตั้งค่า indexes และ constraints

- [ ] **T1.3** สร้าง API Endpoints พื้นฐาน
  - `GET /api/status` - ดึงสถานะระบบปัจจุบัน
  - `GET /api/alerts` - ดึงประวัติการแจ้งเตือน
  - `GET /api/alerts/:id` - ดึงรายละเอียดการแจ้งเตือนเดี่ยว
  - `POST /api/alerts/acknowledge` - ยืนยันการรับแจ้งเตือน
  - `GET /api/sensor-data` - ดึงข้อมูลเซ็นเซอร์ล่าสุด
  - `POST /api/sensor-data` - บันทึกข้อมูลเซ็นเซอร์

### Frontend Services
- [ ] **T1.4** สร้าง Next.js project
  - `npm create next-app@latest`
  - ตั้งค่า Tailwind CSS หรือ Bootstrap
  - เตรียม TypeScript (optional แต่แนะนำ)
  - สร้าง folder structure: `pages`, `components`, `services`, `hooks`

- [ ] **T1.5** สร้าง HTTP Client
  - ตั้งค่า Axios หรือ Fetch wrapper
  - สร้าง environment config สำหรับ API base URL
  - สร้าง error handling middleware

### Development Environment
- [ ] **T1.6** ตั้งค่า Git repository
  - สร้าง `.gitignore` ที่เหมาะสม
  - สร้าง branch strategy (main, develop, feature/*)
  - Commit convention: `type: description` เช่น `feat: add dashboard`

- [ ] **T1.7** ตั้งค่า Docker (optional)
  - สร้าง `Dockerfile` สำหรับ Backend
  - สร้าง `Dockerfile` สำหรับ Frontend
  - สร้าง `docker-compose.yml` สำหรับ orchestration

---

## 🎨 Phase 2: Mock Data & Display (ข้อมูลจำลองและการแสดงผล)

### Mock Data Provider
- [ ] **T2.1** สร้าง Mock Data Service
  - สร้างข้อมูลเซ็นเซอร์จำลอง (sensor data)
  - สร้างข้อมูลสถานะระบบจำลอง (system status)
  - สร้างประวัติการแจ้งเตือนจำลอง (alert history)
  - ข้อมูลควรรองรับ scenarios: ปกติ, ตรวจพบควัน, ตรวจพบไฟ

- [ ] **T2.2** เชื่อมต่อ Mock Data กับ Backend API
  - แก้ไข endpoint ให้ส่ง mock data
  - สร้าง config flag `useMockData` สำหรับสลับระหว่าง mock/real data

### Dashboard UI
- [ ] **T2.3** สร้าง Layout หลัก
  - Header ที่มี title และ navigation
  - Sidebar หรือ top menu bar
  - Main content area
  - Footer (optional)
  - Responsive design สำหรับ mobile/tablet/desktop

- [ ] **T2.4** สร้าง Dashboard Page (`/dashboard`)
  - แสดง Status Indicator สำหรับ "ปกติ", "เตือน", "อันตราย"
  - แสดงเวลาอัปเดตล่าสุด
  - ตัวนับจำนวนการแจ้งเตือนวันนี้
  - สถิติสั้น ๆ (เช่น: ทั้งหมด X เหตุการณ์)

### Components - Status Display
- [ ] **T2.5** สร้าง `StatusIndicator` Component
  - แสดงสถานะการตรวจจับควัน (สีเขียว/เหลือง/แดง)
  - แสดงสถานะการตรวจจับไฟ (สีเขียว/เหลือง/แดง)
  - ใช้ Icons เพื่อให้ชัดเจน (เช่น 🟢 🟡 🔴)
  - Responsive design

- [ ] **T2.6** สร้าง `SystemStatus` Component
  - แสดง overall system status
  - แสดง timestamp อัปเดตล่าสุด
  - ปุ่ม refresh หรือ auto-refresh toggle

### Responsive Design
- [ ] **T2.7** ทดสอบ Responsive Design
  - ทดสอบบน mobile (< 480px)
  - ทดสอบบน tablet (480px - 1024px)
  - ทดสอบบน desktop (> 1024px)
  - ปรับ layout, font size, spacing ตามต้องการ

- [ ] **T2.8** ทดสอบ Cross-browser
  - Chrome/Chromium
  - Firefox
  - Safari
  - Edge

---

## 🔔 Phase 3: Alert System (ระบบการแจ้งเตือน)

### Backend Alert Detection
- [ ] **T3.1** สร้าง `AlertDetectionService`
  - ตรวจจับสถานะเซ็นเซอร์
  - เปรียบเทียบกับ threshold ที่กำหนด
  - กำหนด severity: high/medium/low
  - สร้าง Alert Event ในฐานข้อมูล

- [ ] **T3.2** สร้าง `SensorDataProcessor`
  - ทำความเข้าใจ sensor readings
  - ประมวลผล data (เช่น: smoothing, averaging)
  - ตรวจจับ anomalies
  - ส่งต่อให้ AlertDetectionService

- [ ] **T3.3** สร้าง `NotificationService`
  - สร้างข้อความแจ้งเตือน (ไทย)
  - ส่งการแจ้งเตือนไปยัง Frontend
  - ตัวจัดการเสียงเตือน (เตรียมไฟล์ MP3)
  - ตัวจัดการ Browser Notification API

### Alert History Page
- [ ] **T3.4** สร้าง Alert History Page (`/alerts`)
  - ตาราง/รายการแสดงประวัติการแจ้งเตือน
  - คอลัมน์: วันที่/เวลา, ประเภท (ควัน/ไฟ), ระดับความรุนแรง, ข้อความ, สถานะ
  - Pagination หรือ infinite scroll
  - ตัวกรอง (filter) ตามประเภท, วันที่, สถานะ
  - ตัวค้นหา (search) ตามข้อความ

- [ ] **T3.5** สร้าง Alert Detail Page (`/alerts/:id`)
  - แสดงรายละเอียดการแจ้งเตือนเดี่ยว
  - เวลาเกิดเหตุการณ์ (detected_at)
  - เวลาแก้ไข (resolved_at)
  - ข้อมูลเซ็นเซอร์ที่เกี่ยวข้อง
  - บันทึกการยืนยันของผู้ใช้

### Frontend Alert UI
- [ ] **T3.6** สร้าง `AlertCard` Component
  - แสดงข้อมูลการแจ้งเตือนหลัก (compact)
  - สีตามระดับความรุนแรง (high: แดง, medium: เหลือง, low: เขียว)
  - ปุ่ม "ดูรายละเอียด" (link to detail page)
  - ปุ่ม "ยืนยันการรับ" (acknowledge button)

- [ ] **T3.7** สร้าง `AlertNotification` Component
  - ป็อป-อัพ/Toast แสดงการแจ้งเตือนใหม่
  - แสดงข้อความแจ้งเตือน (ไทย)
  - ปุ่ม "ยืนยันการรับ" และ "ปิด"
  - Auto-dismiss หลังจาก 10 วินาที (optional)
  - เล่นเสียงเตือน

- [ ] **T3.8** สร้าง `AlertHistory` Component
  - ตาราง/รายการข้อมูล
  - Sorting ตามวันที่, ประเภท, ระดับ
  - Pagination

### Acknowledge & Resolution
- [ ] **T3.9** สร้าง Acknowledge API
  - `POST /api/alerts/:id/acknowledge`
  - บันทึกเวลา และผู้ใช้ที่ยืนยัน
  - อัปเดตสถานะ Alert เป็น "acknowledged"

- [ ] **T3.10** สร้าง Auto-resolution Logic
  - ถ้าหยุดการตรวจจับสัญญาณอันตราย ให้ทำเครื่องหมายว่า "resolved"
  - บันทึก resolved_at timestamp
  - แจ้งเตือน Frontend ให้รู้

---

## ⚡ Phase 4: Real-time Features (ฟีเจอร์เรียลไทม์)

### WebSocket Setup (Alternative to Polling)
- [ ] **T4.1** ตั้งค่า WebSocket Server (Backend)
  - ใช้ Socket.io หรือ ws library
  - สร้าง connection handler
  - สร้าง disconnect handler
  - Broadcast alerts ไปยังทุก connected clients

- [ ] **T4.2** สร้าง WebSocket Client (Frontend)
  - ติดตั้ง Socket.io client library
  - สร้าง connection ไปยัง Backend
  - Listen events: status update, new alert, alert resolved
  - Handle reconnection

### Real-time Status Update
- [ ] **T4.3** ส่ง Status Updates ทั่ว WebSocket
  - ทุกครั้งที่สถานะเปลี่ยน ให้ broadcast ไปยังทุก clients
  - Frontend รับ update และอัปเดต UI โดยไม่ต้อง refresh

- [ ] **T4.4** Update Frontend Dashboard ตามเรียลไทม์
  - StatusIndicator เปลี่ยนสีแบบ real-time
  - ตัวนับเหตุการณ์อัปเดต
  - Timestamp อัปเดตโดยอัตโนมัติ

### Real-time Alert Notification
- [ ] **T4.5** ส่ง Alert Notifications ทั่ว WebSocket
  - ทำให้ AlertNotification Component ทำงานแบบ real-time
  - แสดง pop-up/toast ทันทีเมื่อตรวจจับเหตุการณ์
  - เล่นเสียง alert

- [ ] **T4.6** Update Alert History ตามเรียลไทม์
  - ข้อมูลใหม่ปรากฏที่ด้านบนของรายการ
  - ไม่ต้องให้ผู้ใช้ refresh หน้า

### Performance Optimization
- [ ] **T4.7** Optimize Performance
  - Cache สถานะระบบที่ Frontend ระดับสั้น ๆ
  - ลดจำนวน API calls
  - Lazy load components ที่ Alert History page
  - Debounce search/filter queries

- [ ] **T4.8** ทดสอบ Load & Stress Testing
  - ทดสอบระบบกับ multiple concurrent connections
  - ทดสอบการส่ง alerts หลาย ๆ อันต่อเนื่องกัน
  - ตรวจสอบ latency, response time

---

## 🔌 Phase 5: Integration & Deployment (ปรับใช้และ Deploy)

### Sensor Integration
- [ ] **T5.1** เตรียม Driver/Interface สำหรับเซ็นเซอร์
  - เขียน code สำหรับอ่านข้อมูลจากเซ็นเซอร์จริง
  - Handle sensor errors และ connection issues
  - Logging sensor readings

- [ ] **T5.2** เปลี่ยนจาก Mock Data เป็น Real Data
  - เปิดใช้ real sensor data source
  - ทดสอบการเชื่อมต่อกับเซ็นเซอร์จริง
  - ตรวจสอบข้อมูลที่ได้

### Database Migration
- [ ] **T5.3** ตั้งค่า Database สำหรับ Production
  - สร้าง production database instance
  - ย้ายข้อมูลทดสอบ (migration scripts)
  - ตั้งค่า backup strategy

- [ ] **T5.4** ตั้งค่า Database Indexing
  - เพิ่ม indexes บนคอลัมน์ที่ query บ่อย
  - เช่น: `alert_events.created_at`, `alert_events.type`, `system_status.updated_at`

### Environment Configuration
- [ ] **T5.5** สร้าง Environment-specific Configs
  - Development configuration
  - Staging configuration
  - Production configuration
  - API URLs, logging levels, feature flags

- [ ] **T5.6** ตั้งค่า Security
  - HTTPS/TLS for production
  - Environment variables สำหรับ secrets
  - Input validation & sanitization
  - Rate limiting API endpoints
  - CORS configuration

### Testing & QA
- [ ] **T5.7** End-to-end Testing
  - ทดสอบ flow ทั้งหมด: dashboard → alert → history
  - ทดสอบ real-time updates
  - ทดสอบ error scenarios
  - ทดสอบ mobile, tablet, desktop

- [ ] **T5.8** Performance & Load Testing
  - Measure API response times
  - Measure frontend load time
  - Test with multiple concurrent users
  - Identify bottlenecks

- [ ] **T5.9** Bug Fixing & Optimization
  - แก้ไข bugs ที่พบจากการทดสอบ
  - Optimize slow queries
  - Optimize frontend bundle size
  - ปรับปรุง UX ตามข้อเสนอแนะ

### Deployment
- [ ] **T5.10** ตั้งค่า Deployment Pipeline
  - CI/CD setup (GitHub Actions, GitLab CI, หรือ Jenkins)
  - Automated testing ก่อน deploy
  - Automated build & deployment

- [ ] **T5.11** Deploy Backend
  - เลือก hosting (Heroku, AWS, Google Cloud, DigitalOcean, etc.)
  - Deploy backend service
  - ตั้งค่า environment variables
  - ตรวจสอบ health check endpoint

- [ ] **T5.12** Deploy Frontend
  - Build Next.js production build: `npm run build`
  - Deploy ไป Vercel, Netlify, หรือ hosting อื่น
  - ตั้งค่า environment variables (.env.production)
  - ทดสอบ production deployment

### Documentation & Handover
- [ ] **T5.13** เขียน Developer Documentation
  - API documentation (Swagger/OpenAPI, Postman)
  - Setup guide สำหรับ developers ใหม่
  - Code conventions & standards
  - Troubleshooting guide

- [ ] **T5.14** เขียน User Documentation
  - User manual (ภาษาไทย)
  - FAQ
  - Tutorial/Getting started guide
  - Known issues & limitations

- [ ] **T5.15** Handover & Training
  - Training สำหรับ operations team
  - Training สำหรับ support team
  - Documentation repository setup
  - Support process & escalation

---

## 📋 Additional / Cross-cutting Tasks

### Code Quality & Standards
- [ ] **T6.1** ตั้งค่า Linting & Code Formatting
  - ESLint สำหรับ JavaScript/TypeScript
  - Prettier สำหรับ code formatting
  - Pre-commit hooks (husky)
  - ตรวจสอบ code style ใน CI/CD

- [ ] **T6.2** Code Review & Refactoring
  - ตั้งค่า Pull Request review process
  - ทำการ code review ทั้ง Frontend และ Backend
  - Refactor code ให้เป็นไปตาม conventions
  - หลีกเลี่ยง code duplication

### Documentation & Knowledge Base
- [ ] **T6.3** เขียน Architecture Diagram
  - System architecture diagram (ทำแล้ว → ARCHITECTURE.md)
  - Data flow diagram
  - Deployment diagram
  - ER Diagram สำหรับ Database

- [ ] **T6.4** เขียน Development Guide
  - Installation & setup instructions
  - Running the project locally
  - Common commands & workflows
  - Contributing guidelines

### Monitoring & Logging
- [ ] **T6.5** ตั้งค่า Logging
  - Implement structured logging (Backend)
  - Log levels: ERROR, WARN, INFO, DEBUG
  - เก็บ logs ตามเวลา (timestamp)
  - ส่วนประกอบ log: request ID, user, action, status

- [ ] **T6.6** ตั้งค่า Error Tracking
  - Sentry หรือ error tracking service
  - Capture unexpected errors
  - Alerting สำหรับ critical errors

### Future Enhancements (ไว้สำหรับอนาคต)
- [ ] **T7.1** User Authentication & Authorization
  - Login/logout functionality
  - Role-based access control (Admin, User)
  - Session management

- [ ] **T7.2** Multi-location Support
  - รองรับหลายที่ตั้ง
  - Map view ของ locations
  - Drill-down จาก location level

- [ ] **T7.3** Email & SMS Notifications
  - Send alerts via email
  - Send alerts via SMS
  - Notification preferences per user

- [ ] **T7.4** Mobile App (React Native)
  - Create mobile version
  - Native notifications
  - Offline support

- [ ] **T7.5** Advanced Analytics & Reporting
  - Dashboard statistics
  - Reports (daily, weekly, monthly)
  - Export reports (PDF, Excel)

- [ ] **T7.6** Machine Learning Integration
  - Pattern recognition
  - Predictive alerts
  - Anomaly detection

- [ ] **T7.7** Integration with Fire Dispatch System
  - Send alerts to fire department
  - Track dispatch status
  - Close loop workflow

---

## 📌 Task Dependencies & Sequencing

```
Phase 1 (T1.1 - T1.7)
    ↓
Phase 2 (T2.1 - T2.8)
    ↓ (can be parallel)
Phase 3 (T3.1 - T3.10) + Phase 4 Polling part
    ↓
Phase 4 Complete (T4.1 - T4.8)
    ↓
Phase 5 (T5.1 - T5.15) + Cross-cutting (T6, T7)
```

---

## ✅ Completion Checklist

**Phase 1 Progress:** [ ] 0% | [ ] 25% | [ ] 50% | [ ] 75% | [ ] 100%
**Phase 2 Progress:** [ ] 0% | [ ] 25% | [ ] 50% | [ ] 75% | [ ] 100%
**Phase 3 Progress:** [ ] 0% | [ ] 25% | [ ] 50% | [ ] 75% | [ ] 100%
**Phase 4 Progress:** [ ] 0% | [ ] 25% | [ ] 50% | [ ] 75% | [ ] 100%
**Phase 5 Progress:** [ ] 0% | [ ] 25% | [ ] 50% | [ ] 75% | [ ] 100%

**Overall Project:** [ ] 0% | [ ] 25% | [ ] 50% | [ ] 75% | [ ] 100%

---

## 📝 Notes & Reminders

### Important Rules (จาก CLAUDE.md)
- ✅ ใช้ชื่อไฟล์และตัวแปรเป็นภาษาอังกฤษ
- ✅ ใช้ภาษาไทยสำหรับ UI text
- ✅ ตั้งชื่อให้สื่อความหมาย (e.g., DashboardPage, AlertCard, FireStatus)
- ✅ เขียนโค้ดให้ชัดเจน และแยกความรับผิดชอบ
- ✅ ใช้ mock data ได้หากไม่มีเซ็นเซอร์จริง
- ✅ อย่าเพิ่มฟีเจอร์นอกขอบเขต
- ✅ โฟกัสที่ความง่ายในการใช้งาน, ความเสถียร, ความสามารถขยายตัว

### Key Requirements (จาก SRS.md)
- ✅ Functional Requirements:
  1. Dashboard สำหรับติดตามสถานะระบบ
  2. สถานะเรียลไทม์ (smoke/fire detection)
  3. Alert notifications
  4. Alert history
  5. Mobile & Desktop support
  6. Summary statistics

- ✅ Non-Functional Requirements:
  1. Response time เหมาะสม
  2. ความเสถียรและ availability
  3. ความปลอดภัยพอเหมาะ
  4. ง่ายในการใช้งาน
  5. สามารถพัฒนาต่อได้ (Frontend/Backend separation)

### Tech Stack Reminders
- Frontend: Next.js + React + Responsive CSS (Tailwind/Bootstrap)
- Backend: REST API (Node.js/Express or similar)
- Database: PostgreSQL หรือ MongoDB
- Real-time: WebSocket หรือ Polling
- DevOps: Docker (optional), Git, CI/CD

---

**Document Version:** 1.0
**Last Updated:** 2024-01-15
**Status:** Ready for Development
