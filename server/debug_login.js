require('dotenv').config();
const { getDb, get, query } = require('./db');

async function test() {
    const db = await getDb();

    // Check admin user exists
    const admin = get(db, "SELECT id, username, role, password FROM users WHERE username = 'admin'");
    if (!admin) {
        console.log('❌ Admin user does NOT exist in DB!');
    } else {
        console.log('✅ Admin user found:', { id: admin.id, username: admin.username, role: admin.role });
        console.log('   Password hash starts with:', admin.password.substring(0, 10) + '...');

        // Test bcrypt compare
        const bcrypt = require('bcryptjs');
        const match = bcrypt.compareSync('admin123', admin.password);
        console.log('   Password "admin123" matches hash:', match ? '✅ YES' : '❌ NO');
    }

    // List all users
    const users = query(db, 'SELECT id, username, role FROM users');
    console.log('\nAll users in DB:', users.length);
    users.forEach(u => console.log(' -', u.username, '(role:', u.role + ')'));
}

test().catch(console.error);
