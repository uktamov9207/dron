const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'aerodrone_secret_super_key_2026';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Avtorizatsiyadan o\'tilmagan (Token topilmadi)' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Yaroqsiz yoki muddati o\'tgan token' });
  }
}

module.exports = { authMiddleware, JWT_SECRET };
