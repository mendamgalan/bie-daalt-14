# Бие даалт 14 — Books API Testing

F.CSM311 | Хувилбар 3 — Өөрийн Express сервер + Newman CI

## Хэрэгсэл

- Node.js 20+
- Newman (`npm install -g newman newman-reporter-htmlextra`)
- Postman Desktop (UI-аар харахад)

## Ажиллуулах заавар

### 1. Server эхлүүлэх

```bash
cd server
npm install
node index.js
# → Books API running on port 3000
```

### 2. Newman-аар тест ажиллуулах

```bash
# CLI тест
newman run postman/collection.json -e postman/env.dev.json

# HTML report-тай
newman run postman/collection.json \
  -e postman/env.dev.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export reports/api.html
```

### 3. Postman UI-д импортлох

1. Postman нээх
2. **Import** → `postman/collection.json`
3. **Import** → `postman/env.dev.json`
4. Environment-ийг **dev** болгох
5. Collection ажиллуулах

## Endpoint жишээ

```bash
curl http://localhost:3000/books
curl http://localhost:3000/books/1
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","author":"Me"}'
curl -X DELETE http://localhost:3000/books/1
```

## Тестийн бүтэц

| Хэсэг | Тоо |
|-------|-----|
| Request | 8 |
| Assertions | 15+ |
| Assertion төрөл | 5+ |
| Negative test | 3 |
| Pre-request script | 2 |

## Secrets

Энэ API-д token/secret байхгүй. Бодит token шаардлагатай тохиолдолд `env.dev.json`-д `REPLACE_THIS` placeholder ашиглана.
