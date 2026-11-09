const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Ensure data folder exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'database.sqlite');
const db = new DatabaseSync(dbPath);

// Enable WAL mode and foreign keys for high performance
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
function initDatabase() {
  // Admins table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Drones table
  db.exec(`
    CREATE TABLE IF NOT EXISTS drones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      sold_to TEXT,
      not_sold_to TEXT,
      info TEXT,
      img TEXT NOT NULL,
      tech_specs TEXT,      -- JSON string array
      weapons_title TEXT,
      weapons TEXT,         -- JSON string array
      weapons_note TEXT,
      sensors TEXT,         -- JSON string array
      order_num INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Contact requests / messages
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Site settings (contacts, title, etc)
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // Seed default admin if not exists
  const checkAdmin = db.prepare('SELECT id FROM admins WHERE username = ?');
  const existingAdmin = checkAdmin.get('admin');
  if (!existingAdmin) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin123', salt);
    const insertAdmin = db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)');
    insertAdmin.run('admin', hash);
    console.log('[DB] Sukut bo\'yicha admin yaratildi: login: admin, parol: admin123');
  }

  // Seed default settings
  const defaultSettings = [
    { key: 'phone1', value: '+998 88 727 92 07' },
    { key: 'phone2', value: '+998 99 727 92 07' },
    { key: 'telegram', value: '@General9512' },
    { key: 'work_hours', value: 'Dushanba - Shanba, 09:00 - 18:00' },
    { key: 'site_title', value: 'AERODRONE - Kelajakning Jangovar Dronlari' }
  ];

  const checkSetting = db.prepare('SELECT key FROM settings WHERE key = ?');
  const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
  for (const s of defaultSettings) {
    if (!checkSetting.get(s.key)) {
      insertSetting.run(s.key, s.value);
    }
  }

  // Seed initial 15 drones if table is empty
  const droneCount = db.prepare('SELECT COUNT(*) as count FROM drones').get();
  if (droneCount.count === 0) {
    seedInitialDrones();
  }
}

function seedInitialDrones() {
  const initialDrones = [
    { 
      name: "Bayraktar TB2 (Turkiya)", price: "$5,000,000", 
      sold_to: "Do'st va strategik hamkor davlatlar", not_sold_to: "Terroristik va xavfli guruhlar", 
      info: "Dunyodagi eng samarali taktik dronlardan biri. Zamonaviy to'qnashuvlarda o'zining mutlaq ustunligini ko'p marta isbotlagan.", 
      img: "assets/drone2.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 6.5 metr", "<b>Qanot kengligi:</b> 12 metr", "<b>Og'irligi (maks):</b> ~650 kg",
        "<b>Foydali yuk (payload):</b> ~150 kg", "<b>Dvigatel:</b> 1 dona pistonli dvigatel",
        "<b>Maksimal tezligi:</b> ~220 km/soat", "<b>Kruiz tezligi:</b> ~130 km/soat",
        "<b>Uchish balandligi:</b> 7 300 metr (maks)", "<b>Parvoz davomiyligi:</b> 24–27 soat",
        "<b>Parvoz masofasi:</b> ~150–300 km (aloqa orqali)"
      ]),
      weapons_title: "Bayraktar TB2 quyidagi yuqori aniqlikdagi o'q-dorilarni olib yuradi:",
      weapons: JSON.stringify([
        "<b>MAM-L</b> (lazer bilan boshqariladigan bomba)",
        "<b>MAM-C</b> (yengil zarba beruvchi bomba)"
      ]),
      weapons_note: "👉 Bu qurollar Roketsan tomonidan ishlab chiqariladi.",
      sensors: JSON.stringify([
        "Elektro-optik kamera (kunduzgi kuzatuv)", "Infraqizil kamera (tungi kuzatuv)",
        "Lazer nishonga olish tizimi", "Real vaqt video uzatish", "Avtopilot va GPS navigatsiya"
      ]),
      order_num: 1
    },
    { 
      name: "MQ-9 Reaper (AQSh)", price: "$32,000,000", 
      sold_to: "NATO va asosiy ittifoqchilar", not_sold_to: "Sanksiyadagi barcha davlatlar", 
      info: "Dunyodagi eng mashhur va kuchli zarba beruvchi strategik dronlardan biri. O'ta yuqori aniqlikdagi raketalar bilan qurilgan.", 
      img: "assets/drone1.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 11 metr", "<b>Qanot kengligi:</b> 20 metr", "<b>Og'irligi (maks):</b> 4 760 kg",
        "<b>Foydali yuk:</b> 1 700 kg", "<b>Dvigatel:</b> Honeywell TPE331-10",
        "<b>Maksimal tezligi:</b> ~482 km/soat", "<b>Kruiz tezligi:</b> ~313 km/soat",
        "<b>Uchish balandligi:</b> 15 240 metr", "<b>Parvoz davomiyligi:</b> 27 soatgacha",
        "<b>Parvoz masofasi:</b> 1 900 km"
      ]),
      weapons_title: "Asosiy zarba beruvchi qurollari:",
      weapons: JSON.stringify([
        "<b>AGM-114 Hellfire</b> (havo-yer tipidagi raketalar)",
        "<b>GBU-12 Paveway II</b> (lazerli bombalar)", "<b>GBU-38 JDAM</b>"
      ]),
      weapons_note: "👉 NATO standartlariga javob beruvchi barcha bombalarni tashiy oladi.",
      sensors: JSON.stringify([
        "AN/DAS-1 MTS-B ko'p sensorli kuzatish tizimi", "Sintetik aperturali radar (SAR)",
        "Rangli va monoxrom TV kameralar", "Lazer diapazoni topuvchi va nishonlovchi"
      ]),
      order_num: 2
    },
    { 
      name: "Akinci (Turkiya)", price: "$30,000,000", 
      sold_to: "Yaqin ittifoqchilar va ruxsat berilganlar", not_sold_to: "Sanksiyadagilar va mojaroli hududlar", 
      info: "Bayraktar kompaniyasining eng og'ir va aqlli zarbdor (HALE) droni. Qanotli raketalar olib yurish imkoniyatiga ega.", 
      img: "assets/drone5.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 12.2 metr", "<b>Qanot kengligi:</b> 20 metr", "<b>Og'irligi (maks):</b> 6 000 kg",
        "<b>Foydali yuk:</b> 1 500 kg (ichki / tashqi)", "<b>Dvigatel:</b> 2 ta turboprop",
        "<b>Maksimal tezligi:</b> 361 km/soat", "<b>Kruiz tezligi:</b> 240 km/soat",
        "<b>Uchish balandligi:</b> 12 192 metr", "<b>Parvoz davomiyligi:</b> 24 soat+"
      ]),
      weapons_title: "Keng qamrovli va massiv hujum qurollari:",
      weapons: JSON.stringify([
        "<b>SOM Qanotli Raketasi</b> (uzoq masofali qiruvchi)",
        "<b>MAM-T, MAM-L, MAM-C</b> o'q-dorilari", "<b>Gokdogan va Bozdogan</b> (havo-havo)"
      ]),
      weapons_note: "👉 Turkiyada ishlab chiqarilgan eng aqlli o'q-dorilar to'plami.",
      sensors: JSON.stringify([
        "AESA Radari (sun'iy intellekt qo'llab quvvatlovchi)", "SUN'IY INTELLEKT (AI) avtopilot kompyuteri",
        "Elektron jang (EW) pod moduli", "Sintetik diapazonli va sun'iy yo'ldosh aloqasi"
      ]),
      order_num: 3
    },
    { 
      name: "XQ-58 Valkyrie (AQSh)", price: "$3,000,000", 
      sold_to: "Faqat AQSh harbiylari uchun", not_sold_to: "Barcha xalqaro xaridorlarga", 
      info: "Ko'rinmas (Stealth) texnologiyasi asosida yasalgan qiruvchi samolyotlarga hamroh 'aqlli guruh' vazifasiga mo'ljallangan reaktiv dron.", 
      img: "assets/drone3.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 9.1 metr", "<b>Qanot kengligi:</b> 8.2 metr", "<b>Og'irligi (maks):</b> 2 720 kg",
        "<b>Foydali yuk (ichki):</b> 544 kg", "<b>Dvigatel:</b> Turbofan dvigateli",
        "<b>Maksimal tezligi:</b> Mach 0.85 (1 050 km/soat)", "<b>Kruiz tezligi:</b> Mach 0.72",
        "<b>Uchish balandligi:</b> 13 700 metr", "<b>Parvoz masofasi:</b> ~3 940 km"
      ]),
      weapons_title: "Ichki yashirin kameradagi qurollar:",
      weapons: JSON.stringify([
        "<b>JDAM nomli aniq bombalar</b>", "<b>SDB (Kichik diametrli bombalar)</b>"
      ]),
      weapons_note: "👉 Qurollarni faqat yashirin hududda (Stealth buzilmasligi uchun) olib yuradi.",
      sensors: JSON.stringify([
        "Sun'iy Intellekt asosli tarmoq jangi", "F-35 va F-22 qiruvchilar bilan bevosita sinxronizatsiya",
        "Yashirin (Stealth) qoplamalar bilan jihozlangan"
      ]),
      order_num: 4
    },
    { 
      name: "S-70 Okhotnik (Rossiya)", price: "$20,000,000+", 
      sold_to: "Faqat Rossiya armiyasi", not_sold_to: "Xalqaro eksport to'xtatilgan", 
      info: "O'ta og'ir va ko'rinmas (Stealth) dizayndagi UCAV dron. Asosan Su-57 samolyotiga hamroh bo'lish uchun modellashtirilgan.", 
      img: "assets/drone4.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 14 metr", "<b>Qanot kengligi:</b> ~20 metr", "<b>Og'irligi (maks):</b> 20 000 kg",
        "<b>Foydali yuk:</b> ~2 000 kg", "<b>Dvigatel:</b> AL-41F1 (turbofan)",
        "<b>Maksimal tezligi:</b> 1 000 km/soat", "<b>Uchish balandligi:</b> 18 000 metr",
        "<b>Parvoz masofasi:</b> 6 000 km"
      ]),
      weapons_title: "Asosiy zarba kompleksi (ichki korpusda):",
      weapons: JSON.stringify([
        "<b>Kh-59Mk2 raketalari</b>", "<b>Yuqori aniqlikdagi lazerli bombalar</b>"
      ]),
      weapons_note: "👉 Ko'rinmaslikka moslashib barcha qurol ichkariga yashirilgan.",
      sensors: JSON.stringify([
        "Su-57 bilan axborot ayirboshlash tizimi", "AESA (radiolokatsion stansiya)",
        "Kengaytirilgan optik va radioelektron kuzatuv tizimi"
      ]),
      order_num: 5
    },
    { 
      name: "TAI Anka (Turkiya)", price: "$20,000,000", 
      sold_to: "Turkiya va strategik sheriklar", not_sold_to: "Qora ro'yxatga tushgan dushman davlatlar", 
      info: "O'zining sun'iy yo'ldosh orqali boshqarilishi bilan ajralib turuvchi zamonaviy o'rta balandlikdagi dron.", 
      img: "assets/drone5.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 8.6 metr", "<b>Qanot kengligi:</b> 17.5 metr", "<b>Og'irligi (maks):</b> 1 600 kg",
        "<b>Dvigatel:</b> TEI-PD170", "<b>Maksimal tezligi:</b> 217 km/soat",
        "<b>Uchish balandligi:</b> 9 144 metr", "<b>Parvoz davomiyligi:</b> 30 soat+"
      ]),
      weapons_title: "Anka-B zarba qurollari:",
      weapons: JSON.stringify([
        "<b>Cirit</b> (lazerli raketa)", "<b>MAM-L</b> (zarbdor bomba)"
      ]),
      weapons_note: "👉 Uzoq masofali operatsiyalar uchun mo'ljallangan.",
      sensors: JSON.stringify([
        "SAR/ISAR (radionurli kuzatuv)", "EO/IR kamera tizimi", "Sun'iy yo'ldosh aloqasi (SATCOM)"
      ]),
      order_num: 6
    },
    { 
      name: "Wing Loong II (Xitoy)", price: "$2,000,000", 
      sold_to: "Eksport va keng ommaga ochiq", not_sold_to: "AQSh va Ittifoqchilari", 
      info: "Og'ir va ko'p qurol ko'tara oladigan sifatli jangovar xitoy droni.", 
      img: "assets/drone1.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 11 metr", "<b>Qanot kengligi:</b> 20.5 metr", "<b>Og'irligi (maks):</b> 4 200 kg",
        "<b>Foydali yuk:</b> 480 kg", "<b>Maksimal tezligi:</b> 370 km/soat",
        "<b>Uchish balandligi:</b> 9 000 metr", "<b>Parvoz davomiyligi:</b> 20-32 soat"
      ]),
      weapons_title: "Eksport uchun mo'ljallangan qurollar:",
      weapons: JSON.stringify([
        "<b>AKD-10</b> (havo-yer raketasi)", "<b>LS-6</b> (aniq nishonli bomba)"
      ]),
      weapons_note: "👉 Xalqaro bozorda eng ko'p sotilgan og'ir dronlardan biri.",
      sensors: JSON.stringify([
        "EO/IR nishonga olish tizimi", "Lazer diapazoni topuvchi"
      ]),
      order_num: 7
    },
    { 
      name: "Shahed 129 (Eron)", price: "$3,000,000+", 
      sold_to: "Eron ittifoqchilari", not_sold_to: "G'arb va Isroil doiralari", 
      info: "Eronning eng yirik va uzoqqa uchuvchi zarbdor droni.", 
      img: "assets/drone2.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 8 metr", "<b>Qanot kengligi:</b> 16 metr", "<b>Dvigatel:</b> Rotax 914",
        "<b>Maksimal tezligi:</b> 150 km/soat", "<b>Uchish balandligi:</b> 7 300 metr",
        "<b>Parvoz masofasi:</b> 1 700 km"
      ]),
      weapons_title: "Asosiy qurollari:",
      weapons: JSON.stringify([
        "<b>Sadid-1</b> raketalari", "<b>Sadid-345</b> bombalari"
      ]),
      weapons_note: "👉 Mahalliy imkoniyatlar bilan ishlab chiqilgan eng yaxshi dron.",
      sensors: JSON.stringify([
        "Kuzatuv kamerasi", "Masofadan boshqarish datchiklari"
      ]),
      order_num: 8
    },
    { 
      name: "RQ-4 Global Hawk (AQSh)", price: "$131,000,000", 
      sold_to: "Faqat AQSh va NATO", not_sold_to: "Boshqa davlatlar", 
      info: "Eng qimmat strategik razvedkachi UCAV apparati.", 
      img: "assets/drone3.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 14.5 metr", "<b>Qanot kengligi:</b> 39.9 metr", "<b>Og'irligi (maks):</b> 14 628 kg",
        "<b>Dvigatel:</b> Rolls-Royce F137", "<b>Maksimal tezligi:</b> 629 km/soat",
        "<b>Uchish balandligi:</b> 18 000 metr+", "<b>Parvoz davomiyligi:</b> 32 soat+"
      ]),
      weapons_title: "Asosan razvedka vazifasida:",
      weapons: JSON.stringify([
        "<b>Qurol bilan jihozlanmagan</b> (faqat razvedka)", "<b>Ma'lumot uzatish tizimi</b> (juda qudratli)"
      ]),
      weapons_note: "👉 Uzoq masofali va balandlikdagi strategik ko'z.",
      sensors: JSON.stringify([
        "SAR (sintetik aperturali radar)", "Infraqizil va elektro-optik sensorlar",
        "Axborot yig'ish tizimlari"
      ]),
      order_num: 9
    },
    { 
      name: "CH-4 Rainbow (Xitoy)", price: "$4,000,000", 
      sold_to: "Osiyo va Afrika davlatlari", not_sold_to: "AQSh va G'arb", 
      info: "Xitoyning eng mashhur o'rta balandlikdagi zarbdor droni.", 
      img: "assets/drone4.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 8.5 metr", "<b>Qanot kengligi:</b> 18 metr", "<b>Og'irligi (maks):</b> 1 330 kg",
        "<b>Foydali yuk:</b> 345 kg", "<b>Maksimal tezligi:</b> 235 km/soat",
        "<b>Parvoz davomiyligi:</b> 30-40 soat"
      ]),
      weapons_title: "Zarba berish imkoniyatlari:",
      weapons: JSON.stringify([
        "<b>Lan Jian 7</b> (raketa)", "<b>AR-1</b> (lazerli raketa)"
      ]),
      weapons_note: "👉 Arzon va samarali zarbdor dron hisoblanadi.",
      sensors: JSON.stringify([
        "EO/IR turi kameralar", "Sintez radar tizimi"
      ]),
      order_num: 10
    },
    { 
      name: "Bayraktar TB3 (Turkiya)", price: "$15,000,000", 
      sold_to: "NATO a'zolari va strategik hamkorlar", not_sold_to: "Sanksiyadagi davlatlar", 
      info: "TCG Anadolu kemasi uchun maxsus yaratilgan qisqa uchish-qo'nish yo'lagidan ko'tariladigan zamonaviy dengiz droni. TB2 ning takomillashtirilgan versiyasi.", 
      img: "assets/drone5.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 8.5 metr", "<b>Qanot kengligi:</b> 14 metr", "<b>Og'irligi (maks):</b> 1 450 kg",
        "<b>Foydali yuk:</b> ~280 kg", "<b>Dvigatel:</b> TEI-PD170 turboprop",
        "<b>Maksimal tezligi:</b> ~260 km/soat", "<b>Uchish balandligi:</b> 8 200 metr",
        "<b>Parvoz davomiyligi:</b> 24 soat+", "<b>Buklama qanotlar:</b> Kema hangari uchun moslashtirilgan"
      ]),
      weapons_title: "Dengiz operatsiyalari uchun qurollar:",
      weapons: JSON.stringify([
        "<b>MAM-L</b> (lazerli zarba bomba)", "<b>MAM-T</b> (og'ir zarba qurol)", "<b>TEBER lazerli yo'naltiruvchi</b>"
      ]),
      weapons_note: "👉 Dunyodagi birinchi dron avianosetsidan ko'tarilgan jangovar UAV.",
      sensors: JSON.stringify([
        "CATS multisensor kuzatuv tizimi", "Lazerli va infraqizil nishonga olish",
        "Sun'iy yo'ldosh aloqasi (SATCOM)", "Kema bilan sinxron ma'lumot uzatish"
      ]),
      order_num: 11
    },
    { 
      name: "MQ-1C Gray Eagle (AQSh)", price: "$21,000,000", 
      sold_to: "AQSh qo'shinlari va yaqin ittifoqchilar", not_sold_to: "Raqobatchi davlatlarga", 
      info: "AQSh qo'shin qo'mondonligining asosiy taktik razvedka va zarba droni. Predator seriyasining eng rivojlangan avlodi.", 
      img: "assets/drone1.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 8 metr", "<b>Qanot kengligi:</b> 17 metr", "<b>Og'irligi (maks):</b> 1 633 kg",
        "<b>Foydali yuk:</b> 488 kg", "<b>Dvigatel:</b> Thielert Centurion 1.7",
        "<b>Maksimal tezligi:</b> 280 km/soat", "<b>Uchish balandligi:</b> 8 900 metr",
        "<b>Parvoz davomiyligi:</b> 25 soat+"
      ]),
      weapons_title: "Yuqori aniqlikdagi hujum qurollari:",
      weapons: JSON.stringify([
        "<b>AGM-114 Hellfire</b> raketalari", "<b>GBU-44/B Viper Strike</b> bombalar"
      ]),
      weapons_note: "👉 Harbiy razvedka va zarba operatsiyalari uchun ideal.",
      sensors: JSON.stringify([
        "AN/ZPY-1 STARLite radar", "EO/IR ko'p sensorli kuzatuv tizimi",
        "SIGINT (signal razvedkasi) moduli", "Tarmoqli ma'lumot uzatish tizimi"
      ]),
      order_num: 12
    },
    { 
      name: "Heron TP (Isroil)", price: "$50,000,000+", 
      sold_to: "Isroil va tanlangan ittifoqchilar", not_sold_to: "Dushman davlatlar va raqobatchilar", 
      info: "Isroilning eng katta va eng qudratli strategik razvedka va zarba beruvchi MALE droni. Eitan nomi bilan ham taniladi.", 
      img: "assets/drone2.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 14 metr", "<b>Qanot kengligi:</b> 26 metr", "<b>Og'irligi (maks):</b> 5 670 kg",
        "<b>Foydali yuk:</b> 2 700 kg", "<b>Dvigatel:</b> Pratt & Whitney PT6A-67A (turboprop)",
        "<b>Maksimal tezligi:</b> 370 km/soat", "<b>Uchish balandligi:</b> 13 700 metr",
        "<b>Parvoz davomiyligi:</b> 36 soat+"
      ]),
      weapons_title: "Strategik zarba va razvedka qurollari:",
      weapons: JSON.stringify([
        "<b>Spike raketasi</b> (ko'p maqsadli zarba)", "<b>Lazerli boshqariladigan bombalar</b>",
        "<b>EW (Elektron jang) podalari</b>"
      ]),
      weapons_note: "👉 Isroil mudofaa kuchlarining eng muhim strategik vositasi.",
      sensors: JSON.stringify([
        "EL/M-2055 AESA radari", "MOSP - Ko'p sensorli kuzatuv platformasi",
        "SAR va GMTI radarlar", "COMINT va ELINT razvedka tizimlari"
      ]),
      order_num: 13
    },
    { 
      name: "Kizilelma (Turkiya)", price: "$25,000,000", 
      sold_to: "Turkiya va maxsus ruxsatnoma olganlar", not_sold_to: "Barcha boshqa davlatlarga (hozircha)", 
      info: "Turkiyaning birinchi reaktiv jet dvigatelik qiruvchi droni. 5-avlod samolyotlarga teng keladigan xususiyatlarga ega.", 
      img: "assets/drone3.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 14.7 metr", "<b>Qanot kengligi:</b> 10 metr", "<b>Og'irligi (maks):</b> 6 000 kg",
        "<b>Foydali yuk:</b> 1 500 kg", "<b>Dvigatel:</b> AI-25TLT (turbofan, ishlab chiqarilmoqda)",
        "<b>Maksimal tezligi:</b> Mach 0.9+ (~1 100 km/soat)", "<b>Uchish balandligi:</b> 12 000 metr+",
        "<b>Parvoz masofasi:</b> 930 km (jang radiusi)"
      ]),
      weapons_title: "5-avlod qiruvchiga teng qurollar:",
      weapons: JSON.stringify([
        "<b>Gokdogan</b> (havo-havo raketasi)", "<b>Bozdogan</b> (o'rta masofali havo-havo)",
        "<b>SOM-J</b> (stealth qanotli raketa)", "<b>KGK-83</b> (aniq zarba bombasi)"
      ]),
      weapons_note: "👉 Hali sinov bosqichida. Kelajakning eng kuchli dronlaridan biri bo'lishi kutilmoqda.",
      sensors: JSON.stringify([
        "AESA radari (milliy ishlab chiqarish)", "Sun'iy intellekt bilan avtonomiya",
        "Stealth dizayn va radar yutuvchi materiallar", "TCG Anadoluga qo'nish imkoniyati"
      ]),
      order_num: 14
    },
    { 
      name: "nEUROn (Yevropa)", price: "$35,000,000+", 
      sold_to: "Faqat ishlab chiqaruvchi davlatlar", not_sold_to: "Butun dunyo (eksport qilinmaydi)", 
      info: "Fransiya, Italiya, Ispaniya, Gretsiya, Shveytsariya va Shvetsiya hamkorligida yaratilgan Yevropa uchuvchisiz stealth jangovar samolyoti.", 
      img: "assets/drone4.png",
      tech_specs: JSON.stringify([
        "<b>Uzunligi:</b> 9.5 metr", "<b>Qanot kengligi:</b> 12.5 metr", "<b>Og'irligi (maks):</b> 7 000 kg",
        "<b>Foydali yuk (ichki):</b> 460+ kg", "<b>Dvigatel:</b> Rolls-Royce / Turbomeca Adour (turbofan)",
        "<b>Maksimal tezligi:</b> Mach 0.8 (~980 km/soat)", "<b>Uchish balandligi:</b> 14 000 metr",
        "<b>Parvoz masofasi:</b> 3 700+ km"
      ]),
      weapons_title: "Stealth ichki kameradagi qurollar:",
      weapons: JSON.stringify([
        "<b>AASM (lazerli bomba)</b>", "<b>GBU-12</b> (lazerli yo'naltiriluvchi bomba)",
        "<b>Eksperimental EW modullari</b>"
      ]),
      weapons_note: "👉 Yevropa davlatlarining kelajakdagi 6-avlod havo kuchlarining asosi.",
      sensors: JSON.stringify([
        "Stealth texnologiyali to'liq radar yutuvchi korpus", "Ko'p sensorli sinxron kuzatuv tizimi",
        "Avtonomlik va AI boshqaruv qobiliyati", "EW (elektron jang) imkoniyatlari"
      ]),
      order_num: 15
    }
  ];

  const insertStmt = db.prepare(`
    INSERT INTO drones (
      name, price, sold_to, not_sold_to, info, img,
      tech_specs, weapons_title, weapons, weapons_note, sensors, order_num
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const d of initialDrones) {
    insertStmt.run(
      d.name, d.price, d.sold_to, d.not_sold_to, d.info, d.img,
      d.tech_specs, d.weapons_title, d.weapons, d.weapons_note, d.sensors, d.order_num
    );
  }

  console.log('[DB] Dastlabki 15 ta jangovar dron bazaga muvaffaqiyatli kiritildi!');
}

initDatabase();

module.exports = db;
