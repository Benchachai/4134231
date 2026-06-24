# Architecture Document

## 1. บทสรุปสถาปัตยกรรม
เอกสารนี้อธิบายสถาปัตยกรรมของระบบบริหารจัดการงานและโครงการ (Project & Task Management System) ที่พัฒนาเป็นเว็บแอปพลิเคชันรองรับทั้ง Mobile และ PC โดยมีเป้าหมายเพื่อให้ทีมงานในชุมชนสามารถสร้าง แบ่งปัน และติดตามงานได้อย่างมีประสิทธิภาพ

## 2. วัตถุประสงค์ของสถาปัตยกรรม
- รองรับการใช้งานบนอุปกรณ์ทั้งมือถือและเดสก์ท็อป
- แยกชั้นการทำงานอย่างชัดเจนระหว่าง Frontend, Backend, และ Database
- รองรับการขยายตัวในอนาคตทั้งฟังก์ชันและผู้ใช้งาน
- มุ่งเน้นความปลอดภัยของข้อมูลและการจัดการสิทธิ์ผู้ใช้

## 3. ภาพรวมระบบ (System Context)
### 3.1 ผู้ใช้งานหลัก
- Administrator: ดูแลระบบ, จัดการผู้ใช้ และกำหนดสิทธิ์
- Project Manager: สร้างโครงการ, มอบหมายงาน, ตรวจสอบความคืบหน้า
- Team Member: รับงาน, อัปเดตสถานะ, แสดงความคิดเห็น

### 3.2 ระบบภายนอกที่เชื่อมต่อ
- ระบบส่งอีเมลสำหรับแจ้งเตือน
- OAuth/SSO (Google, Microsoft) สำหรับการเข้าสู่ระบบ
- บริการจัดเก็บไฟล์ (เช่น S3 หรือ object storage)
- CDN/SSL สำหรับเสิร์ฟหน้าเว็บอย่างปลอดภัยและรวดเร็ว

## 4. สถาปัตยกรรมเชิงตรรกะ (Logical Architecture)
### 4.1 Presentation Layer
- Web UI: React.js + TypeScript + Tailwind CSS
- Responsive layout สำหรับ Mobile และ Desktop
- คอมโพเนนต์หลัก: Dashboard, Project Board, Kanban Board, Task Detail, Profile

### 4.2 Application Layer
- Backend API: Node.js + Express หรือ NestJS
- RESTful API / GraphQL API สำหรับการสื่อสารกับ Frontend
- Business logic: Authentication, Authorization, Project Management, Task Management, Notification

### 4.3 Data Layer
- Database: PostgreSQL สำหรับข้อมูลเชิงสัมพันธ์
- Cache: Redis สำหรับ session caching และการเร่งความเร็วของ query ที่จำเป็น
- Storage: S3 หรือ Object Storage สำหรับไฟล์แนบและเอกสาร

## 5. โมดูลหลักของระบบ
### 5.1 Authentication & Authorization
- ลงทะเบียนและเข้าสู่ระบบด้วยอีเมล/รหัสผ่าน
- รองรับ OAuth/SSO (Google, Microsoft)
- ใช้ JWT หรือ session-based authentication
- RBAC: แยกสิทธิ์เป็น Admin, PM, Member

### 5.2 Project Management
- สร้าง แก้ไข ลบโครงการ
- กำหนดสมาชิกในโครงการ
- แสดงภาพรวมโครงการและสถานะงาน

### 5.3 Task Management
- สร้างงานในโครงการ
- กำหนดรายละเอียด: หัวข้อ, รายละเอียด, ผู้รับผิดชอบ, วันครบกำหนด, ความสำคัญ
- สนับสนุน Kanban Board และระบบลากวางการ์ดงาน
- แสดงความคิดเห็นและแนบไฟล์ในแต่ละงาน

### 5.4 Notification System
- แจ้งเตือนในแอป (In-app notification)
- แจ้งเตือนทางอีเมลเมื่อมีการมอบหมายงานหรือสถานะเปลี่ยน

### 5.5 Reporting & Dashboard
- แสดงสรุปสถานะงานของโครงการ
- กราฟสถานะงาน เช่น Pie Chart, Bar Chart
- ส่งออกรายงานเป็น PDF หรือ Excel

## 6. เทคโนโลยีที่แนะนำ
- Frontend: React.js, TypeScript, Tailwind CSS, Vite
- Backend: Node.js, Express หรือ NestJS, TypeScript
- Database: PostgreSQL
- Cache: Redis
- Storage: AWS S3 หรือบริการจัดเก็บไฟล์อื่น
- Infrastructure: AWS EC2 / AWS ECS / AWS Lambda, RDS, CloudFront, Route 53
- CI/CD: GitHub Actions หรือ GitLab CI

## 7. โครงสร้างข้อมูล (Data Model)
### 7.1 Entity สำคัญ
- User: id, name, email, password_hash, role, created_at, updated_at
- Project: id, title, description, start_date, end_date, status, created_by, created_at, updated_at
- ProjectMember: id, project_id, user_id, joined_at, role
- Task: id, project_id, title, description, status, priority, assignee_id, due_date, created_at, updated_at
- Comment: id, task_id, user_id, content, created_at
- Attachment: id, task_id, filename, url, size, created_at
- Notification: id, user_id, type, message, is_read, created_at

### 7.2 ความสัมพันธ์หลัก
- User 1:N ProjectMember
- Project 1:N Task
- Task 1:N Comment
- Task 1:N Attachment
- User 1:N Notification

## 8. การแจกจ่ายระบบ (Deployment Architecture)
- โฮสต์ frontend เป็น static site บน CDN
- Backend API รันบน container/VM หรือ serverless
- Database รันบน managed service เช่น RDS
- แยก environment เป็น Development, Staging, Production
- ใช้ HTTPS/TLS สำหรับทุกการสื่อสาร

## 9. ความปลอดภัยและคุณภาพ
- เข้ารหัสการสื่อสารผ่าน HTTPS
- เก็บรหัสผ่านด้วย hashing ที่ปลอดภัย (เช่น bcrypt)
- ป้องกัน OWASP Top 10: SQL Injection, XSS, CSRF, Authentication flaws
- ตรวจสอบสิทธิ์ทุก API endpoint
- บันทึก event สำคัญและ audit logs

## 10. ข้อกำหนดที่ไม่ใช่ฟังก์ชัน (Non-functional)
- Performance: โหลดหน้าไม่เกิน 2 วินาทีในสภาวะปกติ
- Scalability: รองรับผู้ใช้พร้อมกันอย่างน้อย 1,000 คน
- Availability: Uptime >= 99.9%
- Maintainability: โค้ดต้องแยกเป็นโมดูลและทดสอบได้ง่าย
- Backup: สำรองข้อมูลฐานข้อมูลทุกวันและเก็บไว้อย่างน้อย 30 วัน

## 11. สรุป
สถาปัตยกรรมนี้ออกแบบมาเพื่อให้ระบบเป็นเว็บแอปที่รองรับทั้งมือถือและ PC โดยแบ่งชั้นงานอย่างชัดเจน ระหว่าง UI, API, และข้อมูล เพื่อเพิ่มความสามารถในการขยายตัวและความปลอดภัยของระบบ
