const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authMiddleware, JWT_SECRET } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Helper function to safely parse JSON arrays
function parseJsonSafe(str, defaultVal = []) {
  if (!str) return defaultVal;
  try {
    return JSON.parse(str);
  } catch (e) {
    return defaultVal;
  }
}

// Format drone object for client
function formatDrone(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    soldTo: row.sold_to || '',
    notSoldTo: row.not_sold_to || '',
    info: row.info || '',
    img: row.img,
    techSpecs: parseJsonSafe(row.tech_specs),
    weaponsTitle: row.weapons_title || '',
    weapons: parseJsonSafe(row.weapons),
    weaponsNote: row.weapons_note || '',
    sensors: parseJsonSafe(row.sensors),
    orderNum: row.order_num || 0,
    isActive: row.is_active === 1,
    createdAt: row.created_at
  };
}

/* ==========================================================
   1. AUTH ROUTES
========================================================== */

// POST /api/auth/login
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Foydalanuvchi nomi va parol kiritilishi shart' });
  }

  const stmt = db.prepare('SELECT * FROM admins WHERE username = ?');
  const admin = stmt.get(username);

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ success: false, message: 'Login yoki parol noto\'g\'ri!' });
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    message: 'Muvaffaqiyatli kirdingiz',
    token,
    user: { id: admin.id, username: admin.username }
  });
});

// GET /api/auth/me (Check token)
router.get('/auth/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.admin });
});

// PUT /api/auth/change-password
router.put('/auth/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Barcha maydonlarni to\'ldiring' });
  }

  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin.id);
  if (!admin || !bcrypt.compareSync(currentPassword, admin.password)) {
    return res.status(400).json({ success: false, message: 'Joriy parol noto\'g\'ri' });
  }

  const newHash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(newHash, admin.id);

  res.json({ success: true, message: 'Parol muvaffaqiyatli yangilandi' });
});

/* ==========================================================
   2. PUBLIC DRONES ROUTES
========================================================== */

// GET /api/drones (Barcha faol dronlar)
router.get('/drones', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM drones WHERE is_active = 1 ORDER BY order_num ASC, id DESC').all();
    const drones = rows.map(formatDrone);
    res.json({ success: true, data: drones });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/drones/:id
router.get('/drones/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM drones WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ success: false, message: 'Dron topilmadi' });
    }
    res.json({ success: true, data: formatDrone(row) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ==========================================================
   3. ADMIN DRONES CRUD (Himoyalangan)
========================================================== */

// GET /api/admin/drones (Barcha dronlar - faol va nofaol)
router.get('/admin/drones', authMiddleware, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM drones ORDER BY order_num ASC, id DESC').all();
    const drones = rows.map(formatDrone);
    res.json({ success: true, data: drones });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/drones (Yangi dron qo'shish)
router.post('/drones', authMiddleware, upload.single('image'), (req, res) => {
  try {
    const {
      name, price, soldTo, notSoldTo, info,
      techSpecs, weaponsTitle, weapons, weaponsNote, sensors,
      orderNum, isActive, existingImg
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Dron nomi va narxi talab qilinadi' });
    }

    let img = existingImg || 'assets/drone1.png';
    if (req.file) {
      img = 'uploads/' + req.file.filename;
    }

    const techSpecsJson = typeof techSpecs === 'string' ? techSpecs : JSON.stringify(techSpecs || []);
    const weaponsJson = typeof weapons === 'string' ? weapons : JSON.stringify(weapons || []);
    const sensorsJson = typeof sensors === 'string' ? sensors : JSON.stringify(sensors || []);

    const stmt = db.prepare(`
      INSERT INTO drones (
        name, price, sold_to, not_sold_to, info, img,
        tech_specs, weapons_title, weapons, weapons_note, sensors,
        order_num, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name, price, soldTo || '', notSoldTo || '', info || '', img,
      techSpecsJson, weaponsTitle || '', weaponsJson, weaponsNote || '', sensorsJson,
      parseInt(orderNum) || 0,
      isActive === 'false' || isActive === false ? 0 : 1
    );

    res.status(201).json({
      success: true,
      message: 'Yangi dron muvaffaqiyatli qo\'shildi',
      id: Number(result.lastInsertRowid)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/drones/:id (Dronni yangilash)
router.put('/drones/:id', authMiddleware, upload.single('image'), (req, res) => {
  try {
    const droneId = req.params.id;
    const existing = db.prepare('SELECT * FROM drones WHERE id = ?').get(droneId);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Dron topilmadi' });
    }

    const {
      name, price, soldTo, notSoldTo, info,
      techSpecs, weaponsTitle, weapons, weaponsNote, sensors,
      orderNum, isActive, existingImg
    } = req.body;

    let img = existing.img;
    if (req.file) {
      img = 'uploads/' + req.file.filename;
    } else if (existingImg) {
      img = existingImg;
    }

    const techSpecsJson = typeof techSpecs === 'string' ? techSpecs : JSON.stringify(techSpecs || []);
    const weaponsJson = typeof weapons === 'string' ? weapons : JSON.stringify(weapons || []);
    const sensorsJson = typeof sensors === 'string' ? sensors : JSON.stringify(sensors || []);

    const stmt = db.prepare(`
      UPDATE drones SET
        name = ?, price = ?, sold_to = ?, not_sold_to = ?, info = ?, img = ?,
        tech_specs = ?, weapons_title = ?, weapons = ?, weapons_note = ?, sensors = ?,
        order_num = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      name || existing.name,
      price || existing.price,
      soldTo !== undefined ? soldTo : existing.sold_to,
      notSoldTo !== undefined ? notSoldTo : existing.not_sold_to,
      info !== undefined ? info : existing.info,
      img,
      techSpecsJson,
      weaponsTitle !== undefined ? weaponsTitle : existing.weapons_title,
      weaponsJson,
      weaponsNote !== undefined ? weaponsNote : existing.weapons_note,
      sensorsJson,
      orderNum !== undefined ? parseInt(orderNum) : existing.order_num,
      isActive !== undefined ? (isActive === 'false' || isActive === false ? 0 : 1) : existing.is_active,
      droneId
    );

    res.json({ success: true, message: 'Dron ma\'lumotlari yangilandi' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/drones/:id (Dronni o'chirish)
router.delete('/drones/:id', authMiddleware, (req, res) => {
  try {
    const droneId = req.params.id;
    const result = db.prepare('DELETE FROM drones WHERE id = ?').run(droneId);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Dron topilmadi' });
    }
    res.json({ success: true, message: 'Dron muvaffaqiyatli o\'chirildi' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ==========================================================
   4. CONTACT & MESSAGES
========================================================== */

// POST /api/messages (Saytdan ariza yuborish)
router.post('/messages', (req, res) => {
  try {
    const { fullName, phone, message } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Telefon raqam kiritilishi shart!' });
    }

    const stmt = db.prepare('INSERT INTO messages (full_name, phone, message) VALUES (?, ?, ?)');
    stmt.run(fullName || 'Noma\'lum', phone, message || '');

    res.status(201).json({
      success: true,
      message: 'Murojaatingiz qabul qilindi! Tez orada mutaxassislarimiz siz bilan bog\'lanishadi.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/messages (Admin uchun)
router.get('/messages', authMiddleware, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM messages ORDER BY id DESC').all();
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/messages/:id/status
router.patch('/messages/:id/status', authMiddleware, (req, res) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE messages SET status = ? WHERE id = ?').run(status || 'seen', req.params.id);
    res.json({ success: true, message: 'Status yangilandi' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/messages/:id
router.delete('/messages/:id', authMiddleware, (req, res) => {
  try {
    db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Murojaat o\'chirildi' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ==========================================================
   5. SETTINGS
========================================================== */

// GET /api/settings
router.get('/settings', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM settings').all();
    const settings = {};
    rows.forEach(r => settings[r.key] = r.value);
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/settings
router.put('/settings', authMiddleware, (req, res) => {
  try {
    const updates = req.body; // { phone1, phone2, telegram, work_hours, site_title }
    const stmt = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
    for (const [key, value] of Object.entries(updates)) {
      stmt.run(key, String(value));
    }
    res.json({ success: true, message: 'Sozlamalar saqlandi' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ==========================================================
   6. STATS (Dashboard)
========================================================== */
router.get('/stats', authMiddleware, (req, res) => {
  try {
    const totalDrones = db.prepare('SELECT COUNT(*) as count FROM drones').get().count;
    const activeDrones = db.prepare('SELECT COUNT(*) as count FROM drones WHERE is_active = 1').get().count;
    const totalMessages = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;
    const newMessages = db.prepare('SELECT COUNT(*) as count FROM messages WHERE status = \'new\'').get().count;

    res.json({
      success: true,
      data: {
        totalDrones,
        activeDrones,
        totalMessages,
        newMessages
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
