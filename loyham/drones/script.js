const dronesData = [
  { 
    name: "Bayraktar TB2 (Turkiya)", price: "$5,000,000", 
    soldTo: "Do'st va strategik hamkor davlatlar", notSoldTo: "Terroristik va xavfli guruhlar", 
    info: "Dunyodagi eng samarali taktik dronlardan biri. Zamonaviy to'qnashuvlarda o'zining mutlaq ustunligini ko'p marta isbotlagan.", 
    img: "assets/drone2.png",
    techSpecs: [
        "<b>Uzunligi:</b> 6.5 metr",
        "<b>Qanot kengligi:</b> 12 metr",
        "<b>Og'irligi (maks):</b> ~650 kg",
        "<b>Foydali yuk (payload):</b> ~150 kg",
        "<b>Dvigatel:</b> 1 dona pistonli dvigatel",
        "<b>Maksimal tezligi:</b> ~220 km/soat",
        "<b>Kruiz tezligi:</b> ~130 km/soat",
        "<b>Uchish balandligi:</b> 7 300 metr (maks)",
        "<b>Parvoz davomiyligi:</b> 24–27 soat",
        "<b>Parvoz masofasi:</b> ~150–300 km (aloqa orqali)"
    ],
    weaponsTitle: "Bayraktar TB2 quyidagi yuqori aniqlikdagi o'q-dorilarni olib yuradi:",
    weapons: [
        "<b>MAM-L</b> (lazer bilan boshqariladigan bomba)",
        "<b>MAM-C</b> (yengil zarba beruvchi bomba)"
    ],
    weaponsNote: "👉 Bu qurollar Roketsan tomonidan ishlab chiqariladi.",
    sensors: [
        "Elektro-optik kamera (kunduzgi kuzatuv)",
        "Infraqizil kamera (tungi kuzatuv)",
        "Lazer nishonga olish tizimi",
        "Real vaqt video uzatish",
        "Avtopilot va GPS navigatsiya"
    ]
  },
  { 
    name: "MQ-9 Reaper (AQSh)", price: "$32,000,000", 
    soldTo: "NATO va asosiy ittifoqchilar", notSoldTo: "Sanksiyadagi barcha davlatlar", 
    info: "Dunyodagi eng mashhur va kuchli zarba beruvchi strategik dronlardan biri. O'ta yuqori aniqlikdagi raketalar bilan qurilgan.", 
    img: "assets/drone1.png",
    techSpecs: [
        "<b>Uzunligi:</b> 11 metr",
        "<b>Qanot kengligi:</b> 20 metr",
        "<b>Og'irligi (maks):</b> 4 760 kg",
        "<b>Foydali yuk:</b> 1 700 kg",
        "<b>Dvigatel:</b> Honeywell TPE331-10",
        "<b>Maksimal tezligi:</b> ~482 km/soat",
        "<b>Kruiz tezligi:</b> ~313 km/soat",
        "<b>Uchish balandligi:</b> 15 240 metr",
        "<b>Parvoz davomiyligi:</b> 27 soatgacha",
        "<b>Parvoz masofasi:</b> 1 900 km"
    ],
    weaponsTitle: "Asosiy zarba beruvchi qurollari:",
    weapons: [
        "<b>AGM-114 Hellfire</b> (havo-yer tipidagi raketalar)",
        "<b>GBU-12 Paveway II</b> (lazerli bombalar)",
        "<b>GBU-38 JDAM</b>"
    ],
    weaponsNote: "👉 NATO standartlariga javob beruvchi barcha bombalarni tashiy oladi.",
    sensors: [
        "AN/DAS-1 MTS-B ko'p sensorli kuzatish tizimi",
        "Sintetik aperturali radar (SAR)",
        "Rangli va monoxrom TV kameralar",
        "Lazer diapazoni topuvchi va nishonlovchi"
    ]
  },
  { 
    name: "Akinci (Turkiya)", price: "$30,000,000", 
    soldTo: "Yaqin ittifoqchilar va ruxsat berilganlar", notSoldTo: "Sanksiyadagilar va mojaroli hududlar", 
    info: "Bayktar kompanasining eng og'ir va aqlli zarbdor (HALE) droni. Qanotli raketalar olib yurish imkoniyatiga ega.", 
    img: "assets/drone5.png",
    techSpecs: [
        "<b>Uzunligi:</b> 12.2 metr",
        "<b>Qanot kengligi:</b> 20 metr",
        "<b>Og'irligi (maks):</b> 6 000 kg",
        "<b>Foydali yuk:</b> 1 500 kg (ichki / tashqi)",
        "<b>Dvigatel:</b> 2 ta turboprop",
        "<b>Maksimal tezligi:</b> 361 km/soat",
        "<b>Kruiz tezligi:</b> 240 km/soat",
        "<b>Uchish balandligi:</b> 12 192 metr",
        "<b>Parvoz davomiyligi:</b> 24 soat+"
    ],
    weaponsTitle: "Keng qamrovli va massiv hujum qurollari:",
    weapons: [
        "<b>SOM Qanotli Raketasi</b> (uzoq masofali qiruvchi)",
        "<b>MAM-T, MAM-L, MAM-C</b> o'q-dorilari",
        "<b>Gokdogan va Bozdogan</b> (havo-havo)"
    ],
    weaponsNote: "👉 Turkiyada ishlab chiqarilgan eng aqlli o'q-dorilar to'plami.",
    sensors: [
        "AESA Radari (sun'iy intellekt qo'llab quvvatlovchi)",
        "SUN'IY INTELLEKT (AI) avtopilot kompyuteri",
        "Elektron jang (EW) pod moduli",
        "Sintetik diapazonli va sun'iy yo'ldosh aloqasi"
    ]
  },
  { 
    name: "XQ-58 Valkyrie (AQSh)", price: "$3,000,000", 
    soldTo: "Faqat AQSh harbiylari uchun", notSoldTo: "Barcha xalqaro xaridorlarga", 
    info: "Ko'rinmas (Stealth) texnologiyasi asosida yasalgan qiruvchi samolyotlarga hamroh 'aqlli guruh' vazifasiga mo'ljallangan reaktiv dron.", 
    img: "assets/drone3.png",
    techSpecs: [
        "<b>Uzunligi:</b> 9.1 metr",
        "<b>Qanot kengligi:</b> 8.2 metr",
        "<b>Og'irligi (maks):</b> 2 720 kg",
        "<b>Foydali yuk (ichki):</b> 544 kg",
        "<b>Dvigatel:</b> Turbofan dvigateli",
        "<b>Maksimal tezligi:</b> Mach 0.85 (1 050 km/soat)",
        "<b>Kruiz tezligi:</b> Mach 0.72",
        "<b>Uchish balandligi:</b> 13 700 metr",
        "<b>Parvoz masofasi:</b> ~3 940 km",
    ],
    weaponsTitle: "Ichki yashirin kameradagi qurollar:",
    weapons: [
        "<b>JDAM nomli aniq bombalar</b>",
        "<b>SDB (Kichik diametrli bombalar)</b>"
    ],
    weaponsNote: "👉 Qurollarni faqat yashirin hududda (Stealth buzilmasligi uchun) olib yuradi.",
    sensors: [
        "Sun'iy Intellekt asosli tarmoq jangi",
        "F-35 va F-22 qiruvchilar bilan bevosita sinxronizatsiya",
        "Yashirin (Stealth) yopilmalar bilan jihozlangan"
    ]
  },
  { 
    name: "S-70 Okhotnik (Rossiya)", price: "$20,000,000+", 
    soldTo: "Faqat Rossiya armiyasi", notSoldTo: "Xalqaro eksport to'xtatilgan", 
    info: "O'ta og'ir va ko'rinmas (Stealth) dizayndagi UCAV dron. Asosan Su-57 samolyotiga hamroh bo'lish uchun modellashtirilgan.", 
    img: "assets/drone4.png",
    techSpecs: [
        "<b>Uzunligi:</b> 14 metr",
        "<b>Qanot kengligi:</b> ~20 metr",
        "<b>Og'irligi (maks):</b> 20 000 kg",
        "<b>Foydali yuk:</b> ~2 000 kg",
        "<b>Dvigatel:</b> AL-41F1 (turbofan)",
        "<b>Maksimal tezligi:</b> 1 000 km/soat",
        "<b>Uchish balandligi:</b> 18 000 metr",
        "<b>Parvoz masofasi:</b> 6 000 km"
    ],
    weaponsTitle: "Asosiy zarba kompleksi (ichki korpusda):",
    weapons: [
        "<b>Kh-59Mk2 raketalari</b>",
        "<b>Yuqori aniqlikdagi lazerli bombalar</b>"
    ],
    weaponsNote: "👉 Ko'rinmaslikka moslashib barcha qurol ichkariga yashirilgan.",
    sensors: [
        "Su-57 bilan axborot ayirboshlash tizimi",
        "AESA (radiolokatsion stansiya)",
        "Kengaytirilgan optik va radioelektrom kuzatuv tizimi"
    ]
  },
  { 
    name: "TAI Anka (Turkiya)", price: "$20,000,000", 
    soldTo: "Turkiya va strategik sheriklar", notSoldTo: "Qora ro'yxatga tushgan dushman davlatlar", 
    info: "O'zining sun'iy yo'ldosh orqali boshqarilishi bilan ajralib turuvchi zamonaviy o'rta balandlikdagi dron.", 
    img: "assets/drone5.png",
    techSpecs: [
        "<b>Uzunligi:</b> 8.6 metr",
        "<b>Qanot kengligi:</b> 17.5 metr",
        "<b>Og'irligi (maks):</b> 1 600 kg",
        "<b>Dvigatel:</b> TEI-PD170",
        "<b>Maksimal tezligi:</b> 217 km/soat",
        "<b>Uchish balandligi:</b> 9 144 metr",
        "<b>Parvoz davomiyligi:</b> 30 soat+"
    ],
    weaponsTitle: "Anka-B zarba qurollari:",
    weapons: [
        "<b>Cirit</b> (lazerli raketa)",
        "<b>MAM-L</b> (zarbdor bomba)"
    ],
    weaponsNote: "👉 Uzoq masofali operatsiyalar uchun mo'ljallangan.",
    sensors: [
        "SAR/ISAR (radionurli kuzatuv)",
        "EO/IR kamera tizimi",
        "Sun'iy yo'ldosh aloqasi (SATCOM)"
    ]
  },
  { 
    name: "Wing Loong II (Xitoy)", price: "$2,000,000", 
    soldTo: "Eksport va keng ommaga ochiq", notSoldTo: "AQSh va Ittifoqchilari", 
    info: "Og'ir va ko'p qurol ko'tara oladigan sifatli jangovar xitoy droni.", 
    img: "assets/drone1.png",
    techSpecs: [
        "<b>Uzunligi:</b> 11 metr",
        "<b>Qanot kengligi:</b> 20.5 metr",
        "<b>Og'irligi (maks):</b> 4 200 kg",
        "<b>Foydali yuk:</b> 480 kg",
        "<b>Maksimal tezligi:</b> 370 km/soat",
        "<b>Uchish balandligi:</b> 9 000 metr",
        "<b>Parvoz davomiyligi:</b> 20-32 soat"
    ],
    weaponsTitle: "Eksport uchun mo'ljallangan qurollar:",
    weapons: [
        "<b>AKD-10</b> (havo-yer raketasi)",
        "<b>LS-6</b> (aniq nishonli bomba)"
    ],
    weaponsNote: "👉 Xalqaro bozorda eng ko'p sotilgan og'ir dronlardan biri.",
    sensors: [
        "EO/IR nishonga olish tizimi",
        "Lazer diapazoni topuvchi"
    ]
  },
  { 
    name: "Shahed 129 (Eron)", price: "$3,000,000+", 
    soldTo: "Eron ittifoqchilari", notSoldTo: "G'arb va Isroil doiralari", 
    info: "Eronning eng yirik va uzoqqa uchuvchi zarbdor droni.", 
    img: "assets/drone2.png",
    techSpecs: [
        "<b>Uzunligi:</b> 8 metr",
        "<b>Qanot kengligi:</b> 16 metr",
        "<b>Dvigatel:</b> Rotax 914",
        "<b>Maksimal tezligi:</b> 150 km/soat",
        "<b>Uchish balandligi:</b> 7 300 metr",
        "<b>Parvoz masofasi:</b> 1 700 km"
    ],
    weaponsTitle: "Asosiy qurollari:",
    weapons: [
        "<b>Sadid-1</b> raketalari",
        "<b>Sadid-345</b> bombalari"
    ],
    weaponsNote: "👉 Mahalliy imkoniyatlar bilan ishlab chiqilgan eng yaxshi dron.",
    sensors: [
        "Kuzatuv kamerasi",
        "Masofadan boshqarish datchiklari"
    ]
  },
  { 
    name: "RQ-4 Global Hawk (AQSh)", price: "$131,000,000", 
    soldTo: "Faqat AQSh va NATO", notSoldTo: "Boshqa davlatlar", 
    info: "Eng qimmat strategik razvedkachi UCAV apparati.", 
    img: "assets/drone3.png",
    techSpecs: [
        "<b>Uzunligi:</b> 14.5 metr",
        "<b>Qanot kengligi:</b> 39.9 metr",
        "<b>Og'irligi (maks):</b> 14 628 kg",
        "<b>Dvigatel:</b> Rolls-Royce F137",
        "<b>Maksimal tezligi:</b> 629 km/soat",
        "<b>Uchish balandligi:</b> 18 000 metr+",
        "<b>Parvoz davomiyligi:</b> 32 soat+"
    ],
    weaponsTitle: "Asosan razvedka vazifasida:",
    weapons: [
        "<b>Qurol bilan jihozlanmagan</b> (faqat razvedka)",
        "<b>Ma'lumot uzatish tizimi</b> (juda qudratli)"
    ],
    weaponsNote: "👉 Uzoq masofali va balandlikdagi strategik ko'z.",
    sensors: [
        "SAR (sintetik aperturali radar)",
        "Infraqizil va elektro-optik sensorlar",
        "Axborot yig'ish tizimlari"
    ]
  },
  { 
    name: "CH-4 Rainbow (Xitoy)", price: "$4,000,000", 
    soldTo: "Osiyo va Afrika davlatlari", notSoldTo: "AQSh va G'arb", 
    info: "Xitoyning eng mashhur o'rta balandlikdagi zarbdor droni.", 
    img: "assets/drone4.png",
    techSpecs: [
        "<b>Uzunligi:</b> 8.5 metr",
        "<b>Qanot kengligi:</b> 18 metr",
        "<b>Og'irligi (maks):</b> 1 330 kg",
        "<b>Foydali yuk:</b> 345 kg",
        "<b>Maksimal tezligi:</b> 235 km/soat",
        "<b>Parvoz davomiyligi:</b> 30-40 soat"
    ],
    weaponsTitle: "Zarba berish imkoniyatlari:",
    weapons: [
        "<b>Lan Jian 7</b> (raketa)",
        "<b>AR-1</b> (lazerli raketa)"
    ],
    weaponsNote: "👉 Arzon va samarali zarbdor dron hisoblanadi.",
    sensors: [
        "EO/IR turi kameralar",
        "Sintez radar tizimi"
    ]
  },
  // === 5 TA YANGI DRON ===
  { 
    name: "Bayraktar TB3 (Turkiya)", price: "$15,000,000", 
    soldTo: "NATO a'zolari va strategik hamkorlar", notSoldTo: "Sanksiyadagi davlatlar", 
    info: "TCG Anadolu kemasi uchun maxsus yaratilgan qisqa uchish-qo'nish yo'lagidan ko'tariladigan zamonaviy dengiz droni. TB2 ning takomillashtirilgan versiyasi.", 
    img: "assets/drone5.png",
    techSpecs: [
        "<b>Uzunligi:</b> 8.5 metr",
        "<b>Qanot kengligi:</b> 14 metr",
        "<b>Og'irligi (maks):</b> 1 450 kg",
        "<b>Foydali yuk:</b> ~280 kg",
        "<b>Dvigatel:</b> TEI-PD170 turboprop",
        "<b>Maksimal tezligi:</b> ~260 km/soat",
        "<b>Uchish balandligi:</b> 8 200 metr",
        "<b>Parvoz davomiyligi:</b> 24 soat+",
        "<b>Buklama qanotlar:</b> Kema hangari uchun moslashtirilgan"
    ],
    weaponsTitle: "Dengiz operatsiyalari uchun qurollar:",
    weapons: [
        "<b>MAM-L</b> (lazerli zarba bomba)",
        "<b>MAM-T</b> (og'ir zarba qurol)",
        "<b>TEBER lazerli yonaltiruvchi</b>"
    ],
    weaponsNote: "👉 Dunyodagi birinchi dron avianosetsidan ko'tarilgan jangovar UAV.",
    sensors: [
        "CATS multisensor kuzatuv tizimi",
        "Lazerli va infraqizil nishonga olish",
        "Sun'iy yo'ldosh aloqasi (SATCOM)",
        "Kema bilan sinxron ma'lumot uzatish"
    ]
  },
  { 
    name: "MQ-1C Gray Eagle (AQSh)", price: "$21,000,000", 
    soldTo: "AQSh qo'shinlari va yaqin ittifoqchilar", notSoldTo: "Raqobatchi davlatlarga", 
    info: "AQSh qo'shin qo'mondonligining asosiy taktik razvedka va zarba droni. Predator seriyasining eng rivojlangan avlodi.", 
    img: "assets/drone1.png",
    techSpecs: [
        "<b>Uzunligi:</b> 8 metr",
        "<b>Qanot kengligi:</b> 17 metr",
        "<b>Og'irligi (maks):</b> 1 633 kg",
        "<b>Foydali yuk:</b> 488 kg",
        "<b>Dvigatel:</b> Thielert Centurion 1.7",
        "<b>Maksimal tezligi:</b> 280 km/soat",
        "<b>Uchish balandligi:</b> 8 900 metr",
        "<b>Parvoz davomiyligi:</b> 25 soat+"
    ],
    weaponsTitle: "Yuqori aniqlikdagi hujum qurollari:",
    weapons: [
        "<b>AGM-114 Hellfire</b> raketalari",
        "<b>GBU-44/B Viper Strike</b> bombalar"
    ],
    weaponsNote: "👉 Harbiy razvedka va zarba operatsiyalari uchun ideal.",
    sensors: [
        "AN/ZPY-1 STARLite radar",
        "EO/IR ko'p sensorli kuzatuv tizimi",
        "SIGINT (signal razvedkasi) moduli",
        "Tarmoqli ma'lumot uzatish tizimi"
    ]
  },
  { 
    name: "Heron TP (Isroil)", price: "$50,000,000+", 
    soldTo: "Isroil va tanlangan ittifoqchilar", notSoldTo: "Dushman davlatlar va raqobatchilar", 
    info: "Isroilning eng katta va eng qudratli strategik razvedka va zarba beruvchi MALE droni. Eitan nomi bilan ham taniladi.", 
    img: "assets/drone2.png",
    techSpecs: [
        "<b>Uzunligi:</b> 14 metr",
        "<b>Qanot kengligi:</b> 26 metr",
        "<b>Og'irligi (maks):</b> 5 670 kg",
        "<b>Foydali yuk:</b> 2 700 kg",
        "<b>Dvigatel:</b> Pratt & Whitney PT6A-67A (turboprop)",
        "<b>Maksimal tezligi:</b> 370 km/soat",
        "<b>Uchish balandligi:</b> 13 700 metr",
        "<b>Parvoz davomiyligi:</b> 36 soat+"
    ],
    weaponsTitle: "Strategik zarba va razvedka qurollari:",
    weapons: [
        "<b>Spike raketasi</b> (ko'p maqsadli zarba)",
        "<b>Lazerli boshqariladigan bombalar</b>",
        "<b>EW (Elektron jang) podalari</b>"
    ],
    weaponsNote: "👉 Isroil mudofaa kuchlarining eng muhim strategik vositasi.",
    sensors: [
        "EL/M-2055 AESA radari",
        "MOSP - Ko'p sensorli kuzatuv platformasi",
        "SAR va GMTI radarlar",
        "COMINT va ELINT razvedka tizimlari"
    ]
  },
  { 
    name: "Kizilelma (Turkiya)", price: "$25,000,000", 
    soldTo: "Turkiya va maxsus ruxsatnoma olganlar", notSoldTo: "Barcha boshqa davlatlarga (hozircha)", 
    info: "Turkiyaning birinchi reaktiv jet dvigatelik qiruvchi droni. 5-avlod samolyotlarga teng keladigan xususiyatlarga ega.", 
    img: "assets/drone3.png",
    techSpecs: [
        "<b>Uzunligi:</b> 14.7 metr",
        "<b>Qanot kengligi:</b> 10 metr",
        "<b>Og'irligi (maks):</b> 6 000 kg",
        "<b>Foydali yuk:</b> 1 500 kg",
        "<b>Dvigatel:</b> AI-25TLT (turbofan, ishlab chiqarilmoqda)",
        "<b>Maksimal tezligi:</b> Mach 0.9+ (~1 100 km/soat)",
        "<b>Uchish balandligi:</b> 12 000 metr+",
        "<b>Parvoz masofasi:</b> 930 km (jang radiusi)"
    ],
    weaponsTitle: "5-avlod qiruvchiga teng qurollar:",
    weapons: [
        "<b>Gokdogan</b> (havo-havo raketasi)",
        "<b>Bozdogan</b> (o'rta masofali havo-havo)",
        "<b>SOM-J</b> (stealth qanotli raketa)",
        "<b>KGK-83</b> (aniq zarba bombasi)"
    ],
    weaponsNote: "👉 Hali sinov bosqichida. Kelajakning eng kuchli dronlaridan biri bo'lishi kutilmoqda.",
    sensors: [
        "AESA radari (milliy ishlab chiqarish)",
        "Sun'iy intellekt bilan avtonomiya",
        "Stealth dizayn va radar yutuvchi materiallar",
        "TCG Anadoluga qo'nish imkoniyati"
    ]
  },
  { 
    name: "nEUROn (Yevropa)", price: "$35,000,000+", 
    soldTo: "Faqat ishlab chiqaruvchi davlatlar", notSoldTo: "Butun dunyo (eksport qilinmaydi)", 
    info: "Fransiya, Italiya, Ispaniya, Gretsiya, Shveytsariya va Shvetsiya hamkorligida yaratilgan Yevropa uchuvchisiz stealth jangovar samolyoti.", 
    img: "assets/drone4.png",
    techSpecs: [
        "<b>Uzunligi:</b> 9.5 metr",
        "<b>Qanot kengligi:</b> 12.5 metr",
        "<b>Og'irligi (maks):</b> 7 000 kg",
        "<b>Foydali yuk (ichki):</b> 460+ kg",
        "<b>Dvigatel:</b> Rolls-Royce / Turbomeca Adour (turbofan)",
        "<b>Maksimal tezligi:</b> Mach 0.8 (~980 km/soat)",
        "<b>Uchish balandligi:</b> 14 000 metr",
        "<b>Parvoz masofasi:</b> 3 700+ km"
    ],
    weaponsTitle: "Stealth ichki kameradagi qurollar:",
    weapons: [
        "<b>AASM (lazerli bomba)</b>",
        "<b>GBU-12</b> (lazerli yo'naltiriluvchi bomba)",
        "<b>Eksperimental EW modullari</b>"
    ],
    weaponsNote: "👉 Yevropa davlatlarining kelajakdagi 6-avlod havo kuchlarining asosi.",
    sensors: [
        "Stealth texnologiyali to'liq radar yutuvchi korpus",
        "Ko'p sensorli sinxron kuzatuv tizimi",
        "Avtonomlik va AI boshqaruv qobiliyati",
        "EW (elektron jang) imkoniyatlari"
    ]
  }
];

// Function to render drones to container
function renderDrones(drones) {
    const container = document.getElementById('drones-container');
    if (!container) return;
    container.innerHTML = '';

    drones.forEach((drone) => {
        const card = document.createElement('div');
        card.className = 'drone-card expanded';
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';

        const techSpecs = Array.isArray(drone.techSpecs) ? drone.techSpecs : [];
        const weapons = Array.isArray(drone.weapons) ? drone.weapons : [];
        const sensors = Array.isArray(drone.sensors) ? drone.sensors : [];
        
        card.innerHTML = `
            <div class="drone-img">
                <img src="${drone.img}" alt="${drone.name}" loading="lazy" onerror="this.src='assets/drone1.png'">
                <div class="price-tag">${drone.price}</div>
            </div>
            <div class="drone-info">
                <h3 class="drone-name">${drone.name}</h3>
                <p class="drone-desc">${drone.info || ''}</p>
                
                <div class="drone-specs">
                    <div class="spec-row">
                        <div class="spec-icon"><i class="fa-solid fa-plane-circle-check"></i></div>
                        <div class="spec-text"><strong>Kimlarga sotiladi:</strong><span>${drone.soldTo || '-'}</span></div>
                    </div>
                    <div class="spec-row">
                        <div class="spec-icon"><i class="fa-solid fa-ban"></i></div>
                        <div class="spec-text"><strong>Kimlar xarid qila olmaydi:</strong><span>${drone.notSoldTo || '-'}</span></div>
                    </div>
                </div>

                <div class="advanced-details">
                    ${techSpecs.length > 0 ? `
                        <div class="detail-section">
                            <h4><i class="fa-solid fa-gear"></i> Texnik ko'rsatkichlar</h4>
                            <ul>
                                ${techSpecs.map(s => `<li>${s}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${weapons.length > 0 ? `
                        <div class="detail-section">
                            <h4><i class="fa-solid fa-crosshairs"></i> Qurollanish</h4>
                            ${drone.weaponsTitle ? `<p class="w-title">${drone.weaponsTitle}</p>` : ''}
                            <ul>
                                ${weapons.map(s => `<li>${s}</li>`).join('')}
                            </ul>
                            ${drone.weaponsNote ? `<p class="w-note">${drone.weaponsNote}</p>` : ''}
                        </div>
                    ` : ''}
                    
                    ${sensors.length > 0 ? `
                        <div class="detail-section">
                            <h4><i class="fa-solid fa-satellite-dish"></i> Sensor va tizimlar</h4>
                            <ul>
                                ${sensors.map(s => `<li>${s}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Observer setup
    initCardsObserver();
}

function initCardsObserver() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.drone-card').forEach(card => {
        observer.observe(card);
    });
}

// Fetch dynamic drones from API (with fallback)
async function fetchDronesData() {
    try {
        const res = await fetch('/api/drones');
        if (!res.ok) throw new Error('API unavailable');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
            renderDrones(data.data);
            return;
        }
    } catch (e) {
        console.warn('API ga ulanmadi, statik ma\'lumotlar yuklanmoqda:', e.message);
    }
    // Fallback to static
    renderDrones(dronesData);
}

// Fetch settings from API
async function fetchSiteSettings() {
    try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.data) {
            const s = data.data;
            if (s.phone1) {
                const el = document.getElementById('site-phone-1');
                if (el) { el.textContent = s.phone1; el.href = `tel:${s.phone1.replace(/\s+/g, '')}`; }
                const cp = document.getElementById('copy-phone-1');
                if (cp) cp.setAttribute('data-copy', s.phone1.replace(/\s+/g, ''));
            }
            if (s.phone2) {
                const el = document.getElementById('site-phone-2');
                if (el) { el.textContent = s.phone2; el.href = `tel:${s.phone2.replace(/\s+/g, '')}`; }
                const cp = document.getElementById('copy-phone-2');
                if (cp) cp.setAttribute('data-copy', s.phone2.replace(/\s+/g, ''));
            }
            if (s.telegram) {
                const el = document.getElementById('site-telegram');
                const cleanTg = s.telegram.replace('@', '');
                if (el) { el.textContent = s.telegram; el.href = `https://t.me/${cleanTg}`; }
                const btn = document.getElementById('site-telegram-btn');
                if (btn) btn.href = `https://t.me/${cleanTg}`;
            }
        }
    } catch (e) {}
}

// Document ready
document.addEventListener('DOMContentLoaded', () => {
    // Current Year for footer
    const yearElem = document.getElementById('year');
    if (yearElem) yearElem.textContent = new Date().getFullYear();

    // Load Drones & Settings
    fetchDronesData();
    fetchSiteSettings();

    // Public contact message form
    const contactForm = document.getElementById('public-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('contact-send-btn');
            const resMsg = document.getElementById('contact-result-msg');
            const name = document.getElementById('contact-name').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const msg = document.getElementById('contact-message').value.trim();

            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yuborilmoqda...';
            resMsg.style.display = 'none';

            try {
                const res = await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullName: name, phone, message: msg })
                });
                const result = await res.json();
                if (result.success) {
                    resMsg.textContent = result.message;
                    resMsg.style.color = '#10b981';
                    resMsg.style.display = 'block';
                    contactForm.reset();
                } else {
                    resMsg.textContent = result.message || 'Xatolik yuz berdi';
                    resMsg.style.color = '#ef4444';
                    resMsg.style.display = 'block';
                }
            } catch (err) {
                resMsg.textContent = 'Server bilan aloqa uzildi. Iltimos telefon orqali bog\'laning!';
                resMsg.style.color = '#ef4444';
                resMsg.style.display = 'block';
            } finally {
                btn.disabled = false;
                btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Yuborish';
            }
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, .btn-primary, .drone-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '50px';
                cursor.style.height = '50px';
                cursor.style.backgroundColor = 'rgba(255, 51, 51, 0.15)';
                cursor.style.border = 'none';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.border = '2px solid var(--primary)';
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target === '#contact') {
                openContactModal();
                return;
            }
            const targetElem = document.querySelector(target);
            if (targetElem) {
                targetElem.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact Modal Logic
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    function openContactModal() {
        if (!modal || !overlay) return;
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeContactModal() {
        if (!modal || !overlay) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeContactModal);
    if (overlay) overlay.addEventListener('click', closeContactModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeContactModal();
    });

    // Copy to clipboard
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-copy');
            if (navigator.clipboard && text) {
                navigator.clipboard.writeText(text).then(() => {
                    const original = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Nusxalandi!';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.innerHTML = original;
                        btn.classList.remove('copied');
                    }, 2000);
                });
            }
        });
    });
});
