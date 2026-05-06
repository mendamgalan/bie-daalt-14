# REFLECTION — Бие даалт 14

## 1. Хамгийн үнэ цэнэтэй assertion

Хамгийн их үнэ цэнэтэй assertion бол **schema / property шалгах тест** байсан. Status code 200 буцааж байгаа нь API "амьд" гэдгийг л хэлдэг, гэхдээ response-ийн дотор `id`, `title`, `author`, `available` зэрэг талбарууд бүгд байгаа эсэхийг шалгаснаар API-ийн **контракт** баталгаажна. Жишээлбэл, хэрэв сервер дотор `available` талбарын нэрийг `isAvailable` болгон өөрчлөвөл status нь 200 хэвээр байх боловч schema тест шууд fail болж, клиент хэсэг эвдрэх аюулыг тэр даруйд мэдэгдэнэ. Энэ нь тестийг "API ажиллаж байна" гэдгийг шалгахаас "API зөв ажиллаж байна" гэдгийг шалгах түвшинд гаргадаг.

## 2. Negative test — дэлгэрэнгүй

**Жишээ 1: POST /books — дутуу body (400)**

`title` болон `author` хоёрыг хасаж, зөвхөн `{"year": 2024}` явуулсан. Энэ тест нь сервер **body validation** хийж байгаа эсэхийг шалгана. Хэрэв validation байхгүй бол сервер `title: undefined` бүхий хог өгөгдлийг database-д хийж болно. Тест нь `error` талбар байгаа эсэх, мөн `"required"` гэсэн үг агуулж байгаа эсэхийг шалгасан — ингэснээр алдааны мессеж нь developer-т утга учиртай байна.

**Жишээ 2: GET /books/999999 — (404)**

Огт байхгүй id-г хайхад сервер 404 буцаах ёстой. Энэ тест нь "олдохгүй тохиолдол" буюу happy path-аас гадуурх зам ч бас баталгаажсан contract гэдгийг харуулна. 200 буцаавал клиент `null` дээр `.title` уншихыг оролдоод крэш болно.

## 3. Postman-д ажиллаж, Newman-д fail болсон уу?

Тийм — `firstBookId` хувьсагч chain-д асуудал гарсан. Postman UI-д request-үүд дараалан ажилласнаар хувьсагч environment-д хадгалагддаг байсан. Newman-д анх `env.ci.json`-д `firstBookId`-г тодорхойлоогүй учир `{{firstBookId}}` нь `undefined` болж, `GET /books/undefined` гэсэн URL үүсч 404 буцаасан. Засвар нь `env.ci.json`-д `"firstBookId": "1"` default утга тавих байсан. Энэ туршлага нь "Postman дахь environment variable бол Newman-д заавал тодорхой байх ёстой" гэсэн чухал сургамж өгсөн.

## 4. Token / Secret зохицуулалт

Энэ API-д authentication байхгүй тул token шаардаагүй. Гэхдээ token шаардагдах тохиолдолд:

- `env.dev.json`-д `"token": "REPLACE_THIS"` гэж placeholder тавьж, README-д "REPLACE_THIS утгыг өөрийн token-оор солино уу" гэж бичнэ
- `.gitignore`-д бодит token бүхий файл оруулна
- GitHub Actions-д `secrets.API_TOKEN` ашиглаж, workflow-д `echo "token=${{ secrets.API_TOKEN }}" >> env.ci.json` гэж динамик орлуулга хийнэ
- Хэзээ ч `.env` эсвэл env JSON-д бодит token-г commit хийхгүй

## 5. API өөрчлөгдөх үед хамгийн их эвдрэх хэсэг

**Хамгийн эмзэг газар: Schema / property assertion-ууд.** Хэрэв API-ийн response structure өөрчлөгдвөл (жишээ нь `data` array нь `books` болох, эсвэл `author` нь `{ name, birthYear }` object болох) бүх schema тест нэгэн зэрэг fail болно. Энэ нь "эмзэг газар" гэдэг нь API-ийн contract-ийн хатуу хэсэг тул заавал зөв байх ёстой.

**Бууруулах арга:**
1. Schema validation-д `pm.expect(d).to.have.property('author')` гэхийн оронд `Ajv` зэрэг JSON Schema validator ашиглах — нэг schema тодорхойлолт бүх request-д хамааран fail болох точкийг нэг газарт төвлөрүүлнэ
2. Тестийн `describe` / folder-ийг endpoint-аар бус **feature-аар** бүлэглэх — endpoint өөрчлөгдвөл нэг folder л засна
3. `baseUrl` шиг `apiVersion` хувьсагч нэмж `/v2/books` шилжилтийг environment-д тохируулна
