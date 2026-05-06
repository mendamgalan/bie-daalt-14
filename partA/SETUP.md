# А хэсэг — Setup

## Сонгосон API

**Хувилбар 3 — Өөрийн Express сервер**

### API товч тайлбар

Books API — номын сан удирдах жижиг REST API. CRUD үйлдэл бүхий 5 endpoint, body validation, 404/400 алдааны зохицуулалт.

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method | Path | Тайлбар |
|--------|------|---------|
| GET | /books | Бүх ном |
| GET | /books/:id | Нэг ном (404 буцаана) |
| POST | /books | Шинэ ном (400 — дутуу талбар) |
| PUT | /books/:id | Шинэчлэх |
| DELETE | /books/:id | Устгах (204) |
| GET | /health | Health check |

### Authentication

Байхгүй — энгийн нээлттэй API

### Rate limit

Байхгүй (local server)

### Тестийн орчин

- **dev**: `http://localhost:3000` — local-д Node.js сервер ажиллуулж тестлэнэ
- **staging**: `http://localhost:3000` — (dev-тэй ижил, тусдаа орчин)
- **prod**: `http://localhost:3000` — (placeholder)
