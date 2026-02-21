const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let _connected = false;

async function getDb() {
  if (_connected) return mongoose;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI environment variable is not set');
  await mongoose.connect(uri);
  _connected = true;

  // Auto-create admin if not exists
  const User = require('./models/User');
  const existing = await User.findOne({ username: 'admin' });
  if (!existing) {
    const hash = bcrypt.hashSync('admin123', 10);
    await User.create({ username: 'admin', password: hash, role: 'admin' });
    console.log('✅ Admin auto-created: admin / admin123');
  }

  return mongoose;
}

module.exports = { getDb };
