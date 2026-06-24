# Backend Design for Waste Bank System

## 1. วัตถุประสงค์
ไฟล์นี้เป็นแผนการสร้าง Backend สำหรับระบบธนาคารขยะชุมชน โดยกำหนดสถาปัตยกรรม API, ฐานข้อมูล, และโครงสร้างการทำงานเพื่อรองรับฟังก์ชันหลักของระบบ

## 2. เทคโนโลยีที่แนะนำ
- Node.js + Express หรือ NestJS
- PostgreSQL สำหรับฐานข้อมูลเชิงสัมพันธ์
- Prisma หรือ Sequelize เป็น ORM
- JWT สำหรับการยืนยันตัวตน
- bcrypt สำหรับเข้ารหัสรหัสผ่าน
- CORS, helmet และ rate limiter สำหรับความปลอดภัย

## 3. สถาปัตยกรรม Backend
### 3.1 โครงสร้างแอปพลิเคชัน
- controllers/  : รับคำขอและเรียกใช้บริการ
- services/     : ตรรกะธุรกิจหลัก
- models/       : แบบจำลองข้อมูล และ ORM schema
- routes/       : กำหนดเส้นทาง API
- middlewares/  : ตรวจสอบสิทธิ์, validation, error handling
- utils/        : ฟังก์ชันช่วยเหลือทั่วไป

### 3.2 การเชื่อมต่อฐานข้อมูล
- ใช้ PostgreSQL ในการเก็บข้อมูลหลักทั้งหมด
- ออกแบบ schema ให้รองรับการขยายตัวในอนาคต

## 4. โมเดลข้อมูลหลัก
### 4.1 User
- id
- name
- email
- password_hash
- role  (member, admin)
- created_at
- updated_at

### 4.2 WasteType
- id
- name
- unit  (กิโลกรัม, ชิ้น, ลิตร)
- point_rate  (คะแนนต่อหน่วย)
- created_at
- updated_at

### 4.3 Deposit
- id
- user_id
- waste_type_id
- quantity
- point_amount
- status  (pending, approved, rejected)
- created_at
- updated_at

### 4.4 Withdrawal
- id
- user_id
- amount
- description
- status  (requested, approved, paid)
- created_at
- updated_at

### 4.5 PointsTransaction
- id
- user_id
- type  (deposit, withdrawal, adjustment)
- amount
- description
- created_at

### 4.6 ActivityLog
- id
- user_id
- action
- detail
- created_at

## 5. API Endpoints
### 5.1 Authentication
- POST `/api/auth/register` : สมัครสมาชิก
- POST `/api/auth/login` : เข้าสู่ระบบ
- POST `/api/auth/refresh` : ต่ออายุ token

### 5.2 Users
- GET `/api/users/me` : ดึงข้อมูลผู้ใช้งานปัจจุบัน
- GET `/api/users` : ดึงรายการผู้ใช้ (Admin)
- PUT `/api/users/me` : แก้ไขโปรไฟล์

### 5.3 Waste Types
- GET `/api/waste-types` : ดึงประเภทขยะทั้งหมด
- POST `/api/waste-types` : สร้างประเภทขยะใหม่ (Admin)
- PUT `/api/waste-types/:id` : แก้ไขประเภทขยะ (Admin)
- DELETE `/api/waste-types/:id` : ลบประเภทขยะ (Admin)

### 5.4 Deposits
- GET `/api/deposits` : ดึงรายการฝากขยะของผู้ใช้หรือทั้งหมด (Admin)
- POST `/api/deposits` : ลงทะเบียนขยะที่นำมาฝาก
- PUT `/api/deposits/:id/status` : อัปเดตสถานะฝากขยะ (Admin)
- GET `/api/deposits/:id` : ดูรายละเอียดการฝาก

### 5.5 Withdrawals
- GET `/api/withdrawals` : ดึงรายการถอนของผู้ใช้หรือทั้งหมด (Admin)
- POST `/api/withdrawals` : ขอถอนคะแนน
- PUT `/api/withdrawals/:id/status` : อัปเดตสถานะการถอน (Admin)
- GET `/api/withdrawals/:id` : ดูรายละเอียดการถอน

### 5.6 Dashboard
- GET `/api/dashboard/summary` : สรุปสถานะการรีไซเคิล, คะแนนรวม, และจำนวนรายการ
- GET `/api/dashboard/statistics` : ข้อมูลกราฟสถิติรายวันหรือรายเดือน

## 6. การจัดการสิทธิ์และความปลอดภัย
- ใช้ JWT สำหรับการยืนยันตัวตนของผู้ใช้
- Middleware ตรวจสอบ `Authorization` header
- แยกสิทธิ์ `admin` กับผู้ใช้ปกติ
- บังคับใช้ validation สำหรับข้อมูลที่รับเข้ามา
- ป้องกัน body injection และ SQL injection ด้วย ORM

## 7. ตัวอย่างการใช้งาน
- ผู้ใช้ลงทะเบียนและเข้าสู่ระบบ
- ผู้ใช้บันทึกการฝากขยะพร้อมระบุประเภทและปริมาณ
- ระบบคำนวณคะแนนตามอัตราและสร้างรายการฝาก
- แอดมินตรวจสอบและอนุมัติรายการฝาก
- ผู้ใช้ขอถอนคะแนนและแอดมินอนุมัติการจ่าย
- หน้า Dashboard แสดงสถิติการรีไซเคิลและคะแนนสะสม

## 8. แนวทางการพัฒนา
1. สร้างโปรเจกต์ backend ด้วย `npm init` และติดตั้ง dependencies
2. เขียน schema และ migration ฐานข้อมูล
3. สร้างโมเดลและบริการหลักสำหรับ `User`, `WasteType`, `Deposit`, `Withdrawal`
4. สร้าง API route และกำหนด middleware สำหรับ auth
5. ทดสอบ endpoint ด้วย Postman / Insomnia
6. ต่อเชื่อม frontend กับ API ที่สร้างขึ้น

## 9. หมายเหตุ
- หากต้องการใช้ Next.js API route ให้วางโฟลเดอร์ `pages/api` หรือ `app/api` ตามโครงสร้าง Next.js
- หากต้องการแยก backend ออกเป็นบริการต่างหาก ให้ใช้โฟลเดอร์ `backend/` หรือ repository แยกต่างหาก
- สามารถขยายไปใช้ฟีเจอร์เพิ่มเติม เช่น การแสดงแผนที่จุดรับขยะ หรือระบบแจ้งเตือนอีเมลได้ในอนาคต
