const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Initialize database
require('./db');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folders
// 1. Uploaded drone images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. Drone assets (original png images)
const assetsPath = path.join(__dirname, '..', 'loyham', 'drones', 'assets');
if (fs.existsSync(assetsPath)) {
  app.use('/assets', express.static(assetsPath));
}

// 3. Admin Panel Static Files
const adminPath = path.join(__dirname, '..', 'admin');
app.use('/admin', express.static(adminPath));

// 4. Client Public Website
const clientPath = path.join(__dirname, '..', 'loyham', 'drones');
app.use(express.static(clientPath));

// API Routes
app.use('/api', apiRoutes);

// Admin index route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

// Admin login route
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(adminPath, 'login.html'));
});

// Root index
app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 AERODRONE Server muvaffaqiyatli ishga tushdi!`);
  console.log(`🌐 Asosiy Web Sayt:   http://localhost:${PORT}`);
  console.log(`⚙️  Admin Panel:       http://localhost:${PORT}/admin`);
  console.log(`📡 REST API:          http://localhost:${PORT}/api/drones`);
  console.log(`==================================================\n`);
});
