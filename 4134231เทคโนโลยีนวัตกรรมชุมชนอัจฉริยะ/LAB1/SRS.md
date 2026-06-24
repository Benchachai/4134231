# Software Requirements Specification (SRS)
## โครงการ: ระบบบริหารจัดการงานและโครงการ (Project & Task Management System)
**เวอร์ชัน:** 1.0.0  
**วันที่:** 24 มิถุนายน 2026  
**สถานะ:** ร่าง (Draft)  

---

## 1. บทนำ (Introduction)

### 1.1 วัตถุประสงค์ (Purpose)
เอกสารฉบับนี้จัดทำขึ้นเพื่อระบุข้อกำหนดความต้องการทางซอฟต์แวร์ (SRS) ของระบบบริหารจัดการงานและโครงการ (Project & Task Management System) โดยมีวัตถุประสงค์เพื่อให้ทีมพัฒนา ทีมทดสอบ และผู้มีส่วนเกี่ยวข้องทุกฝ่ายมีความเข้าใจที่ตรงกันเกี่ยวกับฟังก์ชันการทำงาน ขอบเขต และข้อจำกัดของระบบ

### 1.2 ขอบเขตของระบบ (Scope)
ระบบนี้เป็นเว็บแอปพลิเคชันและโมบายแอปพลิเคชันที่ช่วยให้องค์กรหรือทีมงานสามารถวางแผน ติดตาม และบริหารจัดการงาน (Tasks) ภายในโครงการ (Projects) ได้อย่างมีประสิทธิภาพ โดยมีฟังก์ชันหลัก ได้แก่:
* ระบบจัดการผู้ใช้งานและสิทธิ์ (Authentication & Authorization)
* ระบบจัดการบอร์ดโครงการ (Project Board) และ Kanban Board
* ระบบมอบหมายงานและติดตามสถานะ (Task Assignment & Tracking)
* ระบบแจ้งเตือน (Notifications)
* ระบบรายงานและแดชบอร์ดสรุปผล (Reporting & Dashboard)

### 1.3 คำนิยามและคำย่อ (Definitions and Acronyms)
* **SRS:** Software Requirements Specification
* **Admin:** ผู้ดูแลระบบที่มีสิทธิ์สูงสุดในการจัดการระบบ
* **Project Manager (PM):** ผู้จัดการโครงการที่มีสิทธิ์สร้างโครงการและมอบหมายงาน
* **Member:** สมาชิกในทีมที่มีสิทธิ์เข้าถึงและอัปเดตงานที่ได้รับมอบหมาย
* **Kanban:** รูปแบบการบริหารจัดการงานด้วยบอร์ดสไตล์คอลัมน์ (To Do, In Progress, Done)

---

## 2. คำอธิบายภาพรวม (Overall Description)

### 2.1 ภาพรวมของระบบ (Product Perspective)
ระบบนี้จะทำงานในรูปแบบ Cloud-based Application รองรับการเข้าใช้งานผ่าน Web Browser (Responsive Design) และ Mobile Application (iOS/Android) โดยมีการเชื่อมต่อกับฐานข้อมูลส่วนกลางและระบบบริการส่งอีเมล/การแจ้งเตือนภายนอก

### 2.2 ฟังก์ชันการทำงานของระบบ (Product Functions)
1.  **User Management:** สมัครสมาชิก, เข้าสู่ระบบ, จัดการโปรไฟล์, กำหนดสิทธิ์ใช้งาน (RBAC)
2.  **Project Management:** สร้าง, แก้ไข, ลบโครงการ, เพิ่มสมาชิกเข้าโครงการ
3.  **Task Management:** สร้างงาน, กำหนดความสำคัญ (Priority), กำหนดวันส่ง (Due Date), แนบไฟล์, แสดงความคิดเห็น (Comments)
4.  **Collaboration:** บอร์ดคัมบัง (Kanban Board), รายการงาน (List View), ปฏิทินงาน (Calendar View)
5.  **Notification System:** แจ้งเตือนผ่านระบบ (In-app) และทางอีเมลเมื่อมีการมอบหมายงานหรืออัปเดตสถานะ

### 2.3 ลักษณะของผู้ใช้งาน (User Characteristics)
* **Administrators:** ดูแลโครงสร้างระบบ จัดการผู้ใช้ทั้งหมด และดู Log การใช้งาน
* **Project Managers:** สร้างโปรเจกต์ ควบคุมภาพรวม มอบหมายงาน และดูรายงานแดชบอร์ด
* **Team Members:** อัปเดตสถานะงานของตนเอง ส่งงาน และสื่อสารในช่องความคิดเห็น

### 2.4 ข้อจำกัด (Constraints)
* ระบบต้องรองรับกฎหมายคุ้มครองข้อมูลส่วนบุคคล (PDPA / GDPR)
* การแสดงผลบนเว็บเบราว์เซอร์ต้องรองรับ Chrome, Safari, Edge และ Firefox เวอร์ชันล่าสุด
* ระบบต้องทำงานได้ตลอด 24 ชั่วโมง โดยมี Downtime สำหรับการบำรุงรักษาไม่เกิน 0.1% ต่อปี

---

## 3. ข้อกำหนดด้านฟังก์ชันการทำงาน (Functional Requirements)

### 3.1 ระบบจัดการผู้ใช้งาน (User Management)
* **FR-1.1:** ระบบต้องรองรับการเข้าสู่ระบบด้วย อีเมล/รหัสผ่าน และ Single Sign-On (SSO) เช่น Google, Microsoft
* **FR-1.2:** ระบบต้องมีการเข้ารหัสรหัสผ่าน (Hashing) ก่อนบันทึกลงฐานข้อมูลด้วยอัลกอริทึมที่ปลอดภัย (เช่น bcrypt)
* **FR-1.3:** ระบบต้องสามารถแยกสิทธิ์ผู้ใช้งาน (Role-Based Access Control) เป็น Admin, PM, และ Member ได้

### 3.2 ระบบจัดการโครงการ (Project Management)
* **FR-2.1:** ผู้จัดการโครงการ (PM) ต้องสามารถสร้างโครงการใหม่ โดยระบุ ชื่อโครงการ, คำอธิบาย, วันเริ่มต้น และวันสิ้นสุดได้
* **FR-2.2:** PM ต้องสามารถเชิญสมาชิก (Members) เข้ามาร่วมในโครงการผ่านการค้นหาอีเมลได้
* **FR-2.3:** สมาชิกในโครงการต้องสามารถดูภาพรวมของโครงการที่ตนเองสังกัดอยู่ได้เท่านั้น

### 3.3 ระบบจัดการงาน (Task Management)
* **FR-3.1:** ผู้ใช้ต้องสามารถสร้างงาน (Task) ภายใต้โครงการ โดยระบุ หัวขื้องาน, รายละเอียด, ผู้รับผิดชอบ (Assignee), และวันครบกำหนด (Due Date)
* **FR-3.2:** ระบบต้องรองรับการลากวาง (Drag and Drop) การ์ดงานบน Kanban Board เพื่อเปลี่ยนสถานะ (เช่น To Do -> In Progress -> Done)
* **FR-3.3:** ผู้ใช้ต้องสามารถพิมพ์ข้อความแสดงความคิดเห็น (Comment) และแนบไฟล์ (ขนาดไม่เกิน 10MB) ในแต่ละงานได้

### 3.4 ระบบรายงานและแดชบอร์ด (Dashboard & Reporting)
* **FR-4.1:** ระบบต้องแสดงกราฟวงกลม (Pie Chart) หรือกราฟแท่งสรุปสัดส่วนสถานะของงานในโครงการ
* **FR-4.2:** PM ต้องสามารถส่งออก (Export) รายงานสรุปความคืบหน้าของโครงการออกมาเป็นไฟล์ PDF หรือ Excel ได้

---

## 4. ข้อกำหนดที่ไม่ใช่ฟังก์ชันการทำงาน (Non-Functional Requirements)

### 4.1 ด้านประสิทธิภาพ (Performance)
* **NFR-1.1:** หน้าจอระบบต้องใช้เวลาโหลด (Response Time) ไม่เกิน 2 วินาทีในสภาวะการใช้งานปกติ
* **NFR-1.2:** ระบบต้องรองรับผู้ใช้งานพร้อมกัน (Concurrent Users) ได้อย่างน้อย 1,000 ผู้ใช้งานพร้อมกันโดยไม่มีการหน่วงอย่างรุนแรง

### 4.2 ด้านความปลอดภัย (Security)
* **NFR-2.1:** ข้อมูลทั้งหมดที่รับส่งระหว่างไคลเอนต์และเซิร์ฟเวอร์ต้องเข้ารหัสผ่านโปรโตคอล HTTPS (TLS 1.3)
* **NFR-2.2:** ระบบต้องมีมาตรการป้องกันช่องโหว่พื้นฐานตามมาตรฐาน OWASP Top 10 (เช่น SQL Injection, Cross-Site Scripting - XSS)

### 4.3 ด้านความพร้อมใช้งาน (Availability & Reliability)
* **NFR-3.1:** ระบบต้องมีค่าความพร้อมใช้งาน (Uptime) ไม่ต่ำกว่า 99.9%
* **NFR-3.2:** มีระบบสำรองข้อมูล (Automated Backup) ทุกวันในเวลา 02:00 น. และเก็บข้อมูลย้อนหลังไว้อย่างน้อย 30 วัน

---

## 5. แผนภาพสถาปัตยกรรมและโมเดลข้อมูล (Architecture & Data Model)

### 5.1 เทคโนโลยีที่เลือกใช้ (Tech Stack Example)
* **Frontend:** React.js / Tailwind CSS / TypeScript
* **Backend:** Node.js (Express) / NestJS
* **Database:** PostgreSQL (Relational Data) & Redis (Caching)
* **Infrastructure:** AWS (EC2, S3, RDS)

### 5.2 โครงสร้างข้อมูลพื้นฐาน (Entity Relationship Diagram - Concept)
* **User:** id, name, email, password_hash, role, created_at
* **Project:** id, title, description, start_date, end_date, status, created_by
* **Project_Member:** project_id, user_id, joined_at
* **Task:** id, project_id, title, description, status, priority, assignee_id, due_date, created_at