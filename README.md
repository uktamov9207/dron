# 🛸 AERODRONE — Kelajakning Jangovar Dronlari & Admin Panel

Jahonning eng ilg'or va qudratli zarbdor hamda razvedkachi harbiy dronlari katalogi, dinamik REST API, ma'lumotlar bazasi va to'liq boshqaruv imkoniyatiga ega bo'lgan zamonaviy **Admin Panel**.

---

## 🌟 Imkoniyatlar

- **Asosiy Web Sayt (Frontend):**
  - Futuristik harbiy qorong'i dizayn, zamonaviy animatsiyalar va maxsus kursor.
  - Jahonning eng qudratli 15 ta jangovar droni katalogi (narxlari, texnik ko'rsatkichlari, qurollanishi, sensorlari).
  - REST API bilan to'liq integratsiya qilingan (agar internet yoki server uzilsa, avtomatik zaxira ma'lumotlar bilan uzluksiz ishlaydi).
  - Foydalanuvchilar uchun tezkor murojaat/ariza yuborish formasi.

- **Boshqaruv Markazi (Admin Panel):**
  - **Avtorizatsiya:** JWT Token va shifrlangan parollar (bcrypt).
  - **Dashboard:** Jami dronlar soni, faol modellar va yangi kelgan arizalar statistikasi.
  - **Dronlar CRUD boshqaruvi:** Yangi dron qo'shish, ma'lumotlarni tahrirlash, o'chirish, tartib raqamini belgilash, qidirish.
  - **Rasm yuklash:** Yangi dronlar uchun rasmlarni to'g'ridan-to'g'ri admin paneldan yuklash (Multer).
  - **Dinamik maydonlar:** Texnik xarakteristikalar, qurollar va sensorlarni dinamik tarzda bir tugma bilan qo'shish/o'chirish.
  - **Murojaatlar (Inbox):** Saytdan yuborilgan ism, telefon raqamlari va izohlarni ko'rish, holatini yangilash va o'chirish.
  - **Sayt kontaktlarini boshqarish:** Telefon raqamlari, Telegram havolasi va ish vaqtlarini admin paneldan turib o'zgartirish.

- **Zero-Setup Ma'lumotlar Bazasi (SQLite):**
  - Alohida PostgreSQL yoki MySQL server o'rnatish **shart emas**.
  - Node.js ichidagi rasmiy yuqori tezlikdagi SQLite moduli orqali ishlaydi.
  - 100% bepul, server resursini deyarli yemaydi va ko'chirish (backup) bitta fayldan iborat.

---

## 🛠 Texnologik Stek

- **Frontend:** HTML5, CSS3 (Glassmorphism & Military Dark UI), JavaScript (ES6+).
- **Backend:** Node.js, Express.js.
- **Ma'lumotlar bazasi:** SQLite (`node:sqlite`).
- **Autentifikatsiya:** JSON Web Token (JWT) & bcryptjs.
- **Fayl boshqaruvi:** Multer.

---

## 🚀 Ishga Tushirish (Local Run)

### 1. Bog'liqliklarni o'rnatish
```bash
npm run postinstall
```
*yoki `backend` papkasiga kirib:*
```bash
cd backend
npm install
```

### 2. Serverni yoqish
```bash
npm start
```

### 3. Brauzerda ochish:
- **Asosiy Web Sayt:** [http://localhost:5000](http://localhost:5000)
- **Admin Panel:** [http://localhost:5000/admin](http://localhost:5000/admin)
- **REST API:** [http://localhost:5000/api/drones](http://localhost:5000/api/drones)

---

## 🔑 Standart Admin Login Ma'lumotlari:

- **Login sahifasi:** `http://localhost:5000/admin/login`
- **Foydalanuvchi nomi:** `admin`
- **Parol:** `admin123`
*(Tizimga kirgach, "Sayt Sozlamalari" bo'limida parolni xohlagan vaqtda o'zgartirishingiz mumkin)*

---

## 🌐 Serverga va Bepul Hostinglarga Joylash (Deploy)

Loyiha arxitekturasi har qanday serverga (masalan **Render.com**, **Railway.app** yoki oddiy **Ubuntu VPS**) hech qanday qiyinchiliksiz bir zumda ulanadi.

### Render.com (Bepul Web Service):
1. Ushbu loyihani GitHub reponingizga yuklang (`git push`).
2. [Render.com](https://render.com) ga kiring va **"New Web Service"** tugmasini bosing.
3. GitHub reponi tanlang:
   - **Root Directory:** bo'sh qoldiring yoki `backend`
   - **Build Command:** `npm run postinstall` (yoki `npm install`)
   - **Start Command:** `npm start`
4. **"Deploy Web Service"** tugmasini bosing. Loyihangiz 2 daqiqada butun dunyoga bepul ishga tushadi!

---

## 📦 GitHub ga Yuklash Buyruqlari

```bash
git init
git add .
git commit -m "feat: complete AERODRONE fullstack project with backend, sqlite and admin panel"
git branch -M main
git remote add origin https://github.com/USERNAME/aerodrone.git
git push -u origin main
```

---

## 👤 Muallif

- **Dasturchi:** Ilhomjon Toshmatov
- **Aloqa:** +998 88 727 92 07 | Telegram: [@General9512](https://t.me/General9512)
- **Yil:** 2026 © Barcha huquqlar himoyalangan.
