# Swagger/OpenAPI Documentation Setup Guide

## 📋 ภาพรวม

เอกสารประเภท OpenAPI/Swagger ได้สร้างขึ้นแล้ว (`swagger.yaml`) เพื่อเอกสารประกอบ Fire Alert System API

## 🚀 การติดตั้ง Swagger UI

### วิธีที่ 1: ใช้ CDN (ง่ายที่สุด - ไม่ต้องติดตั้งแพ็คเจจ)

1. สร้างไฟล์ `pages/api-docs.js`:

```javascript
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Fire Alert System API Docs</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui.js"></script>
        <script>
          SwaggerUIBundle({
            url: '/swagger.yaml',
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIBundle.SwaggerUIStandalonePreset
            ],
            layout: "StandaloneLayout"
          })
        </script>
      </body>
    </html>
  `);
  res.end();
}
```

2. วาง `swagger.yaml` ในโฟลเดอร์ `public/` หรือใช้ endpoint API:

```javascript
// pages/swagger-yaml.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'swagger.yaml');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  res.setHeader('Content-Type', 'application/yaml');
  res.write(fileContent);
  res.end();
}
```

3. เปิด: `http://localhost:3000/api-docs`

### วิธีที่ 2: ใช้ NPM Package (แนะนำ)

1. ติดตั้งแพ็คเจจ:
```bash
npm install swagger-ui-react swagger-ui-dist
```

2. สร้างไฟล์ `pages/docs.js`:

```javascript
import dynamic from 'next/dynamic';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
import 'swagger-ui-react/swagger-ui.css';

export default function DocsPage() {
  return (
    <div style={{ padding: '20px' }}>
      <SwaggerUI url="/swagger.yaml" />
    </div>
  );
}
```

3. เปิด: `http://localhost:3000/docs`

### วิธีที่ 3: ให้บริการ Swagger YAML เป็น Endpoint API

1. สร้างไฟล์ `pages/api/swagger.js`:

```javascript
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'swagger.yaml');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  try {
    const spec = yaml.load(fileContent);
    res.status(200).json(spec);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse swagger spec' });
  }
}
```

2. ติดตั้ง yaml parser:
```bash
npm install js-yaml
```

## 📍 ตำแหน่งไฟล์

```
Backend/
  swagger.yaml          # ← เอกสาร OpenAPI Specification
  pages/
    api/
      alerts/
        index.js        # GET/POST /api/alerts
        [id].js         # GET /api/alerts/{id}
      status.js         # GET /api/status
```

## ✅ การตรวจสอบ

1. ตรวจสอบไฟล์ YAML:
   - ใช้ [Online YAML Validator](https://www.yamllint.com/)
   - หรือใช้ Swagger Editor: https://editor.swagger.io/

2. โหลด `swagger.yaml` ลงใน Swagger Editor เพื่อทดสอบ

## 🔗 Endpoints ในเอกสาร

- **GET** `/alerts` - ดึงรายการการแจ้งเตือนทั้งหมด
- **POST** `/alerts` - สร้างการแจ้งเตือนใหม่
- **GET** `/alerts/{id}` - ดึงการแจ้งเตือนตามไอดี
- **GET** `/status` - ดึงสถานะระบบ

## 💡 เคล็ดลับ

- ฟีเจอร์ "Try it out" ช่วยให้ทดสอบ API โดยตรงจากเอกสาร
- Swagger Codegen สามารถสร้างคลায়েนต์ SDK จากเอกสารนี้
- ใช้ Schema ที่ประกาศไว้เพื่อความสามารถในการใช้ซ้ำและการบำรุงรักษา

## 📚 อ่านเพิ่มเติม

- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.0)
- [Swagger/OpenAPI Documentation](https://swagger.io/docs/)
- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
